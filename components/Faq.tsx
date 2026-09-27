"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { LINE_OA_URL } from "@/lib/translations";

export default function Faq() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-line py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12">
          <p className="text-sm text-cyan">{t.faq.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-paper sm:text-4xl">
            {t.faq.title}
          </h2>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {t.faq.items.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-[15px] font-medium text-paper">
                    {f.q}
                  </span>
                  <span
                    className={`flex-shrink-0 font-mono text-lg text-cyan transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-5 pr-8 text-sm leading-relaxed text-dim">
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-xl border border-line bg-panel p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-base font-semibold text-paper">
              {t.faq.ctaTitle}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-dim">{t.faq.ctaBody}</p>
          </div>
          <a
            href={LINE_OA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-shrink-0 items-center gap-2 rounded-md bg-[#06C755] px-5 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M12 2C6.48 2 2 5.94 2 10.78c0 4.32 3.55 7.94 8.35 8.63.32.07.77.22.88.5.1.26.07.66.03.92l-.14.85c-.04.26-.2 1 .87.55 1.07-.46 5.78-3.4 7.89-5.83C21.35 14.32 22 12.63 22 10.78 22 5.94 17.52 2 12 2Z" />
            </svg>
            {t.faq.ctaButton}
          </a>
        </div>
      </div>
    </section>
  );
}
