import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { approveActivation, rejectActivation } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const admin = await getAdminUser().catch(() => null);
  if (!admin) return NextResponse.json({ ok: false, error: "ไม่มีสิทธิ์เข้าถึง" }, { status: 403 });

  const { id, action } = (await request.json().catch(() => ({}))) as {
    id?: string;
    action?: string;
  };
  if (!id || (action !== "approve" && action !== "reject")) {
    return NextResponse.json({ ok: false, error: "คำขอไม่ถูกต้อง" }, { status: 400 });
  }

  try {
    const result = action === "approve" ? await approveActivation(id) : await rejectActivation(id);
    if (!result) {
      return NextResponse.json(
        { ok: false, error: "รายการนี้ถูกดำเนินการไปแล้วหรือไม่พบรายการ" },
        { status: 409 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("admin activation action failed:", e);
    return NextResponse.json({ ok: false, error: "ดำเนินการไม่สำเร็จ" }, { status: 500 });
  }
}
