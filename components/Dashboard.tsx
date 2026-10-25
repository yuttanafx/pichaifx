"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { DashboardData } from "@/lib/types";
import BankForm from "@/components/BankForm";
import { baht, thaiDate } from "@/lib/format";

const statusLabel: Record<string, { text: string; cls: string }> = {
  pending: { text: "รอดำเนินการ", cls: "border-amber-400/30 bg-amber-400/10 text-amber-400" },
  approved: { text: "เปิดใช้งานแล้ว", cls: "border-mint/30 bg-mint/10 text-mint" },
  rejected: { text: "ไม่ผ่าน", cls: "border-rose/30 bg-rose/10 text-rose" },
  paid: { text: "จ่ายแล้ว", cls: "border-mint/30 bg-mint/10 text-mint" },
};

function Badge({ status }: { status: string }) {
  const s = statusLabel[status] ?? statusLabel.pending;
  return <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs ${s.cls}`}>{s.text}</span>;
}

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/dashboard", { cache: "no-store" });
      if (res.status === 401) {
        router.replace("/login");
        return;
      }
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      setData(json.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "โหลดข้อมูลไม่สำเร็จ");
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  if (error) {
    return <p className="mx-auto max-w-5xl px-6 py-24 text-sm text-red-400">{error}</p>;
  }
  if (!data) {
    return <p className="mx-auto max-w-5xl px-6 py-24 text-sm text-dim">กำลังโหลด...</p>;
  }

  const refUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/register?ref=${data.user.refCode}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(refUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  const card = "rounded-xl border border-line bg-panel p-6";
  const payment = data.payment;
  const approved = data.activations.filter((a) => a.status === "approved" && a.expiresAt);
  const dLeft = (iso: string) => Math.ceil((new Date(iso).getTime() - Date.now()) / 86400_000);

  return (
    <section className="py-14">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-cyan">แดชบอร์ดสมาชิก</p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-paper">สวัสดี {data.user.name}</h1>
            <p className="mt-1 text-sm text-dim">{data.user.email}</p>
          </div>
          <div className="flex gap-3">
            {data.user.isAdmin && (
              <a href="/admin" className="rounded-md border border-line px-4 py-2 text-sm text-paper hover:border-cyan/40">
                จัดการระบบ
              </a>
            )}
            <button onClick={logout} className="rounded-md border border-line px-4 py-2 text-sm text-dim hover:text-paper">
              ออกจากระบบ
            </button>
          </div>
        </div>

        {/* ชำระค่าบริการรายเดือน */}
        <div className={`${card} mt-10 border-cyan/30`}>
          <p className="text-sm font-medium text-paper">ชำระค่าบริการรายเดือน</p>
          <p className="mt-2 font-mono text-3xl text-paper">{baht(payment.priceSatang)} <span className="text-sm text-dim">/ เดือน</span></p>
          {payment.accountNumber ? (
            <div className="mt-4 rounded-lg border border-line bg-panel2 p-4 text-sm">
              <p className="text-xs text-dim">โอนเงินมาที่บัญชีนี้ แล้วแจ้งสลิปกับแอดมิน</p>
              <p className="mt-2 text-paper">{payment.bankName}</p>
              <p className="font-mono text-lg text-cyan">{payment.accountNumber}</p>
              <p className="text-paper">ชื่อบัญชี: {payment.accountName}</p>
              {payment.note && <p className="mt-2 text-xs text-dim">{payment.note}</p>}
            </div>
          ) : (
            <p className="mt-4 text-sm text-dim">แอดมินยังไม่ได้ตั้งค่าบัญชีรับโอน กรุณาติดต่อแอดมิน</p>
          )}
          {approved.length > 0 && (
            <ul className="mt-4 space-y-1 text-sm">
              {approved.map((a) => {
                const d = dLeft(a.expiresAt!);
                return (
                  <li key={a.id} className="flex flex-wrap justify-between gap-2">
                    <span className="text-dim">{a.broker} · <span className="font-mono text-paper">{a.accountNumber}</span></span>
                    <span className={d < 0 ? "text-rose" : d <= 2 ? "text-amber-400" : "text-mint"}>
                      {d < 0 ? `หมดอายุแล้ว ${-d} วัน` : d === 0 ? "หมดอายุวันนี้" : `เหลือ ${d} วัน`} (หมด {thaiDate(a.expiresAt!)})
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* สรุปรายได้ */}
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className={`${card} border-cyan/30 shadow-glow`}>
            <p className="text-xs text-dim">รายได้ค่าแนะนำสะสมทั้งหมด</p>
            <p className="mt-2 font-mono text-3xl text-paper">{baht(data.totals.earnedSatang)}</p>
          </div>
          <div className={card}>
            <p className="text-xs text-dim">รอจ่าย</p>
            <p className="mt-2 font-mono text-2xl text-amber-400">{baht(data.totals.pendingSatang)}</p>
          </div>
          <div className={card}>
            <p className="text-xs text-dim">จ่ายแล้ว</p>
            <p className="mt-2 font-mono text-2xl text-mint">{baht(data.totals.paidSatang)}</p>
          </div>
        </div>

        {/* บัญชีธนาคารรับค่าแนะนำ */}
        <div className={`${card} mt-4`}>
          <p className="text-sm font-medium text-paper">บัญชีธนาคารสำหรับรับค่าแนะนำ</p>
          <p className="mt-1 text-xs text-dim">ชื่อบัญชีต้องตรงกับชื่อสมาชิก ({data.user.name}) แอดมินจะโอนค่าแนะนำเข้าบัญชีนี้</p>
          <BankForm initial={data.bank} onSaved={load} />
        </div>

        {/* ลิงก์แนะนำ */}
        <div className={`${card} mt-4`}>
          <p className="text-sm font-medium text-paper">ลิงก์แนะนำของคุณ</p>
          <p className="mt-1 text-xs text-dim">
            รหัสแนะนำ: <span className="font-mono text-cyan">{data.user.refCode}</span>
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input readOnly value={refUrl} onFocus={(e) => e.currentTarget.select()}
              className="flex-1 rounded-md border border-line bg-panel2 px-3.5 py-2.5 font-mono text-xs text-paper outline-none" />
            <button onClick={copy} className="rounded-md bg-cyan px-5 py-2.5 text-sm font-medium text-ink">
              {copied ? "คัดลอกแล้ว ✓" : "คัดลอกลิงก์"}
            </button>
          </div>
        </div>

        {/* โครงสร้าง 3 ชั้น */}
        <div className={`${card} mt-4`}>
          <p className="text-sm font-medium text-paper">
            ค่าแนะนำ {data.rules.poolPercent}% ของราคา EA {baht(data.rules.priceSatang)} จ่ายสามชั้น
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {data.rules.levels.map((l) => {
              const dl = data.downline.find((d) => d.level === l.level)?.count ?? 0;
              const earned = data.totals.byLevel.find((b) => b.level === l.level)?.amountSatang ?? 0;
              return (
                <div key={l.level} className="rounded-lg border border-line bg-panel2 p-5">
                  <p className="font-mono text-[11px] text-cyan">ชั้นที่ {l.level}</p>
                  <p className="mt-2 font-display text-2xl text-paper">{l.percent}%</p>
                  <p className="text-xs text-dim">ได้ {baht(l.amountSatang)} / 1 การเปิดใช้งาน</p>
                  <div className="mt-4 flex justify-between text-xs">
                    <span className="text-dim">สมาชิกในชั้นนี้</span>
                    <span className="font-mono text-paper">{dl} คน</span>
                  </div>
                  <div className="mt-1.5 flex justify-between text-xs">
                    <span className="text-dim">รายได้จากชั้นนี้</span>
                    <span className="font-mono text-paper">{baht(earned)}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-dim">
            ค่าแนะนำจะเกิดขึ้นเมื่อแอดมินอนุมัติการเปิดใช้งาน EA ของสมาชิกในสายของคุณแล้วเท่านั้น
          </p>
        </div>

        {/* รายการค่าแนะนำ */}
        <div className={`${card} mt-4`}>
          <p className="text-sm font-medium text-paper">รายการค่าแนะนำ</p>
          {data.commissions.length === 0 ? (
            <p className="mt-4 text-sm text-dim">ยังไม่มีรายการ — แชร์ลิงก์แนะนำของคุณเพื่อเริ่มสร้างรายได้</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="text-xs text-dim">
                  <tr>
                    <th className="py-2 font-normal">วันที่</th>
                    <th className="py-2 font-normal">จากสมาชิก</th>
                    <th className="py-2 font-normal">ชั้น</th>
                    <th className="py-2 text-right font-normal">จำนวนเงิน</th>
                    <th className="py-2 pl-4 font-normal">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {data.commissions.map((c) => (
                    <tr key={c.id} className="border-t border-line">
                      <td className="py-3 text-dim">{thaiDate(c.createdAt)}</td>
                      <td className="py-3 text-paper">{c.sourceMasked}</td>
                      <td className="py-3 text-dim">ชั้น {c.level} ({c.percent}%)</td>
                      <td className="py-3 text-right font-mono text-paper">{baht(c.amountSatang)}</td>
                      <td className="py-3 pl-4"><Badge status={c.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* คำขอเปิดใช้งาน EA ของฉัน */}
        <div className={`${card} mt-4`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-paper">การแจ้งเปิดใช้งาน EA ของฉัน</p>
            <a href="/#connect-account" className="rounded-md border border-line px-4 py-2 text-sm text-paper hover:border-cyan/40">
              + แจ้งเปิดใช้งานบัญชีใหม่
            </a>
          </div>
          {data.activations.length === 0 ? (
            <p className="mt-4 text-sm text-dim">ยังไม่มีรายการแจ้งเปิดใช้งาน</p>
          ) : (
            <ul className="mt-4 divide-y divide-[color:var(--color-line)]">
              {data.activations.map((a) => (
                <li key={a.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                  <span className="text-paper">
                    {a.broker} · <span className="font-mono">{a.accountNumber}</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-xs text-dim">{thaiDate(a.createdAt)}</span>
                    <Badge status={a.status} />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
