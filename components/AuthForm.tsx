"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { REF_STORAGE_KEY } from "@/components/RefCapture";

const inputCls =
  "w-full rounded-md border border-line bg-panel2 px-3.5 py-2.5 text-sm text-paper outline-none transition-colors placeholder:text-dim/70 focus:border-cyan/50";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const isRegister = mode === "register";
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    refCode: "",
    pdpaConsent: false,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isRegister) return;
    try {
      const q = new URLSearchParams(window.location.search).get("ref");
      const saved = window.localStorage.getItem(REF_STORAGE_KEY);
      const code = (q || saved || "").toUpperCase();
      if (code) setForm((f) => ({ ...f, refCode: code }));
    } catch {
      // ignore
    }
  }, [isRegister]);

  const set = (k: keyof typeof form, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
        setBusy(false);
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาลองใหม่อีกครั้ง");
      setBusy(false);
    }
  };

  return (
    <section className="py-20">
      <div className="mx-auto max-w-md px-6">
        <p className="text-sm text-cyan">{isRegister ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-paper">
          {isRegister ? "สร้างบัญชีสมาชิก" : "ยินดีต้อนรับกลับมา"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-dim">
          {isRegister
            ? "สมัครเพื่อแจ้งเปิดใช้งาน EA และรับลิงก์แนะนำของคุณเอง ดูรายได้ค่าแนะนำได้ในแดชบอร์ด"
            : "เข้าสู่ระบบเพื่อดูสถานะการเปิดใช้งาน EA และรายได้ค่าแนะนำของคุณ"}
        </p>

        <form onSubmit={submit} className="mt-8 flex flex-col gap-5 rounded-xl border border-line bg-panel p-6 sm:p-8">
          {isRegister && (
            <div>
              <label htmlFor="name" className="mb-2 block text-xs text-dim">ชื่อ-นามสกุล</label>
              <input id="name" className={inputCls} value={form.name} required autoComplete="name"
                onChange={(e) => set("name", e.target.value)} />
            </div>
          )}
          <div>
            <label htmlFor="email" className="mb-2 block text-xs text-dim">อีเมล</label>
            <input id="email" type="email" className={inputCls} value={form.email} required autoComplete="email"
              onChange={(e) => set("email", e.target.value)} />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-xs text-dim">
              รหัสผ่าน{isRegister && " (อย่างน้อย 8 ตัวอักษร)"}
            </label>
            <input id="password" type="password" className={inputCls} value={form.password} required
              minLength={isRegister ? 8 : undefined}
              autoComplete={isRegister ? "new-password" : "current-password"}
              onChange={(e) => set("password", e.target.value)} />
          </div>

          {isRegister && (
            <>
              <div>
                <label htmlFor="refCode" className="mb-2 block text-xs text-dim">รหัสผู้แนะนำ (ถ้ามี)</label>
                <input id="refCode" className={`${inputCls} font-mono uppercase`} value={form.refCode}
                  placeholder="เช่น K7M2QXAB"
                  onChange={(e) => set("refCode", e.target.value.toUpperCase())} />
              </div>
              <label className="flex items-start gap-2.5 text-xs leading-relaxed text-dim">
                <input type="checkbox" checked={form.pdpaConsent} required
                  onChange={(e) => set("pdpaConsent", e.target.checked)}
                  className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-line bg-panel2 accent-cyan" />
                <span>
                  ข้าพเจ้าได้อ่านและยินยอมตาม{" "}
                  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer"
                    className="text-cyan underline underline-offset-2">นโยบายความเป็นส่วนตัว</a>
                </span>
              </label>
            </>
          )}

          {error && (
            <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-400">
              {error}
            </p>
          )}

          <button type="submit" disabled={busy}
            className="rounded-md bg-cyan py-3.5 text-sm font-medium text-ink transition-transform enabled:hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40">
            {busy ? "กำลังดำเนินการ..." : isRegister ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
          </button>

          <p className="text-center text-sm text-dim">
            {isRegister ? (
              <>มีบัญชีอยู่แล้ว? <a href="/login" className="text-cyan">เข้าสู่ระบบ</a></>
            ) : (
              <>ยังไม่มีบัญชี? <a href="/register" className="text-cyan">สมัครสมาชิก</a></>
            )}
          </p>
        </form>
      </div>
    </section>
  );
}
