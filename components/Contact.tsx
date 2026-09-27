"use client";

import { useLanguage } from "@/lib/language-context";
import { LINE_OA_URL } from "@/lib/translations";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-2xl border border-line bg-panel p-10 sm:p-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="font-display text-3xl font-semibold text-paper sm:text-4xl">
                {t.contact.title}
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-dim">
                {t.contact.body}
              </p>

              <a
                href={LINE_OA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#06C755] px-6 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M12 2C6.48 2 2 5.94 2 10.78c0 4.32 3.55 7.94 8.35 8.63.32.07.77.22.88.5.1.26.07.66.03.92l-.14.85c-.04.26-.2 1 .87.55 1.07-.46 5.78-3.4 7.89-5.83C21.35 14.32 22 12.63 22 10.78 22 5.94 17.52 2 12 2Z" />
                </svg>
                {t.contact.lineButton}
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:gap-3">
              {t.contact.channels.map((c) =>
                c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-line bg-panel2 px-5 py-4 transition-colors hover:border-cyan/40"
                  >
                    <p className="text-xs text-dim">{c.label}</p>
                    <p className="mt-1.5 font-mono text-sm text-paper">{c.value}</p>
                  </a>
                ) : (
                  <div
                    key={c.label}
                    className="rounded-lg border border-line bg-panel2 px-5 py-4"
                  >
                    <p className="text-xs text-dim">{c.label}</p>
                    <p className="mt-1.5 font-mono text-sm text-paper">{c.value}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
