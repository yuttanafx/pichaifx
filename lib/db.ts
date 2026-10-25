import crypto from "crypto";
import { getDb } from "./firebase";
import { LEVEL_PERCENTS, levelAmountsSatang } from "./commission";
import type { Activation, Commission, PublicUser } from "./types";

/**
 * โครงสร้าง Firestore (ไม่ต้องสร้าง index เพิ่ม — ทุก query ใช้ index อัตโนมัติ)
 *   users/{userId}            ข้อมูลสมาชิก (มี passwordHash — ห้ามส่งออกไปหน้าเว็บ)
 *   emails/{sha256(email)}    กันอีเมลซ้ำ
 *   refCodes/{CODE}           รหัสแนะนำ -> userId
 *   activations/{id}          คำขอเปิดใช้งาน EA
 *   accountLocks/{sha256}     กันแจ้งบัญชีเทรดซ้ำ
 *   commissions/{id}          รายการค่าแนะนำ
 *   rateLimits/{sha256}       จำกัดการลองรหัสผ่าน
 */

type StoredUser = PublicUser & { passwordHash: string };

const sha = (s: string) => crypto.createHash("sha256").update(s).digest("hex");
const toPublic = ({ passwordHash: _p, ...u }: StoredUser): PublicUser => u;
const byNewest = <T extends { createdAt: string }>(a: T, b: T) =>
  b.createdAt.localeCompare(a.createdAt);

const C = {
  users: "users",
  emails: "emails",
  refCodes: "refCodes",
  activations: "activations",
  locks: "accountLocks",
  commissions: "commissions",
  rate: "rateLimits",
} as const;

const acctLockId = (broker: string, acc: string) =>
  sha(`${broker.trim().toLowerCase()}|${acc.trim().toLowerCase()}`);

// ---------- ผู้ใช้ ----------
export async function getUserById(id: string): Promise<PublicUser | null> {
  const snap = await getDb().collection(C.users).doc(id).get();
  return snap.exists ? toPublic(snap.data() as StoredUser) : null;
}

export async function getUserByEmail(email: string): Promise<StoredUser | null> {
  const db = getDb();
  const e = await db.collection(C.emails).doc(sha(email.toLowerCase())).get();
  if (!e.exists) return null;
  const u = await db.collection(C.users).doc((e.data() as { userId: string }).userId).get();
  return u.exists ? (u.data() as StoredUser) : null;
}

