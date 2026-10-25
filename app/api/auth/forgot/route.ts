import { NextResponse } from "next/server";
import { Resend } from "resend";
import { clientIp, createResetToken } from "@/lib/auth";
import { getUserByEmail, hitLoginLimit } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ok = () => NextResponse.json({ ok: true });
const fail = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail("รูปแบบข้อมูลไม่ถูกต้อง");
  }
  const email = String(body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return fail("อีเมลไม่ถูกต้อง");

  const { RESEND_API_KEY, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL) {
    return fail("ระบบส่งอีเมลยังไม่ได้ตั้งค่า (RESEND_API_KEY / CONTACT_FROM_EMAIL) กรุณาติดต่อผู้ดูแลระบบ", 500);
  }

  try {
    // จำกัด 5 ครั้ง / 15 นาที ต่อ IP และ 3 ครั้ง / 15 นาที ต่อ อีเมล
    if (await hitLoginLimit(`pfx:rl:forgot:ip:${clientIp(request)}`, 5)) return fail("ขอลิงก์บ่อยเกินไป กรุณารอ 15 นาที", 429);
    if (await hitLoginLimit(`pfx:rl:forgot:em:${email}`, 3)) return ok();

    const user = await getUserByEmail(email);
    if (user) {
      const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || new URL(request.url).origin;
      const link = `${origin}/reset-password?token=${encodeURIComponent(createResetToken(user.id, user.passwordHash))}`;
      const { error } = await new Resend(RESEND_API_KEY).emails.send({
        from: CONTACT_FROM_EMAIL,
        to: email,
        subject: "รีเซตรหัสผ่าน — PichaiFX Autotrad",
        text: `สวัสดีคุณ ${user.name}\n\nกดลิงก์ด้านล่างเพื่อตั้งรหัสผ่านใหม่ (ลิงก์ใช้ได้ 60 นาที และใช้ได้ครั้งเดียว)\n${link}\n\nหากคุณไม่ได้เป็นผู้ขอ สามารถเพิกเฉยอีเมลนี้ได้`,
        html: `<p>สวัสดีคุณ ${user.name.replace(/[<>&"]/g, "")}</p><p>กดปุ่มด้านล่างเพื่อตั้งรหัสผ่านใหม่ (ลิงก์ใช้ได้ 60 นาที และใช้ได้ครั้งเดียว)</p><p><a href="${link}" style="display:inline-block;padding:10px 18px;background:#06b6d4;color:#000;border-radius:6px;text-decoration:none">ตั้งรหัสผ่านใหม่</a></p><p style="color:#666;font-size:12px">หากคุณไม่ได้เป็นผู้ขอ สามารถเพิกเฉยอีเมลนี้ได้</p>`,
      });
      if (error) console.error("forgot: resend error", error);
    }
    // ตอบเหมือนกันเสมอ เพื่อไม่เปิดเผยว่าอีเมลนี้มีในระบบหรือไม่
    return ok();
  } catch (e) {
    console.error("forgot failed:", e);
    return fail("ดำเนินการไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", 500);
  }
}
