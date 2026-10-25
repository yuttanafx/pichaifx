"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { LINE_OA_URL } from "@/lib/translations";

const BROKER_SIGNUP_URL = "http://live.oexn.global/signup/xtAKY577";

const planMeta = [
  { href: BROKER_SIGNUP_URL, extraHref: LINE_OA_URL, external: true, sponsored: true, featured: false },
  { href: "#contact", extraHref: undefined, external: false, sponsored: false, featured: true },
  { href: "#contact", extraHref: undefined, external: false, sponsored: false, featured: false },
];

export default function Pricing() {
  const { t } = useLanguage();
  // ยอดรายเดือนที่แอดมินตั้งไว้ (แพ็กเกจ Professional) — ถ้าโหลดไม่ได้ใช้ค่าในไฟล์แปลภาษา
  const [livePrice, setLivePrice] = useState<string | null>(null);
  const [firstPrice, setFirstPrice] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/pricing")
      .then((r) => r.json())
      .then((j) => {
        if (j?.ok && typeof j.priceBaht === "number") {
          const f = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 2 });
          setLivePrice(f(j.priceBaht));
          if (typeof j.firstPriceBaht === "number") setFirstPrice(f(j.firstPriceBaht));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="pricing" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <p className="text-sm text-cyan">{t.pricing.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-paper sm:text-4xl">
            {t.pricing.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {t.pricing.plans.map((p, i) => {
            const meta = planMeta[i];
            return (
              <div
                key={p.name}
                className={`flex flex-col rounded-xl border p-7 ${
                  meta.featured
                    ? "border-cyan/40 bg-panel shadow-glow"
                    : "border-line bg-panel"
                }`}
              >
                {meta.featured && (
                  <span className="mb-4 inline-block w-max rounded-full bg-cyan/10 px-3 py-1 text-xs font-medium text-cyan">
                    {t.pricing.popular}
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold text-paper">
                  {p.name}
                </h3>
                <p className="mt-1.5 text-sm text-dim">{p.desc}</p>

                <div className="mt-6 flex items-end gap-1.5">
                  <span className="font-display text-3xl font-semibold text-paper">
                    {meta.featured && livePrice ? livePrice : p.price}
                  </span>
                  {p.period && (
                    <span className="pb-1 text-sm text-dim">{p.period}</span>
                  )}
                </div>
                {meta.featured && firstPrice && (
                  <p className="mt-2 text-xs text-dim">
                    ค่าสมาชิกครั้งแรก {firstPrice} บาท · First-time fee THB {firstPrice}
                  </p>
                )}

                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-dim">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-cyan" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={meta.href}
                  {...(meta.external ? { target: "_blank", rel: "noopener noreferrer sponsored" } : {})}
                  className={`mt-8 rounded-md py-3 text-center text-sm font-medium transition-transform hover:scale-[1.02] ${
                    meta.featured
                      ? "bg-cyan text-ink"
                      : "border border-line text-paper hover:border-cyan/40"
                  }`}
                >
                  {p.cta}
                </a>

                {meta.extraHref && (
                  <a
                    href={meta.extraHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 rounded-md border border-line py-3 text-center text-sm font-medium text-paper transition-transform hover:scale-[1.02] hover:border-cyan/40"
                  >
                    {p.cta}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
