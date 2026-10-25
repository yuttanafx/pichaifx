"use client";

import { useState } from "react";
import type { BankAccount } from "@/lib/types";

const inputCls =
  "w-full rounded-md border border-line bg-panel2 px-3.5 py-2.5 text-sm text-paper outline-none transition-colors placeholder:text-dim/70 focus:border-cyan/50";

const BANKS = ["กสิกรไทย", "กรุงเทพ", "ไทยพาณิชย์", "กรุงไทย", "กรุงศรีอยุธยา", "ทหารไทยธนชาต (ttb)", "ออมสิน", "ธ.ก.ส.", "ซีไอเอ็มบี ไทย", "ยูโอบี", "แลนด์ แอนด์ เฮ้าส์", "เกียรตินาคินภัทร", "อื่น ๆ"];

export default function BankForm({ initial, onSaved }: { initial: BankAccount | null; onSaved: () => void }) {
  const [f, setF] = useState<BankAccount>(initial ?? { bankName: "", accountNumber: "", accountName: "" });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/account/bank", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) setMsg({ ok: false, text: json.error || "บันทึกไม่สำเร็จ" });
      else {
        setMsg({ ok: true, text: "บันทึกบัญชีเรียบร้อยแล้ว" });
        onSaved();
      }
    } catch {
      setMsg({ ok: false, text: "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้" });
    }
    setBusy(false);
  };

  return (
    <form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-3">
      <div>
        <label htmlFor="bankName" className="mb-2 block text-xs text-dim">ธนาคาร</label>
        <select id="bankName" required className={inputCls} value={f.bankName} onChange={(e) => setF({ ...f, bankName: e.target.value })}>
          <option value="">เลือกธนาคาร</option>
          {BANKS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="accNo" className="mb-2 block text-xs text-dim">เลขบัญชี</label>
        <input id="accNo" required inputMode="numeric" className={`${inputCls} font-mono`} value={f.accountNumber}
          onChange={(e) => setF({ ...f, accountNumber: e.target.value })} />
      </div>
      <div>
        <label htmlFor="accName" className="mb-2 block text-xs text-dim">ชื่อบัญชี</label>
        <input id="accName" required className={inputCls} value={f.accountName}
          onChange={(e) => setF({ ...f, accountName: e.target.value })} />
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-3">
        <button disabled={busy} className="rounded-md bg-cyan px-5 py-2.5 text-sm font-medium text-ink disabled:opacity-40">
          {busy ? "กำลังบันทึก..." : initial ? "อัปเดตบัญชี" : "บันทึกบัญชี"}
        </button>
        {msg && <span className={`text-sm ${msg.ok ? "text-mint" : "text-red-400"}`}>{msg.text}</span>}
      </div>
    </form>
  );
}
