import { NextResponse } from "next/server";
import { hashPassword, readResetToken, resetFingerprint, setSessionCookie } from "@/lib/auth";
import { getStoredUserById, updatePasswordHash } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fail = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail("รูปแบบข้อมูลไม่ถูกต้อง");
  }
  const token = String(body.token ?? "");
  const password = String(body.password ?? "");
  if (password.length < 8 || password.length > 100) return fail("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");

  const parsed = readResetToken(token);
  const expired = "ลิงก์หมดอายุหรือถูกใช้ไปแล้ว กรุณาขอลิงก์ใหม่";
  if (!parsed) return fail(expired, 400);

  try {
    const user = await getStoredUserById(parsed.uid);
    if (!user || resetFingerprint(user.passwordHash) !== parsed.fp) return fail(expired, 400);

    await updatePasswordHash(user.id, await hashPassword(password));
    const res = NextResponse.json({ ok: true });
    setSessionCookie(res, user.id);
    return res;
  } catch (e) {
    console.error("reset failed:", e);
    return fail("เปลี่ยนรหัสผ่านไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", 500);
  }
}
