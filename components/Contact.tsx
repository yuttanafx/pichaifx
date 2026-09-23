const channels = [
  { label: "LINE", value: "@astoquant" },
  { label: "Telegram", value: "t.me/astoquant" },
  { label: "อีเมล", value: "support@astoquant.com" },
];

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-2xl border border-line bg-panel p-10 sm:p-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="font-display text-3xl font-semibold text-paper sm:text-4xl">
                มีคำถามเกี่ยวกับระบบ?
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-dim">
                ทีมงาน ASTO QUANT พร้อมให้คำปรึกษาเรื่องการเชื่อมต่อบัญชี
                การเลือกกลยุทธ์ และการตั้งค่าระบบให้เหมาะกับคุณ
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:gap-3">
              {channels.map((c) => (
                <div
                  key={c.label}
                  className="rounded-lg border border-line bg-panel2 px-5 py-4"
                >
                  <p className="text-xs text-dim">{c.label}</p>
                  <p className="mt-1.5 font-mono text-sm text-paper">
                    {c.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
