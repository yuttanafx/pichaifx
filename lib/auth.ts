import crypto from "crypto";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import { getUserById } from "./db";
import type { PublicUser } from "./types";

export const SESSION_COOKIE = "pfx_session";
const SESSION_DAYS = 30;

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 16) {
    throw new Error("ยังไม่ได้ตั้งค่า SESSION_SECRET (อย่างน้อย 16 ตัวอักษร) ใน .env.local");
  }
  return s;
}

// ---------- รหัสผ่าน (scrypt + salt สุ่มต่อผู้ใช้) ----------
function scrypt(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) =>
    crypto.scrypt(password, salt, 64, (err, key) => (err ? reject(err) : resolve(key)))
  );
}

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16);
  const key = await scrypt(password, salt);
  return `s1$${salt.toString("hex")}$${key.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [v, saltHex, keyHex] = stored.split("$");
  if (v !== "s1" || !saltHex || !keyHex) return false;
  const expected = Buffer.from(keyHex, "hex");
  const actual = await scrypt(password, Buffer.from(saltHex, "hex"));
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

// ---------- เซสชัน (คุกกี้ลงลายเซ็น HMAC, ไม่ต้องเก็บ state ฝั่งเซิร์ฟเวอร์) ----------
function sign(payload: string) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createSessionToken(userId: string) {
  const payload = Buffer.from(
    JSON.stringify({ uid: userId, exp: Date.now() + SESSION_DAYS * 86400_000 })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function readSessionToken(token: string): string | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const { uid, exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof uid !== "string" || typeof exp !== "number" || exp < Date.now()) return null;
    return uid;
  } catch {
    return null;
  }
}

export function setSessionCookie(res: NextResponse, userId: string) {
  res.cookies.set(SESSION_COOKIE, createSessionToken(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
}

export async function getSessionUser(): Promise<PublicUser | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const uid = readSessionToken(token);
  if (!uid) return null;
  return getUserById(uid);
}

export function isAdminEmail(email: string) {
  const list = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}

export async function getAdminUser() {
  const u = await getSessionUser();
  return u && isAdminEmail(u.email) ? u : null;
}

export function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
}
