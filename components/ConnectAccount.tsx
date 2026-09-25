"use client";

import { useState } from "react";

const brokers = ["Exness", "XM", "IC Markets", "FBS", "Pepperstone", "อื่น ๆ"];

export default function ConnectAccount() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const [form, setForm] = useState({
    name: "",
    contact: "",
    broker: "",
    accountNumber: "",
    server: "",
    note: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const canSubmit =
    form.name.trim() &&
    form.contact.trim() &&
    form.broker.trim() &&
    form.accountNumber.trim() &&
    form.server.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("submitted");
  };

  return (
    <section id="connect-account" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm text-cyan">สำหรับสมาชิก</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-paper sm:text-4xl">
              แจ้งบัญชีเทรดให้แอดมิน
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-dim">
              กรอกข้อมูลบัญชีเทรด MT4 / MT5 ที่คุณต้องการใช้งาน แอดมินจะติดต่อกลับ
              เพื่อยืนยันตัวตนและเปิดใช้งานระบบเทรดอัตโนมัติให้กับบัญชีของคุณ
            </p>

            <div className="mt-8 space-y-4 rounded-xl border border-line bg-panel p-6">
              <p className="text-sm font-medium text-paper">ขั้นตอนหลังจากส่งข้อมูล</p>
              <ul className="space-y-3 text-sm leading-relaxed text-dim">
                <li className="flex gap-2.5">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-cyan" />
                  แอดมินตรวจสอบข้อมูลบัญชีและติดต่อกลับผ่านช่องทางที่คุณให้ไว้
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-cyan" />
                  แอดมินจะแจ้งขั้นตอนการเปิดใช้งาน EA หรือ Copy Trading ให้ตรงกับบัญชีของคุณ
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-cyan" />
                  ไม่ต้องส่งรหัสผ่านใด ๆ ในขั้นตอนนี้ แอดมินจะแจ้งวิธีเชื่อมต่อที่ปลอดภัยอีกครั้ง
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-panel p-6 sm:p-8">
            {status === "submitted" ? (
              <div className="flex flex-col items-start gap-4 py-6">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-mint/40 text-mint">
                  ✓
                </span>
                <h3 className="font-display text-lg font-semibold text-paper">
                  ส่งข้อมูลเรียบร้อยแล้ว
                </h3>
                <p className="text-sm leading-relaxed text-dim">
                  ทีมงาน PichaiFX Autotrad ได้รับข้อมูลบัญชีของคุณแล้ว
                  แอดมินจะติดต่อกลับผ่านช่องทางที่ให้ไว้ภายใน 24 ชั่วโมง
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setForm({ name: "", contact: "", broker: "", accountNumber: "", server: "", note: "" });
                  }}
                  className="mt-2 rounded-md border border-line px-4 py-2.5 text-sm font-medium text-paper hover:border-cyan/40 hover:bg-panel2"
                >
                  แจ้งอีกบัญชี
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs text-dim">
                      ชื่อ-นามสกุล
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="ชื่อของคุณ"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      required
                      className="w-full rounded-md border border-line bg-panel2 px-3.5 py-2.5 text-sm text-paper outline-none transition-colors placeholder:text-dim/70 focus:border-cyan/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact" className="mb-2 block text-xs text-dim">
                      ช่องทางติดต่อกลับ
                    </label>
                    <input
                      id="contact"
                      type="text"
                      placeholder="LINE ID หรือเบอร์โทรศัพท์"
                      value={form.contact}
                      onChange={(e) => update("contact", e.target.value)}
                      required
                      className="w-full rounded-md border border-line bg-panel2 px-3.5 py-2.5 text-sm text-paper outline-none transition-colors placeholder:text-dim/70 focus:border-cyan/50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="broker" className="mb-2 block text-xs text-dim">
                    โบรกเกอร์
                  </label>
                  <select
                    id="broker"
                    value={form.broker}
                    onChange={(e) => update("broker", e.target.value)}
                    required
                    className="w-full rounded-md border border-line bg-panel2 px-3.5 py-2.5 text-sm text-paper outline-none transition-colors focus:border-cyan/50"
                  >
                    <option value="" disabled>
                      เลือกโบรกเกอร์ของคุณ
                    </option>
                    {brokers.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="accountNumber" className="mb-2 block text-xs text-dim">
                      เลขบัญชีเทรด
                    </label>
                    <input
                      id="accountNumber"
                      type="text"
                      inputMode="numeric"
                      placeholder="เช่น 88421093"
                      value={form.accountNumber}
                      onChange={(e) => update("accountNumber", e.target.value)}
                      required
                      className="w-full rounded-md border border-line bg-panel2 px-3.5 py-2.5 text-sm text-paper outline-none transition-colors placeholder:text-dim/70 focus:border-cyan/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="server" className="mb-2 block text-xs text-dim">
                      เซิร์ฟเวอร์ (Server)
                    </label>
                    <input
                      id="server"
                      type="text"
                      placeholder="เช่น Exness-Real8"
                      value={form.server}
                      onChange={(e) => update("server", e.target.value)}
                      required
                      className="w-full rounded-md border border-line bg-panel2 px-3.5 py-2.5 text-sm text-paper outline-none transition-colors placeholder:text-dim/70 focus:border-cyan/50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="note" className="mb-2 block text-xs text-dim">
                    ข้อความเพิ่มเติม (ถ้ามี)
                  </label>
                  <textarea
                    id="note"
                    rows={3}
                    placeholder="เช่น ต้องการใช้กลยุทธ์ PichaiFX Gold หรือสอบถามเพิ่มเติม"
                    value={form.note}
                    onChange={(e) => update("note", e.target.value)}
                    className="w-full resize-none rounded-md border border-line bg-panel2 px-3.5 py-2.5 text-sm text-paper outline-none transition-colors placeholder:text-dim/70 focus:border-cyan/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="mt-1 rounded-md bg-cyan py-3.5 text-sm font-medium text-ink transition-transform enabled:hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ส่งข้อมูลให้แอดมิน
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
