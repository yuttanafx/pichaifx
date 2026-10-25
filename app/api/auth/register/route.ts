import { NextResponse } from "next/server";
import { hashPassword, setSessionCookie } from "@/lib/auth";
import { createUser, getUserByRefCode } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fail = (error: string, status = 400) =>
  NextResponse.json({ ok: false, error }, { status });

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail("รูปแบบข้อมูลไม่ถูกต้อง");
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  const refCode = String(body.refCode ?? "").trim();

  if (name.length < 2 || name.length > 80) return fail("กรุณากรอกชื่อ-นามสกุล");
  if (!EMAIL_RE.test(email) || email.length > 120) return fail("อีเมลไม่ถูกต้อง");
  if (password.length < 8 || password.length > 100) return fail("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
  if (body.pdpaConsent !== true) return fail("กรุณายินยอมนโยบายความเป็นส่วนตัวก่อนสมัคร");

  try {
    let referrerId: string | null = null;
    if (refCode) {
      const referrer = await getUserByRefCode(refCode);
      if (!referrer) return fail("ไม่พบรหัสแนะนำนี้ กรุณาตรวจสอบอีกครั้ง หรือเว้นว่างไว้");
      referrerId = referrer.id;
    }

    const user = await createUser({
      email,
      name,
      passwordHash: await hashPassword(password),
      referrerId,
    });
    if (!user) return fail("อีเมลนี้ถูกใช้สมัครแล้ว", 409);

    const res = NextResponse.json({ ok: true });
    setSessionCookie(res, user.id);
    return res;
  } catch (e) {
    console.error("register failed:", e);
    return fail("สมัครสมาชิกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", 500);
  }
}
