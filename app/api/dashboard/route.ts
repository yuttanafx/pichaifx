import { NextResponse } from "next/server";
import { getSessionUser, isAdminEmail } from "@/lib/auth";
import {
  getDownlineCounts,
  getUsersByIds,
  listActivationsOf,
  listCommissionsOf,
} from "@/lib/db";
import {
  COMMISSION_POOL_PERCENT,
  LEVEL_PERCENTS,
  PRICE_SATANG,
  levelAmountsSatang,
} from "@/lib/commission";
import type { DashboardData } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ซ่อนชื่อลูกข่ายเพื่อความเป็นส่วนตัว (PDPA) เช่น "สม***"
function maskName(name: string) {
  const chars = Array.from(name.trim());
  return `${chars.slice(0, 2).join("")}***`;
}

export async function GET() {
  const user = await getSessionUser().catch(() => null);
  if (!user) return NextResponse.json({ ok: false, error: "กรุณาเข้าสู่ระบบ" }, { status: 401 });

  try {
    const counts = await getDownlineCounts(user.id);

    const [commissions, activations] = await Promise.all([
      listCommissionsOf(user.id),
      listActivationsOf(user.id),
    ]);
    const sources = await getUsersByIds(commissions.map((c) => c.sourceUserId));

    const amounts = levelAmountsSatang();
    const sumBy = (f: (c: (typeof commissions)[number]) => boolean) =>
      commissions.filter(f).reduce((a, c) => a + c.amountSatang, 0);

    const data: DashboardData = {
      user: {
        name: user.name,
        email: user.email,
        refCode: user.refCode,
        isAdmin: isAdminEmail(user.email),
      },
      rules: {
        priceSatang: PRICE_SATANG,
        poolPercent: COMMISSION_POOL_PERCENT,
        levels: LEVEL_PERCENTS.map((percent, i) => ({
          level: i + 1,
          percent,
          amountSatang: amounts[i],
        })),
      },
      downline: counts.map((count, i) => ({ level: i + 1, count })),
      totals: {
        earnedSatang: sumBy(() => true),
        pendingSatang: sumBy((c) => c.status === "pending"),
        paidSatang: sumBy((c) => c.status === "paid"),
        byLevel: LEVEL_PERCENTS.map((_, i) => ({
          level: i + 1,
          amountSatang: sumBy((c) => c.level === i + 1),
        })),
      },
      commissions: commissions.slice(0, 100).map((c) => ({
        id: c.id,
        level: c.level,
        percent: c.percent,
        amountSatang: c.amountSatang,
        status: c.status,
        sourceMasked: maskName(sources.get(c.sourceUserId)?.name ?? "สมาชิก"),
        createdAt: c.createdAt,
        paidAt: c.paidAt,
      })),
      activations: activations.map((a) => ({
        id: a.id,
        broker: a.broker,
        accountNumber: a.accountNumber,
        status: a.status,
        createdAt: a.createdAt,
      })),
    };
    return NextResponse.json({ ok: true, data });
  } catch (e) {
    console.error("dashboard failed:", e);
    return NextResponse.json({ ok: false, error: "โหลดข้อมูลไม่สำเร็จ" }, { status: 500 });
  }
}
