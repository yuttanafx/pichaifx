import crypto from "crypto";
import { cmd, multi, mgetJson } from "./redis";
import { LEVEL_PERCENTS, levelAmountsSatang } from "./commission";
import type { Activation, Commission, PublicUser } from "./types";

type StoredUser = PublicUser & { passwordHash: string };

// ---------- ชื่อ key ทั้งหมดอยู่ที่นี่ ----------
const k = {
  user: (id: string) => `pfx:user:${id}`,
  email: (e: string) => `pfx:email:${e.toLowerCase()}`,
  ref: (code: string) => `pfx:ref:${code.toUpperCase()}`,
  down: (id: string) => `pfx:down:${id}`, // set ของลูกข่ายชั้นตรง
  act: (id: string) => `pfx:act:${id}`,
  acts: "pfx:acts",
  userActs: (id: string) => `pfx:user:${id}:acts`,
  actLock: (id: string) => `pfx:act:${id}:lock`,
  acctLock: (broker: string, acc: string) =>
    `pfx:acct:${broker.toLowerCase()}:${acc.trim().toLowerCase()}`,
  com: (id: string) => `pfx:com:${id}`,
  coms: "pfx:coms",
  userComs: (id: string) => `pfx:user:${id}:coms`,
};

export const keys = k;

const toPublic = ({ passwordHash: _p, ...u }: StoredUser): PublicUser => u;

// ---------- ผู้ใช้ ----------
export async function getUserById(id: string): Promise<PublicUser | null> {
  const raw = await cmd<string | null>("GET", k.user(id));
  return raw ? toPublic(JSON.parse(raw) as StoredUser) : null;
}

export async function getUserByEmail(email: string): Promise<(StoredUser) | null> {
  const id = await cmd<string | null>("GET", k.email(email));
  if (!id) return null;
  const raw = await cmd<string | null>("GET", k.user(id));
  return raw ? (JSON.parse(raw) as StoredUser) : null;
}

export async function getUserByRefCode(code: string): Promise<PublicUser | null> {
  const id = await cmd<string | null>("GET", k.ref(code));
  return id ? getUserById(id) : null;
}

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // ตัดตัวที่สับสน 0/O 1/I

