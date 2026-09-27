"use client";

import { useLanguage } from "@/lib/language-context";

export default function Performance() {
  const { t } = useLanguage();
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
                    {m.value}
                  </p>
                  <p className="mt-1 text-xs text-dim">{m.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-line pt-6">
              <p className="mb-3 text-xs text-dim">{t.performance.equityChartLabel}</p>
              <svg viewBox="0 0 600 160" className="h-32 w-full sm:h-40">
                <defs>
                  <linearGradient id="equityFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,130 C40,128 60,140 90,120 C120,100 150,110 180,90 C210,70 230,95 260,80 C300,60 320,85 350,65 C390,42 410,70 440,50 C480,26 500,55 530,35 C555,18 570,40 600,20"
                  fill="none"
                  stroke="#00E5FF"
                  strokeWidth="2.5"
                />
                <path
                  d="M0,130 C40,128 60,140 90,120 C120,100 150,110 180,90 C210,70 230,95 260,80 C300,60 320,85 350,65 C390,42 410,70 440,50 C480,26 500,55 530,35 C555,18 570,40 600,20 L600,160 L0,160 Z"
                  fill="url(#equityFill)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
