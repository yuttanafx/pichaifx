import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import {
  getUplineChain,
  getUsersByIds,
  listAllActivations,
  listAllCommissions,
} from "@/lib/db";
import { levelAmountsSatang } from "@/lib/commission";
import type { AdminOverview } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await getAdminUser().catch(() => null);
  if (!admin) return NextResponse.json({ ok: false, error: "ไม่มีสิทธิ์เข้าถึง" }, { status: 403 });

  try {
    const [acts, coms] = await Promise.all([listAllActivations(), listAllCommissions()]);
    const users = await getUsersByIds([
      ...acts.map((a) => a.userId),
      ...coms.flatMap((c) => [c.beneficiaryId, c.sourceUserId]),
    ]);
    const amounts = levelAmountsSatang();

    const activations: AdminOverview["activations"] = [];
    for (const a of acts) {
      // แสดงตัวอย่างว่าถ้าอนุมัติ ใครจะได้เท่าไหร่ (เฉพาะรายการที่รออนุมัติ)
      const upline =
        a.status === "pending"
          ? (await getUplineChain(a.userId)).map((u, i) => ({
              level: i + 1,
              name: u.name,
              email: u.email,
              amountSatang: amounts[i],
            }))
          : [];
      activations.push({ ...a, userEmail: users.get(a.userId)?.email ?? "-", upline });
    }

    const commissions: AdminOverview["commissions"] = coms.map((c) => ({
      ...c,
      beneficiaryName: users.get(c.beneficiaryId)?.name ?? "-",
      beneficiaryEmail: users.get(c.beneficiaryId)?.email ?? "-",
      sourceName: users.get(c.sourceUserId)?.name ?? "-",
    }));

    return NextResponse.json({ ok: true, data: { activations, commissions } });
  } catch (e) {
    console.error("admin overview failed:", e);
    return NextResponse.json({ ok: false, error: "โหลดข้อมูลไม่สำเร็จ" }, { status: 500 });
  }
}
