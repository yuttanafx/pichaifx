const products = [
  {
    name: "PichaiFX EA",
    desc: "หุ่นยนต์เทรดอัตโนมัติสำหรับ MT4 และ MT5 ทำงานตามกลยุทธ์ที่ตั้งไว้โดยไม่ต้องเฝ้าจอ",
    tag: "MT4 / MT5",
  },
  {
    name: "Copy Trading",
    desc: "เชื่อมบัญชีของคุณเข้ากับกลยุทธ์ที่เลือก แล้วให้คำสั่งซื้อขายทำงานตามแบบเรียลไทม์",
    tag: "อัตโนมัติ",
  },
  {
    name: "AI Analytics",
    desc: "วิเคราะห์แนวโน้มตลาดและความผันผวนจากข้อมูลราคาสด เพื่อประกอบการตัดสินใจ",
    tag: "เรียลไทม์",
  },
  {
    name: "Trading Tools",
    desc: "อินดิเคเตอร์และเครื่องมือเสริมสำหรับปรับแต่งระบบเทรดของคุณเอง",
    tag: "ยืดหยุ่น",
  },
];

export default function Products() {
  return (
    <section id="products" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <p className="text-sm text-cyan">โปรดักต์</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-paper sm:text-4xl">
            เครื่องมือทั้งหมดที่ระบบเทรดของคุณต้องการ
          </h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <div
              key={p.name}
              className="group flex flex-col justify-between bg-panel p-6 transition-colors hover:bg-panel2"
            >
              <div>
                <span className="inline-block rounded border border-line px-2 py-0.5 font-mono text-[11px] text-dim">
                  {p.tag}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-paper">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-dim">{p.desc}</p>
              </div>
              <a
                href="#"
                className="mt-6 inline-flex items-center text-sm font-medium text-cyan"
              >
                ดูรายละเอียด
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
