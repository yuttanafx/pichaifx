import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { setUserBank } from "@/lib/db";
import { normName } from "@/lib/format";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fail = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });

export async function POST(request: Request) {
  const user = await getSessionUser().catch(() => null);
  if (!user) return fail("กรุณาเข้าสู่ระบบ", 401);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail("รูปแบบข้อมูลไม่ถูกต้อง");
  }
  const bankName = String(body.bankName ?? "").trim().slice(0, 60);
  const accountNumber = String(body.accountNumber ?? "").replace(/[\s-]/g, "");
  const accountName = String(body.accountName ?? "").trim().slice(0, 100);

  if (!bankName) return fail("กรุณาเลือก/กรอกชื่อธนาคาร");
  if (!/^\d{10,15}$/.test(accountNumber)) return fail("เลขบัญชีต้องเป็นตัวเลข 10-15 หลัก");
  if (!accountName) return fail("กรุณากรอกชื่อบัญชี");
  if (normName(accountName) !== normName(user.name)) {
    return fail(`ชื่อบัญชีต้องตรงกับชื่อสมาชิกที่สมัครไว้ (${user.name})`);
  }

  try {
    await setUserBank(user.id, { bankName, accountNumber, accountName });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("set bank failed:", e);
    return fail("บันทึกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", 500);
  }
}
