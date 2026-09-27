"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { LOCALES } from "@/lib/translations";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <div ref={ref} className={`relative flex-shrink-0 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Change language"
        className="flex h-9 items-center gap-1.5 rounded-md border border-line px-3 text-xs font-medium text-dim transition-colors hover:border-cyan/40 hover:text-paper"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" d="M3 12h18M12 3c2.4 2.6 3.6 5.7 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.7-3.6-9S9.6 5.6 12 3Z" />
        </svg>
        {current.label}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-32 overflow-hidden rounded-md border border-line bg-panel shadow-glow">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setLocale(l.code);
                setOpen(false);
              }}
              className={`block w-full px-3.5 py-2.5 text-left text-xs transition-colors hover:bg-panel2 ${
                l.code === locale ? "text-cyan" : "text-dim hover:text-paper"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