function randomCode(len = 8) {
  const bytes = crypto.randomBytes(len);
  return Array.from(bytes, (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join("");
}

export async function createUser(input: {
  email: string;
  name: string;
  passwordHash: string;
  referrerId: string | null;
}): Promise<PublicUser | null> {
  const id = crypto.randomUUID();

  // กันอีเมลซ้ำแบบ atomic
  const got = await cmd<string | null>("SET", k.email(input.email), id, "NX");
  if (got !== "OK") return null;

  let refCode = "";
  for (let i = 0; i < 8; i++) {
    const c = randomCode();
    const ok = await cmd<string | null>("SET", k.ref(c), id, "NX");
    if (ok === "OK") {
      refCode = c;
      break;
    }
  }
  if (!refCode) {
    await cmd("DEL", k.email(input.email));
    throw new Error("สร้างรหัสแนะนำไม่สำเร็จ");
  }

  const user: StoredUser = {
    id,
    email: input.email.toLowerCase(),
    name: input.name,
    refCode,
    referrerId: input.referrerId,
    createdAt: new Date().toISOString(),
    passwordHash: input.passwordHash,
  };

  const ops: (string | number)[][] = [["SET", k.user(id), JSON.stringify(user)]];
  if (input.referrerId) ops.push(["SADD", k.down(input.referrerId), id]);
  await multi(ops);

  return toPublic(user);
}

/** สายแนะนำขึ้นไปสูงสุด n ชั้น (ชั้น 1 = ผู้แนะนำโดยตรง) */
export async function getUplineChain(userId: string, depth = LEVEL_PERCENTS.length) {
  const chain: PublicUser[] = [];
  let current = await getUserById(userId);
  const seen = new Set<string>([userId]);
  while (current?.referrerId && chain.length < depth && !seen.has(current.referrerId)) {
    const up = await getUserById(current.referrerId);
    if (!up) break;
    seen.add(up.id);
    chain.push(up);
    current = up;
  }
  return chain;
}

export async function getDownlineIds(userId: string) {
  return cmd<string[]>("SMEMBERS", k.down(userId));
}

// ---------- การแจ้งเปิดใช้งาน EA ----------
export async function createActivation(
  userId: string,
  data: Pick<Activation, "name" | "contact" | "broker" | "accountNumber" | "server" | "note">
): Promise<Activation | null> {
  const id = crypto.randomUUID();

  // บัญชีเทรดหนึ่งบัญชีแจ้งได้ครั้งเดียว กันการแจ้งซ้ำเพื่อรับค่าแนะนำซ้ำ
  const lock = await cmd<string | null>(
    "SET",
    k.acctLock(data.broker, data.accountNumber),
    id,
    "NX"
  );
  if (lock !== "OK") return null;

  const act: Activation = {
    id,
    userId,
    ...data,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  await multi([
    ["SET", k.act(id), JSON.stringify(act)],
    ["LPUSH", k.acts, id],
    ["LPUSH", k.userActs(userId), id],
  ]);
  return act;
}

export async function getActivation(id: string) {
  const raw = await cmd<string | null>("GET", k.act(id));
  return raw ? (JSON.parse(raw) as Activation) : null;
}

export async function listActivationsOf(userId: string, limit = 50) {
  const ids = await cmd<string[]>("LRANGE", k.userActs(userId), 0, limit - 1);
  return mgetJson<Activation>(ids.map(k.act));
}

export async function listAllActivations(limit = 200) {
  const ids = await cmd<string[]>("LRANGE", k.acts, 0, limit - 1);
  return mgetJson<Activation>(ids.map(k.act));
}

export async function rejectActivation(id: string) {
  const act = await getActivation(id);
  if (!act || act.status !== "pending") return null;
  const updated: Activation = { ...act, status: "rejected", reviewedAt: new Date().toISOString() };
  await multi([
    ["SET", k.act(id), JSON.stringify(updated)],
    ["DEL", k.acctLock(act.broker, act.accountNumber)], // ปล่อยให้แจ้งบัญชีนี้ใหม่ได้
  ]);
  return updated;
}

/**
 * อนุมัติ + สร้างค่าแนะนำ 3 ชั้นใน transaction เดียว
 * คืน null ถ้าไม่ใช่สถานะ pending หรือถูกอนุมัติไปแล้ว
 */
export async function approveActivation(id: string) {
  const act = await getActivation(id);
  if (!act || act.status !== "pending") return null;

  // กันกดอนุมัติซ้ำพร้อมกัน
  const lock = await cmd<string | null>("SET", k.actLock(id), "1", "NX");
  if (lock !== "OK") return null;

  const now = new Date().toISOString();
  const chain = await getUplineChain(act.userId);
  const amounts = levelAmountsSatang();

  const commissions: Commission[] = chain.map((beneficiary, i) => ({
    id: crypto.randomUUID(),
    activationId: id,
    beneficiaryId: beneficiary.id,
    sourceUserId: act.userId,
    level: (i + 1) as 1 | 2 | 3,
    percent: LEVEL_PERCENTS[i],
    amountSatang: amounts[i],
    status: "pending",
    createdAt: now,
  }));

  const updated: Activation = { ...act, status: "approved", reviewedAt: now };
  const ops: (string | number)[][] = [["SET", k.act(id), JSON.stringify(updated)]];
  for (const c of commissions) {
    ops.push(
      ["SET", k.com(c.id), JSON.stringify(c)],
      ["LPUSH", k.coms, c.id],
      ["LPUSH", k.userComs(c.beneficiaryId), c.id]
    );
  }
  await multi(ops);
  return { activation: updated, commissions };
}

// ---------- ค่าแนะนำ ----------
export async function listCommissionsOf(userId: string) {
  const ids = await cmd<string[]>("LRANGE", k.userComs(userId), 0, -1);
  return mgetJson<Commission>(ids.map(k.com));
}

export async function listAllCommissions(limit = 300) {
  const ids = await cmd<string[]>("LRANGE", k.coms, 0, limit - 1);
  return mgetJson<Commission>(ids.map(k.com));
}

export async function markCommissionPaid(id: string) {
  const raw = await cmd<string | null>("GET", k.com(id));
  if (!raw) return null;
  const c = JSON.parse(raw) as Commission;
  if (c.status === "paid") return c;
  const updated: Commission = { ...c, status: "paid", paidAt: new Date().toISOString() };
  await cmd("SET", k.com(id), JSON.stringify(updated));
  return updated;
}

export async function getUsersByIds(ids: string[]) {
  const unique = Array.from(new Set(ids));
  const users = await mgetJson<StoredUser>(unique.map(k.user));
  return new Map(users.map((u) => [u.id, toPublic(u)]));
}
