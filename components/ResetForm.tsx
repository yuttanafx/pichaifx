"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputCls =
  "w-full rounded-md border border-line bg-panel2 px-3.5 py-2.5 text-sm text-paper outline-none transition-colors placeholder:text-dim/70 focus:border-cyan/50";

export default function ResetForm({ mode, token = "" }: { mode: "forgot" | "reset"; token?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const isForgot = mode === "forgot";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setError("");
    if (!isForgot && password !== confirm) return setError("รหัสผ่านทั้งสองช่องไม่ตรงกัน");
    setBusy(true);
    try {
      const res = await fetch(isForgot ? "/api/auth/forgot" : "/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isForgot ? { email } : { token, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
        setBusy(false);
        return;
      }
      if (isForgot) {
        setSent(true);
        setBusy(false);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาลองใหม่อีกครั้ง");
      setBusy(false);
    }
  };

  return (
    <section className="py-20">
      <div className="mx-auto max-w-md px-6">
        <p className="text-sm text-cyan">{isForgot ? "ลืมรหัสผ่าน" : "ตั้งรหัสผ่านใหม่"}</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-paper">
          {isForgot ? "รีเซตรหัสผ่าน" : "ตั้งรหัสผ่านใหม่"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-dim">
          {isForgot
            ? "กรอกอีเมลที่ใช้สมัคร เราจะส่งลิงก์สำหรับตั้งรหัสผ่านใหม่ไปให้"
            : "กำหนดรหัสผ่านใหม่อย่างน้อย 8 ตัวอักษร"}
        </p>

        {sent ? (
          <div className="mt-8 rounded-xl border border-line bg-panel p-6 text-sm leading-relaxed text-paper">
            หากอีเมลนี้มีในระบบ เราได้ส่งลิงก์รีเซตรหัสผ่านไปให้แล้ว (ลิงก์ใช้ได้ 60 นาที) กรุณาตรวจสอบกล่องจดหมายและโฟลเดอร์สแปม
            <p className="mt-4"><a href="/login" className="text-cyan">กลับไปหน้าเข้าสู่ระบบ</a></p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8 flex flex-col gap-5 rounded-xl border border-line bg-panel p-6 sm:p-8">
            {isForgot ? (
              <div>
                <label htmlFor="email" className="mb-2 block text-xs text-dim">อีเมล</label>
                <input id="email" type="email" className={inputCls} value={email} required autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor="password" className="mb-2 block text-xs text-dim">รหัสผ่านใหม่</label>
                  <input id="password" type="password" className={inputCls} value={password} required minLength={8}
                    autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="confirm" className="mb-2 block text-xs text-dim">ยืนยันรหัสผ่านใหม่</label>
                  <input id="confirm" type="password" className={inputCls} value={confirm} required minLength={8}
                    autoComplete="new-password" onChange={(e) => setConfirm(e.target.value)} />
                </div>
              </>
            )}
            {error && (
              <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-400">{error}</p>
            )}
            <button type="submit" disabled={busy}
              className="rounded-md bg-cyan py-3.5 text-sm font-medium text-ink transition-transform enabled:hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40">
              {busy ? "กำลังดำเนินการ..." : isForgot ? "ส่งลิงก์รีเซตรหัสผ่าน" : "บันทึกรหัสผ่านใหม่"}
            </button>
            <p className="text-center text-sm text-dim"><a href="/login" className="text-cyan">กลับไปหน้าเข้าสู่ระบบ</a></p>
          </form>
        )}
      </div>
    </section>
  );
}
