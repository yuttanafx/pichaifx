import { NextResponse } from "next/server";
import { getAdminUser, isAdminEmail } from "@/lib/auth";
import {
  expiryOf,
  getPaymentSettings,
  getUplineChain,
  listAllUsers,
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
    const [acts, coms, allUsers] = await Promise.all([
      listAllActivations(),
      listAllCommissions(),
      listAllUsers(),
    ]);
    const nameById = new Map(allUsers.map((u) => [u.id, u.name]));
    const users = await getUsersByIds([
      ...acts.map((a) => a.userId),
      ...coms.flatMap((c) => [c.beneficiaryId, c.sourceUserId]),
    ]);
    const settings = await getPaymentSettings();
    const amounts = levelAmountsSatang(settings.priceSatang);

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
      beneficiaryBank: users.get(c.beneficiaryId)?.bank ?? null,
      sourceName: users.get(c.sourceUserId)?.name ?? "-",
    }));

    const members: AdminOverview["members"] = allUsers.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      refCode: u.refCode,
      referrerName: u.referrerId ? nameById.get(u.referrerId) ?? "-" : "-",
      createdAt: u.createdAt,
      isAdmin: isAdminEmail(u.email),
      bank: u.bank ?? null,
      accounts: acts
        .filter((a) => a.userId === u.id && a.status !== "rejected")
        .map((a) => ({
          activationId: a.id,
          broker: a.broker,
          accountNumber: a.accountNumber,
          status: a.status,
          expiresAt: a.status === "approved" ? expiryOf(a) : undefined,
        })),
    }));

    return NextResponse.json({ ok: true, data: { settings, members, activations, commissions } });
  } catch (e) {
    console.error("admin overview failed:", e);
    return NextResponse.json({ ok: false, error: "โหลดข้อมูลไม่สำเร็จ" }, { status: 500 });
  }
}
