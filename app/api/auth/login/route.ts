import { NextResponse } from "next/server";
import { clientIp, setSessionCookie, verifyPassword } from "@/lib/auth";
import { getUserByEmail } from "@/lib/db";
import { cmd } from "@/lib/redis";

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
    const tries = await cmd<number>("INCR", rlKey);
    if (tries === 1) await cmd("EXPIRE", rlKey, 900);
    if (tries > 8) return fail("ลองเข้าสู่ระบบหลายครั้งเกินไป กรุณารอ 15 นาที", 429);

    const user = await getUserByEmail(email);
    const ok = user ? await verifyPassword(password, user.passwordHash) : false;
    if (!user || !ok) return fail("อีเมลหรือรหัสผ่านไม่ถูกต้อง", 401);

    await cmd("DEL", rlKey);
    const res = NextResponse.json({ ok: true });
    setSessionCookie(res, user.id);
    return res;
  } catch (e) {
    console.error("login failed:", e);
    return fail("เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", 500);
  }
}
