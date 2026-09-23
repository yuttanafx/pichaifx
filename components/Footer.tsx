const columns = [
  {
    title: "แพลตฟอร์ม",
    links: ["EA / Auto Trading", "MT4 / MT5", "Risk Engine", "Analytics"],
  },
  {
    title: "บริษัท",
    links: ["เกี่ยวกับเรา", "ผลการเทรด", "อคาเดมี", "ติดต่อเรา"],
  },
  {
    title: "กฎหมาย",
    links: ["ข้อตกลงการใช้งาน", "นโยบายความเป็นส่วนตัว", "คำเตือนความเสี่ยง"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-md border border-cyan/30 bg-panel">
                <span className="h-2.5 w-2.5 rounded-sm bg-cyan" />
              </span>
              <span className="font-display text-[15px] font-semibold text-paper">
                ASTO QUANT
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-dim">
              เทคโนโลยีสำหรับการเทรดอัตโนมัติ ออกแบบเพื่อความโปร่งใส
              ตรวจสอบได้ และควบคุมความเสี่ยงอย่างเป็นระบบ
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-medium text-paper">{col.title}</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-dim transition-colors hover:text-paper"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ASTO QUANT. สงวนลิขสิทธิ์ทุกประการ</p>
          <p className="max-w-xl leading-relaxed">
            การเทรดผลิตภัณฑ์ทางการเงินมีความเสี่ยง ผลตอบแทนในอดีตไม่ได้เป็น
            เครื่องยืนยันผลตอบแทนในอนาคต โปรดพิจารณาความเสี่ยงก่อนตัดสินใจลงทุน
          </p>
        </div>
      </div>
    </footer>
  );
}
