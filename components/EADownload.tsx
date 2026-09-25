const steps = [
  { n: "01", label: "ดาวน์โหลดไฟล์ EA จากลิงก์ด้านล่าง" },
  { n: "02", label: "ติดตั้งไฟล์ EA เข้ากับ MT4 / MT5 ของคุณ" },
  { n: "03", label: "แจ้งบัญชีเทรดผ่านฟอร์มด้านล่างเพื่อให้แอดมินเปิดใช้งานให้" },
];

export default function EADownload() {
  return (
    <section id="ea-download" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-2xl border border-line bg-panel">
          <div className="grid gap-10 p-10 sm:p-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-block rounded border border-cyan/30 bg-cyan/10 px-2.5 py-1 font-mono text-[11px] text-cyan">
                EA เทรด
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-paper sm:text-4xl">
                ดาวน์โหลดระบบเทรดอัตโนมัติ
                <br />
                PichaiFX EA
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-dim">
                ไฟล์ EA พร้อมใช้งานสำหรับ MT4 / MT5 ดาวน์โหลดแล้วติดตั้งเข้ากับ
                แพลตฟอร์มเทรดของคุณ จากนั้นแจ้งบัญชีเทรดให้แอดมินผ่านฟอร์มด้านล่าง
                เพื่อเปิดใช้งานระบบให้กับบัญชีของคุณ
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://drive.google.com/uc?export=download&id=1KbMHn0kGIkKilKQ3RdNxotH3NfDWsWZp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-cyan px-6 py-3.5 text-sm font-medium text-ink transition-transform hover:scale-[1.02]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  ดาวน์โหลด EA
                </a>
                <a
                  href="#connect-account"
                  className="inline-flex items-center rounded-md border border-line px-6 py-3.5 text-sm font-medium text-paper hover:border-cyan/40 hover:bg-panel2"
                >
                  แจ้งบัญชีเทรด
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-line bg-panel2 p-6 sm:p-8">
              <p className="mb-5 text-xs text-dim">ขั้นตอนการใช้งาน</p>
              <ol className="space-y-5">
                {steps.map((s) => (
                  <li key={s.n} className="flex gap-3.5">
                    <span className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full border border-cyan/40 font-mono text-[11px] text-cyan">
                      {s.n}
                    </span>
                    <p className="text-sm leading-relaxed text-dim">{s.label}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
