import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { markCommissionPaid } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const admin = await getAdminUser().catch(() => null);
  if (!admin) return NextResponse.json({ ok: false, error: "ไม่มีสิทธิ์เข้าถึง" }, { status: 403 });

  const { id } = (await request.json().catch(() => ({}))) as { id?: string };
  if (!id) return NextResponse.json({ ok: false, error: "คำขอไม่ถูกต้อง" }, { status: 400 });

  try {
    const c = await markCommissionPaid(id);
    if (!c) return NextResponse.json({ ok: false, error: "ไม่พบรายการ" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("mark paid failed:", e);
    return NextResponse.json({ ok: false, error: "ดำเนินการไม่สำเร็จ" }, { status: 500 });
  }
}
