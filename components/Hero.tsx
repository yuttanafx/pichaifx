const positions = [
  { symbol: "XAUUSD", side: "BUY", price: "2,638.42", change: "+1.28%", up: true },
  { symbol: "BTCUSD", side: "BUY", price: "108,420", change: "+2.14%", up: true },
  { symbol: "EURUSD", side: "SELL", price: "1.17482", change: "-0.42%", up: false },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid bg-[size:44px_44px] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-fade-cyan" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-32 lg:pt-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-3 py-1.5 text-xs text-dim">
            <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse-dot" />
            รองรับ MT4 และ MT5 · เชื่อมต่อได้ทันที
          </div>

          <h1 className="font-display text-[42px] font-semibold leading-[1.08] text-paper sm:text-[54px] lg:text-[58px]">
            เทรดของคุณ ทำงานเอง
            <br />
            ตลอด 24 ชั่วโมง
          </h1>

          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-dim">
            PichaiFX Autotrad เปลี่ยนกลยุทธ์การเทรดของคุณให้เป็นระบบอัตโนมัติที่ทำงานจริง
            พร้อมข้อมูลผลการเทรดที่ตรวจสอบได้ ไม่ใช่แค่คำโฆษณา
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#pricing"
              className="rounded-md bg-cyan px-6 py-3.5 text-center text-sm font-medium text-ink transition-transform hover:scale-[1.02]"
            >
              เริ่มใช้งานฟรี
            </a>
            <a
              href="#performance"
              className="rounded-md border border-line px-6 py-3.5 text-center text-sm font-medium text-paper transition-colors hover:border-cyan/40 hover:bg-panel"
            >
              ดูผลการเทรดจริง
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
            {[
              ["MT4 / MT5", "รองรับเต็มรูปแบบ"],
              ["อัตโนมัติ", "ส่งคำสั่งทันที"],
              ["24/5", "ตลอดเวลาตลาดเปิด"],
              ["Risk Engine", "ควบคุมความเสี่ยง"],
            ].map(([a, b]) => (
              <div key={a}>
                <p className="font-display text-lg font-semibold text-paper">{a}</p>
                <p className="mt-1 text-xs text-dim">{b}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-3xl bg-blue/10 blur-3xl" />
          <div className="rounded-xl border border-line bg-panel/90 shadow-glow backdrop-blur">
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
              <span className="font-mono text-xs tracking-wide text-dim">
                PICHAIFX ENGINE · LIVE
              </span>
              <span className="flex items-center gap-1.5 text-xs text-mint">
                <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse-dot" />
                ONLINE
              </span>
            </div>

            <div className="divide-y divide-line">
              {positions.map((p) => (
                <div
                  key={p.symbol}
                  className="flex items-center justify-between px-5 py-4"
                >
                  <div>
                    <p className="font-mono text-sm text-paper">{p.symbol}</p>
                    <p
                      className={`mt-0.5 text-xs ${
                        p.side === "BUY" ? "text-mint" : "text-rose"
                      }`}
                    >
                      {p.side}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="mono-tabular font-mono text-sm text-paper">
                      {p.price}
                    </p>
                    <p
                      className={`mono-tabular mt-0.5 text-xs ${
                        p.up ? "text-mint" : "text-rose"
                      }`}
                    >
                      {p.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-5 py-4">
              <svg viewBox="0 0 300 80" className="h-16 w-full">
                <polyline
                  points="0,55 30,50 60,58 90,40 120,44 150,25 180,32 210,18 240,22 270,10 300,14"
                  fill="none"
                  stroke="#00E5FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
