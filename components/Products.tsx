"use client";

import { useLanguage } from "@/lib/language-context";

export default function Products() {
  const { t } = useLanguage();
  return (
    <section id="products" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <p className="text-sm text-cyan">{t.products.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-paper sm:text-4xl">
            {t.products.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {t.products.items.map((p) => (
            <div
              key={p.name}
              className="group flex flex-col justify-between bg-panel p-6 transition-colors hover:bg-panel2"
            >
              <div>
                <span className="inline-block rounded border border-line px-2 py-0.5 font-mono text-[11px] text-dim">
                  {p.tag}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-paper">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-dim">{p.desc}</p>
              </div>
              <a
                href="#"
                className="mt-6 inline-flex items-center text-sm font-medium text-cyan"
              >
                {t.products.viewDetails}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
