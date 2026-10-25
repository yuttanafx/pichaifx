import { NextResponse } from "next/server";
import { getSessionUser, isAdminEmail } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ ok: true, user: null });
    return NextResponse.json({
      ok: true,
      user: { name: user.name, email: user.email, isAdmin: isAdminEmail(user.email) },
    });
  } catch {
    // ถ้ายังไม่ได้ตั้งค่า Redis/SESSION_SECRET ให้ถือว่ายังไม่ได้ล็อกอิน ไม่ให้หน้าเว็บพัง
    return NextResponse.json({ ok: true, user: null });
  }
}
