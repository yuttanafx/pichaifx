"use client";

import { useLanguage } from "@/lib/language-context";
import { MYFXBOOK_URL, PERFORMANCE, metricValues, widgetUrl } from "@/lib/performance-data";

export default function Performance() {
  const { t } = useLanguage();
  const values = metricValues();
  return (
    <section id="performance" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm text-cyan">{t.performance.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-paper sm:text-4xl">
              {t.performance.titleLine1}
              <br />
              {t.performance.titleLine2}
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-dim">
              {t.performance.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://www.myfxbook.com/members/yuttanafx/gold-grid/12220131"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-line px-5 py-3 text-sm font-medium text-paper hover:border-cyan/40 hover:bg-panel"
              >
                {t.performance.ctaMyfxbook}
              </a>
              <a
                href="https://www.myfxbook.com/members/yuttanafx"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-line px-5 py-3 text-sm font-medium text-paper hover:border-cyan/40 hover:bg-panel"
              >
                {t.performance.ctaHistory}
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-panel p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {t.performance.metrics.map((m, i) => (
                <div key={m.label}>
                  <p
                    className={`font-display text-2xl font-semibold ${
                      i === 0 ? "text-mint" : "text-paper"
                    }`}
                  >
                    {values[i] ?? m.value}
                  </p>
                  <p className="mt-1 text-xs text-dim">{m.label}</p>
                </div>
              ))}
            </div>

            {PERFORMANCE.isSample && (
              <p className="mt-3 text-[11px] text-amber-400">ตัวเลขสถิติด้านบนเป็นข้อมูลตัวอย่าง — ดูตัวเลขจริงที่กราฟ/ลิงก์ Myfxbook</p>
            )}

            <div className="mt-8 border-t border-line pt-6">
              <p className="mb-3 text-xs text-dim">{t.performance.equityChartLabel} · Myfxbook</p>
              <a href={MYFXBOOK_URL} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={widgetUrl("dark")} alt="Myfxbook Gold-Grid live results" loading="lazy"
                  className="mfb-dark h-auto w-full" width={600} height={300} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={widgetUrl("light")} alt="Myfxbook Gold-Grid live results" loading="lazy"
                  className="mfb-light h-auto w-full" width={600} height={300} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
