"use client";

import { useLanguage } from "@/lib/language-context";
import { useState } from "react";
import { MYFXBOOK_ACCOUNTS, PERFORMANCE, metricValues, widgetUrl } from "@/lib/performance-data";

export default function Performance() {
  const { t } = useLanguage();
  const values = metricValues();
  const [idx, setIdx] = useState(0);
  const acc = MYFXBOOK_ACCOUNTS[idx];
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
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-dim">{t.performance.equityChartLabel} · Myfxbook</p>
                <div className="flex gap-2">
                  {MYFXBOOK_ACCOUNTS.map((a, i) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setIdx(i)}
                      className={`rounded-md px-3 py-1.5 text-xs ${
                        i === idx ? "bg-cyan text-ink" : "border border-line text-dim hover:text-paper"
                      }`}
                    >
                      {a.title}
                    </button>
                  ))}
                </div>
              </div>
              <a href={acc.url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img key={`d-${acc.id}`} src={widgetUrl("dark", acc)} alt={`Myfxbook ${acc.title} live results`}
                  className="mfb-dark h-auto w-full" width={600} height={300} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img key={`l-${acc.id}`} src={widgetUrl("light", acc)} alt={`Myfxbook ${acc.title} live results`}
                  className="mfb-light h-auto w-full" width={600} height={300} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
