const BROKER_SIGNUP_URL = "http://live.oexn.global/signup/xtAKY577";

const plans = [
  {
    name: "Starter",
    desc: "สำหรับผู้เริ่มต้นใช้ระบบอัตโนมัติ",
    price: "ฟรี",
    period: "",
    features: ["EA License พื้นฐาน 1 บัญชี", "Support ผ่าน Community", "อัปเดตกลยุทธ์รายเดือน"],
    cta: "สมัครใช้ฟรี 1 บัญชี",
    href: BROKER_SIGNUP_URL,
    external: true,
    sponsored: true,
    featured: false,
  },
  {
    name: "Professional",
    desc: "สำหรับเทรดเดอร์ที่ต้องการผลลัพธ์เต็มรูปแบบ",
    price: "1,990",
    period: "บาท / เดือน",
    features: [
      "EA ทุกตัวไม่จำกัดบัญชี",
      "AI Analytics และสัญญาณเรียลไทม์",
      "รองรับ VPS ฟรี",
      "Support ผ่าน LINE ส่วนตัว",
    ],
    cta: "เลือกแพ็กเกจนี้",
    href: "#contact",
    external: false,
    sponsored: false,
    featured: true,
  },
  {
    name: "Managed",
    desc: "ให้ทีม PichaiFX Autotrad ดูแลระบบให้ทั้งหมด",
    price: "ติดต่อทีมงาน",
    period: "",
    features: ["บริหารพอร์ตโดยทีมงาน", "รายงานผลรายสัปดาห์", "ปรับกลยุทธ์ตามความเสี่ยงของคุณ"],
    cta: "ติดต่อเรา",
    href: "#contact",
    external: false,
    sponsored: false,
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <p className="text-sm text-cyan">แพ็กเกจ</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-paper sm:text-4xl">
            เลือกแพ็กเกจที่เหมาะกับสไตล์การเทรดของคุณ
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-xl border p-7 ${
                p.featured
                  ? "border-cyan/40 bg-panel shadow-glow"
                  : "border-line bg-panel"
              }`}
            >
              {p.featured && (
                <span className="mb-4 inline-block w-max rounded-full bg-cyan/10 px-3 py-1 text-xs font-medium text-cyan">
                  ยอดนิยม
                </span>
              )}
              <h3 className="font-display text-xl font-semibold text-paper">
                {p.name}
              </h3>
              <p className="mt-1.5 text-sm text-dim">{p.desc}</p>

              <div className="mt-6 flex items-end gap-1.5">
                <span className="font-display text-3xl font-semibold text-paper">
                  {p.price}
                </span>
                {p.period && (
                  <span className="pb-1 text-sm text-dim">{p.period}</span>
                )}
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-dim">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-cyan" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={p.href}
                {...(p.external ? { target: "_blank", rel: "noopener noreferrer sponsored" } : {})}
                className={`mt-8 rounded-md py-3 text-center text-sm font-medium transition-transform hover:scale-[1.02] ${
                  p.featured
                    ? "bg-cyan text-ink"
                    : "border border-line text-paper hover:border-cyan/40"
                }`}
              >
                {p.cta}
              </a>

              {p.sponsored && (
                <a
                  href={BROKER_SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mt-4 flex items-center justify-between gap-3 rounded-md border border-line bg-panel2 px-3.5 py-2.5 transition-colors hover:border-cyan/40"
                >
                  <span className="text-[11px] uppercase tracking-wide text-dim">
                    ผู้สนับสนุน
                  </span>
                  <span className="font-display text-sm font-semibold tracking-wide text-paper">
                    OEXN<span className="text-cyan">.</span>
                  </span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
