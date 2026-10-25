import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { savePaymentSettings } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fail = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });

export async function POST(request: Request) {
  const admin = await getAdminUser().catch(() => null);
  if (!admin) return fail("ไม่มีสิทธิ์เข้าถึง", 403);

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const priceBaht = Number(body.priceBaht);
  const firstPriceBaht = Number(body.firstPriceBaht);
  const okPrice = (n: number) => Number.isFinite(n) && n > 0 && n <= 1_000_000;
  if (!okPrice(firstPriceBaht)) return fail("ค่าสมาชิกครั้งแรกไม่ถูกต้อง");
  if (!okPrice(priceBaht)) return fail("ยอดเงินรายเดือนไม่ถูกต้อง");
  const accountNumber = String(body.accountNumber ?? "").replace(/[\s-]/g, "");
  if (accountNumber && !/^\d{10,15}$/.test(accountNumber)) return fail("เลขบัญชีต้องเป็นตัวเลข 10-15 หลัก");

  try {
    await savePaymentSettings({
      firstPriceSatang: Math.round(firstPriceBaht * 100),
      priceSatang: Math.round(priceBaht * 100),
      bankName: String(body.bankName ?? "").trim().slice(0, 60),
      accountNumber,
      accountName: String(body.accountName ?? "").trim().slice(0, 100),
      note: String(body.note ?? "").trim().slice(0, 300),
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("save settings failed:", e);
    return fail("บันทึกไม่สำเร็จ", 500);
  }
}
