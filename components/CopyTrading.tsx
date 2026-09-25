const strategies = [
  {
    name: "PichaiFX Gold",
    focus: "XAUUSD Trend Following",
    ret: "+18.4%",
    dd: "6.2%",
    risk: "ปานกลาง",
    followers: "482",
  },
  {
    name: "PichaiFX Grid",
    focus: "Multi-pair Grid System",
    ret: "+11.9%",
    dd: "4.8%",
    risk: "ต่ำ",
    followers: "310",
  },
  {
    name: "PichaiFX Momentum",
    focus: "BTCUSD / ETHUSD",
    ret: "+27.1%",
    dd: "12.4%",
    risk: "สูง",
    followers: "196",
  },
];

export default function CopyTrading() {
  return (
    <section id="copy-trading" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <p className="text-sm text-cyan">Copy Trading</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-paper sm:text-4xl">
            เลือกกลยุทธ์ แล้วให้ระบบเทรดแทนคุณ
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-dim">
            ตัวเลขผลตอบแทนด้านล่างอ้างอิงจากบัญชีจริงย้อนหลัง 90 วัน
            ผลตอบแทนในอดีตไม่ได้เป็นการรับประกันผลตอบแทนในอนาคต
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {strategies.map((s) => (
            <div
              key={s.name}
              className="rounded-xl border border-line bg-panel p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-paper">
                    {s.name}
                  </h3>
                  <p className="mt-1 text-xs text-dim">{s.focus}</p>
                </div>
                <span className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-dim">
                  {s.risk}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-5">
                <div>
                  <p className="font-mono text-base text-mint">{s.ret}</p>
                  <p className="mt-1 text-[11px] text-dim">ผลตอบแทน</p>
                </div>
                <div>
                  <p className="font-mono text-base text-paper">{s.dd}</p>
                  <p className="mt-1 text-[11px] text-dim">Drawdown</p>
                </div>
                <div>
                  <p className="font-mono text-base text-paper">{s.followers}</p>
                  <p className="mt-1 text-[11px] text-dim">ผู้ติดตาม</p>
                </div>
              </div>

              <a
                href="#"
                className="mt-6 block rounded-md border border-line py-2.5 text-center text-sm font-medium text-paper transition-colors hover:border-cyan/40 hover:bg-panel2"
              >
                ดูรายละเอียดกลยุทธ์
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
