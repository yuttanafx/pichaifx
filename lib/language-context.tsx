"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, Locale, Dictionary } from "./translations";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "pichaifx-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("th");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved === "th" || saved === "en" || saved === "zh") {
        setLocaleState(saved);
        return;
      }
      const nav = window.navigator.language?.toLowerCase() || "";
      if (nav.startsWith("zh")) setLocaleState("zh");
      else if (nav.startsWith("en")) setLocaleState("en");
    } catch {
      // ignore storage errors (private mode, etc.)
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore storage errors
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
