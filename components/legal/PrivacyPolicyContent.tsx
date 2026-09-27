"use client";

import LegalPageShell from "@/components/LegalPageShell";
import { useLanguage } from "@/lib/language-context";

export default function PrivacyPolicyContent() {
  const { t } = useLanguage();
  const d = t.privacyPolicy;

  return (
    <LegalPageShell title={d.pageTitle} updatedAt={d.updatedAt}>
      <div
        className="rounded-xl border border-cyan/30 bg-cyan/10 p-5 text-sm leading-relaxed text-paper"
        dangerouslySetInnerHTML={{ __html: d.noticeHtml }}
      />
      {d.sections.map((s) => (
        <div key={s.heading}>
          <h2>{s.heading}</h2>
          <div dangerouslySetInnerHTML={{ __html: s.bodyHtml }} />
        </div>
      ))}
    </LegalPageShell>
  );
}
