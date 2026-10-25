import { NextResponse } from "next/server";
import { getPaymentSettings } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ยอดรายเดือนที่แอดมินตั้งไว้ (เปิดเผยได้ — แสดงบนหน้าแพ็กเกจ) ไม่ส่งข้อมูลบัญชีธนาคาร
export async function GET() {
  try {
    const { priceSatang, firstPriceSatang } = await getPaymentSettings();
    return NextResponse.json(
      { ok: true, priceBaht: priceSatang / 100, firstPriceBaht: firstPriceSatang / 100 },
      { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } }
    );
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
