import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ConnectAccountPayload = {
  name?: string;
  contact?: string;
  broker?: string;
  accountNumber?: string;
  server?: string;
  note?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: ConnectAccountPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "รูปแบบข้อมูลไม่ถูกต้อง" },
      { status: 400 }
    );
  }

  const { name, contact, broker, accountNumber, server, note } = body;

  if (!name?.trim() || !contact?.trim() || !broker?.trim() || !accountNumber?.trim() || !server?.trim()) {
    return NextResponse.json(
      { ok: false, error: "กรุณากรอกข้อมูลให้ครบทุกช่องที่จำเป็น" },
      { status: 400 }
    );
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error(
      "Missing Resend configuration. Please set RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL in .env.local"
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "เซิร์ฟเวอร์ยังไม่ได้ตั้งค่าอีเมล กรุณาติดต่อผู้ดูแลระบบให้ตั้งค่า Resend ในไฟล์ .env.local",
      },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(RESEND_API_KEY);

    const safe = {
      name: escapeHtml(name.trim()),
      contact: escapeHtml(contact.trim()),
      broker: escapeHtml(broker.trim()),
      accountNumber: escapeHtml(accountNumber.trim()),
      server: escapeHtml(server.trim()),
      note: note?.trim() ? escapeHtml(note.trim()) : "",
    };

    const html = `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #111;">
        <h2 style="margin-bottom: 16px;">แจ้งบัญชีเทรดใหม่ - PichaiFX Autotrad</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 480px;">
          <tbody>
            <tr><td style="padding:6px 8px; font-weight:bold; border:1px solid #ddd;">ชื่อ-นามสกุล</td><td style="padding:6px 8px; border:1px solid #ddd;">${safe.name}</td></tr>
            <tr><td style="padding:6px 8px; font-weight:bold; border:1px solid #ddd;">ช่องทางติดต่อกลับ</td><td style="padding:6px 8px; border:1px solid #ddd;">${safe.contact}</td></tr>
            <tr><td style="padding:6px 8px; font-weight:bold; border:1px solid #ddd;">โบรกเกอร์</td><td style="padding:6px 8px; border:1px solid #ddd;">${safe.broker}</td></tr>
            <tr><td style="padding:6px 8px; font-weight:bold; border:1px solid #ddd;">เลขบัญชีเทรด</td><td style="padding:6px 8px; border:1px solid #ddd;">${safe.accountNumber}</td></tr>
            <tr><td style="padding:6px 8px; font-weight:bold; border:1px solid #ddd;">เซิร์ฟเวอร์</td><td style="padding:6px 8px; border:1px solid #ddd;">${safe.server}</td></tr>
            <tr><td style="padding:6px 8px; font-weight:bold; border:1px solid #ddd; vertical-align:top;">ข้อความเพิ่มเติม</td><td style="padding:6px 8px; border:1px solid #ddd;">${safe.note || "-"}</td></tr>
          </tbody>
        </table>
      </div>
    `;

    const text = [
      "แจ้งบัญชีเทรดใหม่ - PichaiFX Autotrad",
      `ชื่อ-นามสกุล: ${name}`,
      `ช่องทางติดต่อกลับ: ${contact}`,
      `โบรกเกอร์: ${broker}`,
      `เลขบัญชีเทรด: ${accountNumber}`,
      `เซิร์ฟเวอร์: ${server}`,
      `ข้อความเพิ่มเติม: ${note?.trim() || "-"}`,
    ].join("\n");

    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      subject: `แจ้งบัญชีเทรดใหม่จาก ${name}`,
      text,
      html,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { ok: false, error: "ส่งอีเมลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      { ok: false, error: "ส่งอีเมลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }
}
