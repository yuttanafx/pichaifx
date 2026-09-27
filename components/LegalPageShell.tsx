"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/language-context";

export default function LegalPageShell({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}) {
  const { t } = useLanguage();
  return (
    <main className="relative min-h-screen">
      <Navbar />

      <section className="border-b border-line py-16">
        <div className="mx-auto max-w-3xl px-6">
          <a href="/" className="text-sm text-cyan">
            {t.legalShell.backHome}
          </a>
          <h1 className="mt-4 font-display text-3xl font-semibold text-paper sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-dim">
            {t.legalShell.updatedLabel}: {updatedAt}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex flex-col gap-10 text-[15px] leading-relaxed text-dim [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-paper [&_h3]:font-display [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-paper [&_strong]:text-paper [&_a]:text-cyan [&_a]:underline [&_a]:underline-offset-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2">
            {children}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
