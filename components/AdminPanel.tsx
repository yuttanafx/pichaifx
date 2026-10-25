"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminOverview } from "@/lib/types";
import { baht, thaiDate } from "@/lib/format";

const th = "py-2 font-normal";

export default function AdminPanel() {
  const router = useRouter();
  const [data, setData] = useState<AdminOverview | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [tab, setTab] = useState<"acts" | "coms">("acts");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/overview", { cache: "no-store" });
      if (res.status === 403) {
        router.replace("/dashboard");
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

  const act = async (url: string, body: object, confirmText?: string) => {
    if (confirmText && !window.confirm(confirmText)) return;
    const key = JSON.stringify(body);
    setBusy(key);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!json.ok) window.alert(json.error || "ดำเนินการไม่สำเร็จ");
    } finally {
      setBusy(null);
      load();
    }
  };

  if (error) return <p className="mx-auto max-w-6xl px-6 py-24 text-sm text-red-400">{error}</p>;
  if (!data) return <p className="mx-auto max-w-6xl px-6 py-24 text-sm text-dim">กำลังโหลด...</p>;

  const pending = data.activations.filter((a) => a.status === "pending");
  const unpaid = data.commissions.filter((c) => c.status === "pending");
  const unpaidSum = unpaid.reduce((s, c) => s + c.amountSatang, 0);

  const tabBtn = (id: "acts" | "coms", label: string) => (
    <button
      onClick={() => setTab(id)}
      className={`rounded-md px-4 py-2 text-sm ${tab === id ? "bg-cyan text-ink" : "border border-line text-dim hover:text-paper"}`}
    >
      {label}
    </button>
  );

  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-6">
        <a href="/dashboard" className="text-sm text-cyan">← แดชบอร์ด</a>
        <h1 className="mt-3 font-display text-3xl font-semibold text-paper">จัดการระบบ</h1>
        <div className="mt-6 flex flex-wrap gap-3">
          {tabBtn("acts", `คำขอเปิดใช้งาน EA (รอ ${pending.length})`)}
          {tabBtn("coms", `ค่าแนะนำ (ค้างจ่าย ${baht(unpaidSum)})`)}
        </div>

        {tab === "acts" && (
          <div className="mt-6 flex flex-col gap-4">
            {data.activations.length === 0 && <p className="text-sm text-dim">ยังไม่มีคำขอ</p>}
            {data.activations.map((a) => (
              <div key={a.id} className="rounded-xl border border-line bg-panel p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1 text-sm">
                    <p className="text-paper">{a.name} <span className="text-dim">· {a.userEmail}</span></p>
                    <p className="text-dim">ติดต่อ: {a.contact}</p>
                    <p className="text-dim">
                      {a.broker} · <span className="font-mono text-paper">{a.accountNumber}</span> · {a.server}
                    </p>
                    {a.note && <p className="text-dim">หมายเหตุ: {a.note}</p>}
                    <p className="text-xs text-dim">{thaiDate(a.createdAt)} · สถานะ: {a.status}</p>
                  </div>

                  {a.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        disabled={!!busy}
                        onClick={() =>
                          act(
                            "/api/admin/activations",
                            { id: a.id, action: "approve" },
                            `ยืนยันว่าได้รับชำระเงินแล้ว และอนุมัติการเปิดใช้งานของ ${a.name}?\nระบบจะสร้างค่าแนะนำให้สายแนะนำทันที`
                          )
                        }
                        className="rounded-md bg-cyan px-4 py-2 text-sm font-medium text-ink disabled:opacity-40"
                      >
                        อนุมัติ
                      </button>
                      <button
                        disabled={!!busy}
                        onClick={() => act("/api/admin/activations", { id: a.id, action: "reject" }, "ปฏิเสธคำขอนี้?")}
                        className="rounded-md border border-line px-4 py-2 text-sm text-rose disabled:opacity-40"
                      >
                        ปฏิเสธ
                      </button>
                    </div>
                  )}
                </div>

                {a.status === "pending" && (
                  <div className="mt-4 rounded-lg border border-line bg-panel2 p-4 text-sm">
                    <p className="text-xs text-dim">ถ้าอนุมัติ ค่าแนะนำจะจ่ายให้</p>
                    {a.upline.length === 0 ? (
                      <p className="mt-2 text-dim">ไม่มีผู้แนะนำ — ไม่มีค่าแนะนำเกิดขึ้น</p>
                    ) : (
                      <ul className="mt-2 space-y-1">
                        {a.upline.map((u) => (
                          <li key={u.level} className="flex justify-between gap-4">
                            <span className="text-paper">ชั้น {u.level}: {u.name} <span className="text-dim">({u.email})</span></span>
                            <span className="font-mono text-paper">{baht(u.amountSatang)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "coms" && (
          <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-panel p-5">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-xs text-dim">
                <tr>
                  <th className={th}>วันที่</th>
                  <th className={th}>ผู้รับ</th>
                  <th className={th}>จากสมาชิก</th>
                  <th className={th}>ชั้น</th>
                  <th className={`${th} text-right`}>จำนวนเงิน</th>
                  <th className={`${th} pl-4`}>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {data.commissions.map((c) => (
                  <tr key={c.id} className="border-t border-line">
                    <td className="py-3 text-dim">{thaiDate(c.createdAt)}</td>
                    <td className="py-3 text-paper">{c.beneficiaryName}<br /><span className="text-xs text-dim">{c.beneficiaryEmail}</span></td>
                    <td className="py-3 text-dim">{c.sourceName}</td>
                    <td className="py-3 text-dim">{c.level} ({c.percent}%)</td>
                    <td className="py-3 text-right font-mono text-paper">{baht(c.amountSatang)}</td>
                    <td className="py-3 pl-4">
                      {c.status === "paid" ? (
                        <span className="text-xs text-mint">จ่ายแล้ว</span>
                      ) : (
                        <button
                          disabled={!!busy}
                          onClick={() => act("/api/admin/commissions", { id: c.id }, `ทำเครื่องหมายว่าโอน ${baht(c.amountSatang)} ให้ ${c.beneficiaryName} แล้ว?`)}
                          className="rounded-md border border-cyan/40 px-3 py-1.5 text-xs text-cyan disabled:opacity-40"
                        >
                          ทำเครื่องหมายจ่ายแล้ว
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data.commissions.length === 0 && <p className="py-4 text-sm text-dim">ยังไม่มีรายการ</p>}
          </div>
        )}
      </div>
    </section>
  );
}
