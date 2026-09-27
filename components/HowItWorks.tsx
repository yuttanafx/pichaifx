"use client";

import { useLanguage } from "@/lib/language-context";

export default function HowItWorks() {
  const { t } = useLanguage();
  return (
    <section id="platform" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <p className="text-sm text-cyan">{t.howItWorks.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-paper sm:text-4xl">
            {t.howItWorks.title}
          </h2>
        </div>

        <div className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-0 right-0 top-[13px] hidden h-px bg-line lg:block" />
          {t.howItWorks.steps.map((s, i) => (
            <div key={s.title} className="relative">
              <div className="relative z-10 mb-5 grid h-7 w-7 place-items-center rounded-full border border-cyan/40 bg-ink font-mono text-xs text-cyan">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-base font-semibold text-paper">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-dim">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
