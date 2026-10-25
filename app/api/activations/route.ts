import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSessionUser } from "@/lib/auth";
import { createActivation } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fail = (error: string, status = 400) =>
  NextResponse.json({ ok: false, error }, { status });

const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// แจ้งแอดมินทางอีเมล (ถ้าตั้งค่า Resend ไว้) — ล้มเหลวได้ ไม่กระทบการบันทึก
async function notifyAdmin(a: Record<string, string>, memberEmail: string) {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) return;
  try {
    const rows = Object.entries({
      "ชื่อ-นามสกุล": a.name,
      "อีเมลสมาชิก": memberEmail,
      "ช่องทางติดต่อกลับ": a.contact,
      "โบรกเกอร์": a.broker,
      "เลขบัญชีเทรด": a.accountNumber,
      "เซิร์ฟเวอร์": a.server,
      "ข้อความเพิ่มเติม": a.note || "-",
    })
      .map(([k, v]) => `<tr><td style="padding:6px 8px;font-weight:bold;border:1px solid #ddd">${k}</td><td style="padding:6px 8px;border:1px solid #ddd">${esc(v)}</td></tr>`)
      .join("");
    await new Resend(RESEND_API_KEY).emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      subject: `แจ้งเปิดใช้งาน EA ใหม่จาก ${a.name}`,
      html: `<h2>แจ้งเปิดใช้งาน EA - PichaiFX Autotrad</h2><table style="border-collapse:collapse">${rows}</table><p>เข้าหน้า /admin เพื่ออนุมัติ</p>`,
    });
  } catch (e) {
    console.error("notifyAdmin failed:", e);
  }
}

export async function POST(request: Request) {
  const user = await getSessionUser().catch(() => null);
  if (!user) return fail("กรุณาเข้าสู่ระบบก่อนแจ้งเปิดใช้งาน", 401);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail("รูปแบบข้อมูลไม่ถูกต้อง");
  }

  const data = {
    name: clean(body.name, 80),
    contact: clean(body.contact, 120),
    broker: clean(body.broker, 80),
    accountNumber: clean(body.accountNumber, 40),
    server: clean(body.server, 80),
    note: clean(body.note, 1000),
  };
  if (!data.name || !data.contact || !data.broker || !data.accountNumber || !data.server) {
    return fail("กรุณากรอกข้อมูลให้ครบทุกช่องที่จำเป็น");
  }
  if (body.pdpaConsent !== true) return fail("กรุณายินยอมนโยบายความเป็นส่วนตัวก่อนส่งข้อมูล");

  try {
    const act = await createActivation(user.id, data);
    if (!act) return fail("บัญชีเทรดนี้เคยถูกแจ้งเข้ามาแล้ว หากเป็นความผิดพลาดกรุณาติดต่อแอดมิน", 409);
    await notifyAdmin(data, user.email);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("create activation failed:", e);
    return fail("บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", 500);
  }
}
