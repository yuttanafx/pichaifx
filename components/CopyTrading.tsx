"use client";

import { useLanguage } from "@/lib/language-context";

export default function CopyTrading() {
  const { t } = useLanguage();
  return (
    <section id="copy-trading" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <p className="text-sm text-cyan">{t.copyTrading.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-paper sm:text-4xl">
            {t.copyTrading.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-dim">{t.copyTrading.body}</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {t.copyTrading.strategies.map((s) => (
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
                  {t.copyTrading.riskLabels[s.risk] ?? s.risk}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-5">
                <div>
                  <p className="font-mono text-base text-mint">{s.ret}</p>
                  <p className="mt-1 text-[11px] text-dim">{t.copyTrading.returnLabel}</p>
                </div>
                <div>
                  <p className="font-mono text-base text-paper">{s.dd}</p>
                  <p className="mt-1 text-[11px] text-dim">Drawdown</p>
                </div>
                <div>
                  <p className="font-mono text-base text-paper">{s.followers}</p>
                  <p className="mt-1 text-[11px] text-dim">{t.copyTrading.followersLabel}</p>
                </div>
              </div>

              <a
                href="#"
                className="mt-6 block rounded-md border border-line py-2.5 text-center text-sm font-medium text-paper transition-colors hover:border-cyan/40 hover:bg-panel2"
              >
                {t.copyTrading.detailsBtn}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
