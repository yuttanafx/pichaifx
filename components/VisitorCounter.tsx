"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";

const SESSION_FLAG = "pichaifx-visit-counted";

export default function VisitorCounter() {
  const { t, locale } = useLanguage();
  const [count, setCount] = useState<number | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const alreadyCounted =
        typeof window !== "undefined" &&
        sessionStorage.getItem(SESSION_FLAG) === "1";

      try {
        const res = await fetch("/api/visitors", {
          method: alreadyCounted ? "GET" : "POST",
        });
        const data = await res.json();

        if (cancelled) return;

        if (data.ok) {
          setCount(data.count);
          setStatus("ready");
          if (!alreadyCounted) sessionStorage.setItem(SESSION_FLAG, "1");
        } else {
          setStatus("error");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "error") return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-line bg-panel/90 px-4 py-2.5 text-xs text-dim shadow-lg backdrop-blur"
      aria-live="polite"
    >
      <span className="h-1.5 w-1.5 flex-shrink-0 animate-pulse rounded-full bg-mint" />
      <span>{t.visitorCounter.label}</span>
      <span className="font-display font-semibold text-paper">
        {status === "loading" || count === null
          ? "…"
          : count.toLocaleString(locale === "th" ? "th-TH" : locale === "zh" ? "zh-CN" : "en-US")}
      </span>
    </div>
  );
}
