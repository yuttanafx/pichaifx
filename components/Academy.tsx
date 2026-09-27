"use client";

import { useLanguage } from "@/lib/language-context";

export default function Academy() {
  const { t } = useLanguage();
  return (
    <section id="academy" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-sm text-cyan">{t.academy.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-paper sm:text-4xl">
              {t.academy.title}
            </h2>
          </div>
          <a href="#" className="text-sm font-medium text-cyan">
            {t.academy.viewAll}
          </a>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.academy.articles.map((a) => (
            <a
              key={a.title}
              href="#"
              className="group flex flex-col justify-between rounded-xl border border-line bg-panel p-6 transition-colors hover:bg-panel2"
            >
              <div>
                <span className="text-xs text-dim">{a.tag}</span>
                <h3 className="mt-3 font-display text-base font-semibold leading-snug text-paper">
                  {a.title}
                </h3>
              </div>
              <span className="mt-6 text-sm font-medium text-cyan opacity-0 transition-opacity group-hover:opacity-100">
                {t.academy.readArticle}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