export async function getUserByRefCode(code: string): Promise<PublicUser | null> {
  const snap = await getDb().collection(C.refCodes).doc(code.trim().toUpperCase()).get();
  return snap.exists ? getUserById((snap.data() as { userId: string }).userId) : null;
}

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // ตัดตัวที่สับสน 0/O 1/I
function randomCode(len = 8) {
  return Array.from(crypto.randomBytes(len), (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join("");
}

/** คืน null ถ้าอีเมลซ้ำ */
export async function createUser(input: {
  email: string;
  name: string;
  passwordHash: string;
  referrerId: string | null;
}): Promise<PublicUser | null> {
  const db = getDb();
  const id = crypto.randomUUID();
  const email = input.email.toLowerCase();
  const candidates = Array.from({ length: 6 }, () => randomCode());

  const user = await db.runTransaction(async (tx) => {
    const emailRef = db.collection(C.emails).doc(sha(email));
    if ((await tx.get(emailRef)).exists) return null;

    const snaps = await Promise.all(
      candidates.map((c) => tx.get(db.collection(C.refCodes).doc(c)))
    );
    const free = snaps.findIndex((s) => !s.exists);
    if (free < 0) throw new Error("สร้างรหัสแนะนำไม่สำเร็จ");
    const refCode = candidates[free];

    const u: StoredUser = {
      id,
      email,
      name: input.name,
      refCode,
      referrerId: input.referrerId,
      createdAt: new Date().toISOString(),
      passwordHash: input.passwordHash,
    };
    tx.set(emailRef, { userId: id });
    tx.set(db.collection(C.refCodes).doc(refCode), { userId: id });
    tx.set(db.collection(C.users).doc(id), u);
    return u;
  });

  return user ? toPublic(user) : null;
}

export async function getStoredUserById(id: string): Promise<StoredUser | null> {
  const snap = await getDb().collection(C.users).doc(id).get();
  return snap.exists ? (snap.data() as StoredUser) : null;
}

export async function updatePasswordHash(userId: string, passwordHash: string) {
  await getDb().collection(C.users).doc(userId).update({ passwordHash });
}

/** สายแนะนำขึ้นไปสูงสุด n ชั้น (ชั้น 1 = ผู้แนะนำโดยตรง) */
export async function getUplineChain(userId: string, depth = LEVEL_PERCENTS.length) {
  const chain: PublicUser[] = [];
  const seen = new Set<string>([userId]);
  let current = await getUserById(userId);
  while (current?.referrerId && chain.length < depth && !seen.has(current.referrerId)) {
    const up = await getUserById(current.referrerId);
    if (!up) break;
    seen.add(up.id);
    chain.push(up);
    current = up;
  }
  return chain;
}

/** จำนวนสมาชิกในแต่ละชั้นของสายล่าง [ชั้น1, ชั้น2, ชั้น3] */
export async function getDownlineCounts(userId: string, depth = LEVEL_PERCENTS.length) {
  const db = getDb();
  const counts: number[] = [];
  let parents = [userId];
  for (let level = 0; level < depth; level++) {
    const children: string[] = [];
    for (let i = 0; i < parents.length; i += 10) {
      const snap = await db
        .collection(C.users)
        .where("referrerId", "in", parents.slice(i, i + 10))
        .get();
      snap.docs.forEach((d) => children.push(d.id));
    }
    counts.push(children.length);
    parents = children;
    if (parents.length === 0) {
      while (counts.length < depth) counts.push(0);
      break;
    }
  }
  return counts;
}

export async function getUsersByIds(ids: string[]) {
  const unique = Array.from(new Set(ids));
  if (unique.length === 0) return new Map<string, PublicUser>();
  const db = getDb();
  const snaps = await db.getAll(...unique.map((id) => db.collection(C.users).doc(id)));
  return new Map(
    snaps.filter((s) => s.exists).map((s) => [s.id, toPublic(s.data() as StoredUser)])
  );
}

// ---------- การแจ้งเปิดใช้งาน EA ----------
/** คืน null ถ้าบัญชีเทรดนี้เคยถูกแจ้งแล้ว */
export async function createActivation(
  userId: string,
  data: Pick<Activation, "name" | "contact" | "broker" | "accountNumber" | "server" | "note">
): Promise<Activation | null> {
  const db = getDb();
  const id = crypto.randomUUID();
  const act: Activation = {
    id,
    userId,
    ...data,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  return db.runTransaction(async (tx) => {
    const lockRef = db.collection(C.locks).doc(acctLockId(data.broker, data.accountNumber));
    if ((await tx.get(lockRef)).exists) return null;
    tx.set(lockRef, { activationId: id });
    tx.set(db.collection(C.activations).doc(id), act);
    return act;
  });
}

export async function listActivationsOf(userId: string, limit = 50) {
  const snap = await getDb().collection(C.activations).where("userId", "==", userId).get();
  return snap.docs.map((d) => d.data() as Activation).sort(byNewest).slice(0, limit);
}

export async function listAllActivations(limit = 200) {
  const snap = await getDb()
    .collection(C.activations)
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();
  return snap.docs.map((d) => d.data() as Activation);
}

export async function rejectActivation(id: string) {
  const db = getDb();
  return db.runTransaction(async (tx) => {
    const ref = db.collection(C.activations).doc(id);
    const snap = await tx.get(ref);
    if (!snap.exists) return null;
    const act = snap.data() as Activation;
    if (act.status !== "pending") return null;
    const updated: Activation = { ...act, status: "rejected", reviewedAt: new Date().toISOString() };
    tx.set(ref, updated);
    tx.delete(db.collection(C.locks).doc(acctLockId(act.broker, act.accountNumber))); // แจ้งบัญชีนี้ใหม่ได้
    return updated;
  });
}

/**
 * อนุมัติ + สร้างค่าแนะนำ 3 ชั้นใน transaction เดียว
 * คืน null ถ้าไม่พบ หรือไม่ใช่สถานะ pending (เช่น ถูกอนุมัติไปแล้ว — กดซ้ำไม่ได้ค่าแนะนำซ้ำ)
 */
export async function approveActivation(id: string) {
  const db = getDb();
  return db.runTransaction(async (tx) => {
    const actRef = db.collection(C.activations).doc(id);
    const actSnap = await tx.get(actRef);
    if (!actSnap.exists) return null;
    const act = actSnap.data() as Activation;
    if (act.status !== "pending") return null;

    // เดินขึ้นสายแนะนำ (อ่านทั้งหมดก่อนเขียน ตามกติกา transaction)
    const chain: PublicUser[] = [];
    const seen = new Set<string>([act.userId]);
    const buyer = await tx.get(db.collection(C.users).doc(act.userId));
    let cur = buyer.exists ? (buyer.data() as StoredUser) : undefined;
    while (cur?.referrerId && chain.length < LEVEL_PERCENTS.length && !seen.has(cur.referrerId)) {
      const s = await tx.get(db.collection(C.users).doc(cur.referrerId));
      if (!s.exists) break;
      const up = s.data() as StoredUser;
      seen.add(up.id);
      chain.push(toPublic(up));
      cur = up;
    }

    const now = new Date().toISOString();
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
    tx.set(actRef, updated);
    for (const c of commissions) tx.set(db.collection(C.commissions).doc(c.id), c);
    return { activation: updated, commissions };
  });
}

// ---------- ค่าแนะนำ ----------
export async function listCommissionsOf(userId: string) {
  const snap = await getDb()
    .collection(C.commissions)
    .where("beneficiaryId", "==", userId)
    .get();
  return snap.docs.map((d) => d.data() as Commission).sort(byNewest);
}

export async function listAllCommissions(limit = 300) {
  const snap = await getDb()
    .collection(C.commissions)
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();
  return snap.docs.map((d) => d.data() as Commission);
}

export async function markCommissionPaid(id: string) {
  const db = getDb();
  return db.runTransaction(async (tx) => {
    const ref = db.collection(C.commissions).doc(id);
    const snap = await tx.get(ref);
    if (!snap.exists) return null;
    const c = snap.data() as Commission;
    if (c.status === "paid") return c;
    const updated: Commission = { ...c, status: "paid", paidAt: new Date().toISOString() };
    tx.set(ref, updated);
    return updated;
  });
}

// ---------- จำกัดการลองรหัสผ่าน ----------
/** นับการลอง 1 ครั้ง คืน true ถ้าเกินกำหนด (ค่าเริ่มต้น 8 ครั้ง / 15 นาที) */
export async function hitLoginLimit(key: string, max = 8, windowMs = 15 * 60_000) {
  const db = getDb();
  return db.runTransaction(async (tx) => {
    const ref = db.collection(C.rate).doc(sha(key));
    const snap = await tx.get(ref);
    const now = Date.now();
    let { count, resetAt } = snap.exists
      ? (snap.data() as { count: number; resetAt: number })
      : { count: 0, resetAt: now + windowMs };
    if (resetAt < now) {
      count = 0;
      resetAt = now + windowMs;
    }
    count += 1;
    tx.set(ref, { count, resetAt });
    return count > max;
  });
}

export async function clearLoginLimit(key: string) {
  await getDb().collection(C.rate).doc(sha(key)).delete();
}
