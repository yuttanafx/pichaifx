import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ADMIN_SEED_EMAIL } from "@/lib/admin-seed";
import { expiryOf, getUsersByIds, listApprovedActivations, markReminderSent } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REMIND_BEFORE_MS = 2 * 86400_000; // แจ้งเตือนล่วงหน้า 2 วัน
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const fmt = (iso: string) =>
  new Date(iso).toLocaleString("th-TH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Bangkok" });

/**
 * ถูกเรียกทุกวันโดย Vercel Cron (ดู vercel.json)
 * หาบัญชีที่จะหมดอายุภายใน 2 วัน (หรือหมดแล้วแต่ยังไม่เคยแจ้ง) แล้วส่งอีเมลสรุปให้แอดมิน + เตือนสมาชิก
 * ส่งครั้งเดียวต่อรอบการต่ออายุ (บันทึก reminderSentFor)
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL) {
    return NextResponse.json({ ok: false, error: "ยังไม่ได้ตั้งค่า Resend" }, { status: 500 });
  }

  try {
    const now = Date.now();
    const due = (await listApprovedActivations())
      .map((a) => ({ a, expiry: expiryOf(a) }))
      .filter(({ a, expiry }) => new Date(expiry).getTime() - now <= REMIND_BEFORE_MS && a.reminderSentFor !== expiry)
      .sort((x, y) => x.expiry.localeCompare(y.expiry));
    if (due.length === 0) return NextResponse.json({ ok: true, due: 0 });

    const users = await getUsersByIds(due.map(({ a }) => a.userId));
    const resend = new Resend(RESEND_API_KEY);
    const label = (expiry: string) =>
      new Date(expiry).getTime() < now ? "หมดอายุแล้ว" : "จะหมดอายุ";

    const rows = due
      .map(({ a, expiry }) => {
        const u = users.get(a.userId);
        return `<tr><td style="padding:6px 8px;border:1px solid #ddd">${esc(u?.name ?? a.name)}<br>${esc(u?.email ?? "-")}</td><td style="padding:6px 8px;border:1px solid #ddd">${esc(a.broker)} · ${esc(a.accountNumber)}</td><td style="padding:6px 8px;border:1px solid #ddd">${label(expiry)} ${fmt(expiry)}</td></tr>`;
      })
      .join("");
    const adminRes = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL || ADMIN_SEED_EMAIL,
      subject: `แจ้งเตือน: สมาชิก ${due.length} บัญชีใกล้หมดอายุรายเดือน`,
      html: `<h2>สมาชิกใกล้หมดอายุ (ภายใน 2 วัน)</h2><table style="border-collapse:collapse">${rows}</table><p>เข้าหน้า /admin แท็บ "สมาชิก" เพื่อต่ออายุเมื่อได้รับชำระเงิน</p>`,
    });
    if (adminRes.error) {
      console.error("expiry admin email failed:", adminRes.error);
      return NextResponse.json({ ok: false, error: "ส่งอีเมลไม่สำเร็จ" }, { status: 500 });
    }

    // เตือนสมาชิกเอง (ล้มเหลวได้ ไม่กระทบรอบนี้)
    for (const { a, expiry } of due) {
      const u = users.get(a.userId);
      if (!u) continue;
      await resend.emails
        .send({
          from: CONTACT_FROM_EMAIL,
          to: u.email,
          subject: "แจ้งเตือน: การใช้งาน EA รายเดือนของคุณใกล้หมดอายุ — PichaiFX Autotrad",
          text: `สวัสดีคุณ ${u.name}\n\nบัญชีเทรด ${a.broker} ${a.accountNumber} ${label(expiry)} ${fmt(expiry)}\nกรุณาติดต่อเพื่อต่ออายุรายเดือนเพื่อใช้งานต่อเนื่อง`,
        })
        .catch((e) => console.error("expiry member email failed:", e));
    }

    for (const { a, expiry } of due) await markReminderSent(a.id, expiry);
    return NextResponse.json({ ok: true, due: due.length });
  } catch (e) {
    console.error("expiry cron failed:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
