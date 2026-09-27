"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";

const STORAGE_KEY = "pichaifx-cookie-consent";
const CONSENT_VERSION = 1;

type Consent = {
  version: number;
  essential: true;
  analytics: boolean;
  updatedAt: string;
};

function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(analytics: boolean) {
  const consent: Consent = {
    version: CONSENT_VERSION,
    essential: true,
    analytics,
    updatedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // ignore storage errors (private mode, etc.)
  }
  return consent;
}

export default function CookieConsent() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsChoice, setAnalyticsChoice] = useState(true);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setVisible(true);
    } else {
      setAnalyticsChoice(existing.analytics);
    }

    // Footer's cookie-settings link dispatches this to reopen the banner.
    const openSettings = () => {
      const current = readConsent();
      if (current) setAnalyticsChoice(current.analytics);
      setShowDetails(true);
      setVisible(true);
    };
    window.addEventListener("open-cookie-settings", openSettings);
    return () => window.removeEventListener("open-cookie-settings", openSettings);
  }, []);

  if (!visible) return null;

  const acceptAll = () => {
    writeConsent(true);
    setVisible(false);
  };

  const rejectNonEssential = () => {
    writeConsent(false);
    setVisible(false);
  };

  const savePreferences = () => {
    writeConsent(analyticsChoice);
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-auto sm:left-4 sm:right-auto sm:max-w-md">
      <div className="rounded-xl border border-line bg-panel/95 p-5 shadow-glow backdrop-blur">
        <p className="text-sm font-medium text-paper">{t.cookieConsent.title}</p>
        <p className="mt-2 text-xs leading-relaxed text-dim">{t.cookieConsent.body}</p>

        {showDetails && (
          <div className="mt-4 space-y-3 border-t border-line pt-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-paper">{t.cookieConsent.essentialTitle}</p>
                <p className="mt-0.5 text-[11px] text-dim">{t.cookieConsent.essentialDesc}</p>
              </div>
              <span className="mt-0.5 flex-shrink-0 rounded-full border border-line px-2 py-0.5 text-[11px] text-dim">
                {t.cookieConsent.essentialAlwaysOn}
              </span>
            </div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-paper">{t.cookieConsent.analyticsTitle}</p>
                <p className="mt-0.5 text-[11px] text-dim">{t.cookieConsent.analyticsDesc}</p>
              </div>
              <label className="mt-0.5 inline-flex flex-shrink-0 cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={analyticsChoice}
                  onChange={(e) => setAnalyticsChoice(e.target.checked)}
                  className="h-4 w-4 rounded border-line bg-panel2 accent-cyan"
                />
              </label>
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={acceptAll}
            className="rounded-md bg-cyan px-4 py-2 text-xs font-medium text-ink transition-transform hover:scale-[1.02]"
          >
            {t.cookieConsent.acceptAll}
          </button>
          {showDetails ? (
            <button
              type="button"
              onClick={savePreferences}
              className="rounded-md border border-line px-4 py-2 text-xs font-medium text-paper hover:border-cyan/40 hover:bg-panel2"
            >
              {t.cookieConsent.savePreferences}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="rounded-md border border-line px-4 py-2 text-xs font-medium text-paper hover:border-cyan/40 hover:bg-panel2"
            >
              {t.cookieConsent.settings}
            </button>
          )}
          <button
            type="button"
            onClick={rejectNonEssential}
            className="rounded-md px-4 py-2 text-xs font-medium text-dim hover:text-paper"
          >
            {t.cookieConsent.rejectNonEssential}
          </button>
        </div>

        <a
          href="/privacy-policy"
          className="mt-3 inline-block text-[11px] text-cyan underline underline-offset-2"
        >
          {t.cookieConsent.privacyLink}
        </a>
      </div>
    </div>
  );
}
