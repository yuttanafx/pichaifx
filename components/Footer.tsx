"use client";

import { useLanguage } from "@/lib/language-context";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-line py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-md border border-cyan/30 bg-panel">
                <span className="h-2.5 w-2.5 rounded-sm bg-cyan" />
              </span>
              <span className="font-display text-[15px] font-semibold text-paper">
                PichaiFX Autotrad
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-dim">
              {t.footer.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {t.footer.columns.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-medium text-paper">{col.title}</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-dim transition-colors hover:text-paper"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} PichaiFX Autotrad. {t.footer.rights}</p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
            className="text-left text-xs text-dim underline underline-offset-2 transition-colors hover:text-paper sm:text-right"
          >
            {t.footer.cookieSettings}
          </button>
        </div>

        <div className="mt-6 border-t border-line pt-6 text-xs leading-relaxed text-dim">
          {t.footer.disclaimer}{" "}
          <a href="/risk-warning" className="underline underline-offset-2 hover:text-paper">
            {t.footer.riskLinkText}
          </a>
        </div>
      </div>
    </footer>
  );
}
