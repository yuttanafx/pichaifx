const steps = [
  { n: "01", title: "สร้างบัญชี", desc: "สมัครใช้งาน ASTO QUANT ใช้เวลาไม่ถึง 2 นาที" },
  { n: "02", title: "เชื่อมต่อ MT4 / MT5", desc: "กรอกเลขบัญชีเทรดของคุณเพื่อเชื่อมต่อระบบ" },
  { n: "03", title: "เลือกกลยุทธ์", desc: "เลือก EA หรือกลยุทธ์ Copy Trading ที่เหมาะกับคุณ" },
  { n: "04", title: "เริ่มระบบอัตโนมัติ", desc: "ระบบเริ่มทำงานทันที พร้อมติดตามผลได้ตลอดเวลา" },
];

export default function HowItWorks() {
  return (
    <section id="platform" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <p className="text-sm text-cyan">วิธีใช้งาน</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-paper sm:text-4xl">
            เริ่มต้นได้ใน 4 ขั้นตอน
          </h2>
        </div>

        <div className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-0 right-0 top-[13px] hidden h-px bg-line lg:block" />
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="relative z-10 mb-5 grid h-7 w-7 place-items-center rounded-full border border-cyan/40 bg-ink font-mono text-xs text-cyan">
                {s.n}
              </div>
              <h3 className="font-display text-base font-semibold text-paper">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-dim">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
