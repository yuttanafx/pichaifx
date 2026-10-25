import { NextResponse } from "next/server";
import { clientIp, setSessionCookie, verifyPassword } from "@/lib/auth";
import { clearLoginLimit, createUser, getUserByEmail, hitLoginLimit } from "@/lib/db";
import { ADMIN_SEED_EMAIL, ADMIN_SEED_HASH, ADMIN_SEED_NAME } from "@/lib/admin-seed";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fail = (error: string, status = 400) =>
  NextResponse.json({ ok: false, error }, { status });

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail("รูปแบบข้อมูลไม่ถูกต้อง");
  }
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  if (!email || !password) return fail("กรุณากรอกอีเมลและรหัสผ่าน");

  try {
    // จำกัดการลองรหัสผ่าน: 8 ครั้ง / 15 นาที ต่อ (IP + อีเมล)
    const rlKey = `pfx:rl:login:${clientIp(request)}:${email}`;
    if (await hitLoginLimit(rlKey)) return fail("ลองเข้าสู่ระบบหลายครั้งเกินไป กรุณารอ 15 นาที", 429);

    let user = await getUserByEmail(email);
    // สร้างบัญชีแอดมินเริ่มต้นอัตโนมัติ (ครั้งแรกเท่านั้น และต้องรหัสผ่านตรงกับแฮชที่ตั้งไว้)
    if (!user && email === ADMIN_SEED_EMAIL && (await verifyPassword(password, ADMIN_SEED_HASH))) {
      await createUser({ email, name: ADMIN_SEED_NAME, passwordHash: ADMIN_SEED_HASH, referrerId: null });
      user = await getUserByEmail(email);
    }
    const ok = user ? await verifyPassword(password, user.passwordHash) : false;
    if (!user || !ok) return fail("อีเมลหรือรหัสผ่านไม่ถูกต้อง", 401);

    await clearLoginLimit(rlKey);
    const res = NextResponse.json({ ok: true });
    setSessionCookie(res, user.id);
    return res;
  } catch (e) {
    console.error("login failed:", e);
    return fail("เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", 500);
  }
}
