"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminOverview } from "@/lib/types";
import { baht, thaiDate } from "@/lib/format";
import type { PaymentSettings } from "@/lib/types";

const th = "py-2 font-normal";
const DAY = 86400_000;
const daysLeft = (iso: string) => Math.ceil((new Date(iso).getTime() - Date.now()) / DAY);
const expiryText = (iso: string) => {
  const d = daysLeft(iso);
  return d < 0 ? `หมดอายุแล้ว ${-d} วัน` : d === 0 ? "หมดอายุวันนี้" : `เหลือ ${d} วัน`;
};

export default function AdminPanel() {
  const router = useRouter();
  const [data, setData] = useState<AdminOverview | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Set<string>>(new Set());
  const toggle = (id: string) =>
    setOpen((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  const [tab, setTab] = useState<"acts" | "coms" | "members" | "settings">("acts");

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

  const accounts = data.members.flatMap((m) =>
    m.accounts.map((a) => ({ ...a, member: m }))
  );
  const expiring = accounts
    .filter((a) => a.status === "approved" && a.expiresAt && daysLeft(a.expiresAt) <= 2)
    .sort((x, y) => x.expiresAt!.localeCompare(y.expiresAt!));
  const needle = q.trim().toLowerCase();
  const members = data.members.filter(
    (m) =>
      !needle ||
      m.name.toLowerCase().includes(needle) ||
      m.email.toLowerCase().includes(needle) ||
      m.refCode.toLowerCase().includes(needle) ||
      m.accounts.some((a) => a.accountNumber.toLowerCase().includes(needle))
  );

  const renewBtn = (id: string, who: string) => (
    <button
      disabled={!!busy}
      onClick={() =>
        act("/api/admin/activations", { id, action: "renew" }, `ยืนยันว่าได้รับชำระรายเดือนของ ${who} แล้ว และต่ออายุ 30 วัน?`)
      }
      className="rounded-md border border-cyan/40 px-3 py-1.5 text-xs text-cyan disabled:opacity-40"
    >
      ต่ออายุ 30 วัน
    </button>
  );

  const tabBtn = (id: "acts" | "coms" | "members" | "settings", label: string) => (
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
        {expiring.length > 0 && (
          <div className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-5">
            <p className="text-sm font-medium text-amber-300">
              ⚠ สมาชิกใกล้หมดอายุรายเดือน / หมดอายุแล้ว ({expiring.length} บัญชี)
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {expiring.map((a) => (
                <li key={a.activationId} className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-paper">
                    {a.member.name} <span className="text-dim">· {a.member.email} · {a.broker} {a.accountNumber}</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className={daysLeft(a.expiresAt!) < 0 ? "text-rose" : "text-amber-300"}>
                      {expiryText(a.expiresAt!)} ({thaiDate(a.expiresAt!)})
                    </span>
                    {renewBtn(a.activationId, a.member.name)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {tabBtn("settings", "ตั้งค่าการชำระเงิน")}
          {tabBtn("members", `สมาชิกทั้งหมด (${data.members.length})`)}
          {tabBtn("acts", `คำขอเปิดใช้งาน EA (รอ ${pending.length})`)}
          {tabBtn("coms", `ค่าแนะนำ (ค้างจ่าย ${baht(unpaidSum)})`)}
        </div>

        {tab === "settings" && (
          <SettingsForm key={JSON.stringify(data.settings)} initial={data.settings} onSaved={load} />
        )}

        {tab === "members" && (
          <div className="mt-6 rounded-xl border border-line bg-panel p-5">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ค้นหาชื่อ / อีเมล / รหัสแนะนำ / เลขบัญชีเทรด"
              className="mb-4 w-full rounded-md border border-line bg-panel2 px-3.5 py-2.5 text-sm text-paper outline-none focus:border-cyan/50"
            />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left text-sm">
                <thead className="text-xs text-dim">
                  <tr>
                    <th className={th}>สมาชิก</th>
                    <th className={th}>สมัครเมื่อ</th>
                    <th className={th}>รหัสแนะนำ / ผู้แนะนำ / บัญชีรับเงิน</th>
                    <th className={th}>บัญชีเทรด / สถานะรายเดือน</th>
                    <th className={th}>สายล่าง / ค่าแนะนำ</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => {
                    const total = m.downline.reduce((x, d) => x + d.members.length, 0);
                    const isOpen = open.has(m.id);
                    const mine = data.commissions.filter((c) => c.beneficiaryId === m.id);
                    return (
                    <Fragment key={m.id}>
                    <tr className="border-t border-line align-top">
                      <td className="py-3 text-paper">
                        {m.name} {m.isAdmin && <span className="text-xs text-cyan">(แอดมิน)</span>}
                        <br /><span className="text-xs text-dim">{m.email}</span>
                      </td>
                      <td className="py-3 text-dim">{thaiDate(m.createdAt)}</td>
                      <td className="py-3 text-dim">
                        <span className="font-mono text-paper">{m.refCode}</span>
                        <br /><span className="text-xs">แนะนำโดย: {m.referrerName}</span>
                        <br />
                        <span className="text-xs">
                          {m.bank ? `${m.bank.bankName} ${m.bank.accountNumber} (${m.bank.accountName})` : "ยังไม่ระบุบัญชีรับเงิน"}
                        </span>
                      </td>
                      <td className="py-3">
                        {m.accounts.length === 0 && <span className="text-xs text-dim">ยังไม่แจ้งบัญชีเทรด</span>}
                        <ul className="space-y-2">
                          {m.accounts.map((a) => {
                            const d = a.expiresAt ? daysLeft(a.expiresAt) : null;
                            return (
                              <li key={a.activationId} className="flex flex-wrap items-center gap-3">
                                <span className="text-dim">{a.broker} · <span className="font-mono text-paper">{a.accountNumber}</span></span>
                                {a.status === "pending" && <span className="text-xs text-amber-300">รออนุมัติ</span>}
                                {a.status === "approved" && a.expiresAt && (
                                  <>
                                    <span className={`text-xs ${d! < 0 ? "text-rose" : d! <= 2 ? "text-amber-300" : "text-mint"}`}>
                                      {expiryText(a.expiresAt)} · หมด {thaiDate(a.expiresAt)}
                                    </span>
                                    {renewBtn(a.activationId, m.name)}
                                  </>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                      <td className="py-3">
                        <p className="text-paper">สายล่าง {total} คน</p>
                        <p className="text-xs text-dim">
                          {m.downline.map((d) => `ชั้น ${d.level}: ${d.members.length}`).join(" · ")}
                        </p>
                        <p className="mt-1 text-xs text-dim">
                          ได้รวม <span className="font-mono text-paper">{baht(m.commission.earnedSatang)}</span>
                          {" · "}รอจ่าย <span className="font-mono text-amber-300">{baht(m.commission.pendingSatang)}</span>
                          {" · "}จ่ายแล้ว <span className="font-mono text-mint">{baht(m.commission.paidSatang)}</span>
                        </p>
                        <button onClick={() => toggle(m.id)} className="mt-2 rounded-md border border-line px-3 py-1 text-xs text-cyan hover:border-cyan/40">
                          {isOpen ? "ซ่อนรายละเอียด ▴" : "ขยายดูรายละเอียด ▾"}
                        </button>
                      </td>
                    </tr>
                  
                    {isOpen && (
                      <tr className="bg-panel2/50">
                        <td colSpan={5} className="px-4 py-4">
                          <div className="grid gap-4 md:grid-cols-3">
                            {m.downline.map((d) => (
                              <div key={d.level} className="rounded-lg border border-line bg-panel p-4">
                                <p className="text-xs text-cyan">
                                  ชั้น {d.level} · {d.members.length} คน · ได้ {baht(m.commission.byLevel.find((b) => b.level === d.level)?.amountSatang ?? 0)}
                                </p>
                                {d.members.length === 0 ? (
                                  <p className="mt-2 text-xs text-dim">ไม่มีสมาชิก</p>
                                ) : (
                                  <ul className="mt-2 space-y-1 text-sm">
                                    {d.members.map((x) => (
                                      <li key={x.id} className="text-paper">{x.name} <span className="text-xs text-dim">· {x.email}</span></li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                          <p className="mt-4 text-xs text-dim">รายการค่าแนะนำของ {m.name}</p>
                          {mine.length === 0 ? (
                            <p className="mt-1 text-sm text-dim">ยังไม่มีรายการ</p>
                          ) : (
                            <table className="mt-2 w-full text-left text-sm">
                              <tbody>
                                {mine.map((c) => (
                                  <tr key={c.id} className="border-t border-line">
                                    <td className="py-2 text-dim">{thaiDate(c.createdAt)}</td>
                                    <td className="py-2 text-paper">จาก {c.sourceName}</td>
                                    <td className="py-2 text-dim">ชั้น {c.level} ({c.percent}%)</td>
                                    <td className="py-2 text-right font-mono text-paper">{baht(c.amountSatang)}</td>
                                    <td className="py-2 pl-4">
                                      {c.status === "paid" ? (
                                        <span className="text-xs text-mint">จ่ายแล้ว</span>
                                      ) : (
                                        <button
                                          disabled={!!busy}
                                          onClick={() => act("/api/admin/commissions", { id: c.id }, `ทำเครื่องหมายว่าโอน ${baht(c.amountSatang)} ให้ ${m.name} แล้ว?`)}
                                          className="rounded-md border border-cyan/40 px-3 py-1 text-xs text-cyan disabled:opacity-40"
                                        >
                                          ทำเครื่องหมายจ่ายแล้ว
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        </td>
                      </tr>
                    )}
                    </Fragment>
                    );
                  })}
                </tbody>
              </table>
              {members.length === 0 && <p className="py-4 text-sm text-dim">ไม่พบสมาชิก</p>}
            </div>
          </div>
        )}

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
                    <td className="py-3 text-paper">{c.beneficiaryName}<br /><span className="text-xs text-dim">{c.beneficiaryEmail}</span>
                      <br /><span className="text-xs text-cyan">{c.beneficiaryBank ? `${c.beneficiaryBank.bankName} ${c.beneficiaryBank.accountNumber} (${c.beneficiaryBank.accountName})` : "ยังไม่ระบุบัญชีรับเงิน"}</span></td>
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

function SettingsForm({ initial, onSaved }: { initial: PaymentSettings; onSaved: () => void }) {
  const [f, setF] = useState({
    firstPriceBaht: String(initial.firstPriceSatang / 100),
    priceBaht: String(initial.priceSatang / 100),
    bankName: initial.bankName,
    accountNumber: initial.accountNumber,
    accountName: initial.accountName,
    note: initial.note,
  });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const inputCls =
    "w-full rounded-md border border-line bg-panel2 px-3.5 py-2.5 text-sm text-paper outline-none focus:border-cyan/50";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const json = await res.json();
      if (!json.ok) setMsg({ ok: false, text: json.error || "บันทึกไม่สำเร็จ" });
      else {
        setMsg({ ok: true, text: "บันทึกแล้ว" });
        onSaved();
      }
    } catch {
      setMsg({ ok: false, text: "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้" });
    }
    setBusy(false);
  };

  return (
    <form onSubmit={submit} className="mt-6 grid max-w-2xl gap-5 rounded-xl border border-line bg-panel p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs text-dim">ค่าสมาชิกครั้งแรก (บาท)</label>
          <input required type="number" min="1" step="0.01" className={`${inputCls} font-mono`} value={f.firstPriceBaht}
            onChange={(e) => setF({ ...f, firstPriceBaht: e.target.value })} />
          <p className="mt-1.5 text-xs text-dim">จ่ายครั้งเดียวตอนเปิดใช้งานครั้งแรก — ค่าแนะนำ 3 ชั้นคิดจากยอดนี้ (มีผลกับการอนุมัติครั้งถัดไป)</p>
        </div>
        <div>
          <label className="mb-2 block text-xs text-dim">ค่าสมาชิกรายเดือน (บาท)</label>
          <input required type="number" min="1" step="0.01" className={`${inputCls} font-mono`} value={f.priceBaht}
            onChange={(e) => setF({ ...f, priceBaht: e.target.value })} />
          <p className="mt-1.5 text-xs text-dim">ใช้ตอนต่ออายุทุก 30 วัน (ไม่มีค่าแนะนำ)</p>
        </div>
      </div>
      <p className="-mt-2 text-xs text-dim">ทั้งสองยอดแสดงให้สมาชิกเห็นในแดชบอร์ดและหน้าแพ็กเกจทันทีที่บันทึก</p>
      <p className="text-sm font-medium text-paper">บัญชีกลางสำหรับให้สมาชิกโอนเงิน</p>
      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-xs text-dim">ธนาคาร</label>
          <input className={inputCls} value={f.bankName} onChange={(e) => setF({ ...f, bankName: e.target.value })} />
        </div>
        <div>
          <label className="mb-2 block text-xs text-dim">เลขบัญชี</label>
          <input inputMode="numeric" className={`${inputCls} font-mono`} value={f.accountNumber}
            onChange={(e) => setF({ ...f, accountNumber: e.target.value })} />
        </div>
        <div>
          <label className="mb-2 block text-xs text-dim">ชื่อบัญชี</label>
          <input className={inputCls} value={f.accountName} onChange={(e) => setF({ ...f, accountName: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-xs text-dim">ข้อความเพิ่มเติมถึงสมาชิก (ไม่บังคับ)</label>
        <input className={inputCls} value={f.note} placeholder="เช่น โอนแล้วแจ้งสลิปที่ LINE ..." onChange={(e) => setF({ ...f, note: e.target.value })} />
      </div>
      <div className="flex items-center gap-4">
        <button disabled={busy} className="rounded-md bg-cyan px-5 py-2.5 text-sm font-medium text-ink disabled:opacity-40">
          {busy ? "กำลังบันทึก..." : "บันทึกการตั้งค่า"}
        </button>
        {msg && <span className={`text-sm ${msg.ok ? "text-mint" : "text-red-400"}`}>{msg.text}</span>}
      </div>
    </form>
  );
}
