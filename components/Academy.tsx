const articles = [
  {
    tag: "พื้นฐาน",
    title: "Forex คืออะไร เริ่มต้นอย่างไรให้ปลอดภัย",
  },
  {
    tag: "การวิเคราะห์",
    title: "หลักการทำงานของ Moving Average ในการหาแนวโน้ม",
  },
  {
    tag: "บริหารความเสี่ยง",
    title: "จัดการขนาดล็อตและ Stop Loss อย่างเป็นระบบ",
  },
  {
    tag: "EA",
    title: "ตั้งค่า EA บน MT4 / MT5 ให้ทำงานถูกต้องตั้งแต่ครั้งแรก",
  },
];

export default function Academy() {
  return (
    <section id="academy" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-sm text-cyan">อคาเดมี</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-paper sm:text-4xl">
              เรียนรู้ก่อนลงมือเทรดจริง
            </h2>
          </div>
          <a href="#" className="text-sm font-medium text-cyan">
            ดูบทความทั้งหมด
          </a>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((a) => (
            <a
              key={a.title}
              href="#"
              className="group flex flex-col justify-between rounded-xl border border-line bg-panel p-6 transition-colors hover:bg-panel2"
            >
              <div>
                <span className="text-xs text-dim">{a.tag}</span>
                <h3 className="mt-3 font-display text-base font-semibold leading-snug text-paper">
                  {a.title}
                </h3>
              </div>
              <span className="mt-6 text-sm font-medium text-cyan opacity-0 transition-opacity group-hover:opacity-100">
                อ่านบทความ
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
