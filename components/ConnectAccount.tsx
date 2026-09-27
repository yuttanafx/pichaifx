"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

export default function ConnectAccount() {
  const { t } = useLanguage();
  const d = t.connectAccount;
  const [status, setStatus] = useState<"idle" | "loading" | "submitted" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    contact: "",
    broker: "",
    accountNumber: "",
    server: "",
    note: "",
    pdpaConsent: false,
  });

  const update = (key: keyof typeof form, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const canSubmit =
    form.name.trim() &&
    form.contact.trim() &&
    form.broker.trim() &&
    form.accountNumber.trim() &&
    form.server.trim() &&
    form.pdpaConsent;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error || d.labels.genericError);
        return;
      }

      setStatus("submitted");
    } catch {
      setStatus("error");
      setErrorMessage(d.labels.networkError);
    }
  };

  return (
    <section id="connect-account" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm text-cyan">{d.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-paper sm:text-4xl">
              {d.title}
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-dim">{d.body}</p>

            <div className="mt-8 space-y-4 rounded-xl border border-line bg-panel p-6">
              <p className="text-sm font-medium text-paper">{d.afterSubmitLabel}</p>
              <ul className="space-y-3 text-sm leading-relaxed text-dim">
                {d.afterSubmitItems.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-cyan" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-panel p-6 sm:p-8">
            {status === "submitted" ? (
              <div className="flex flex-col items-start gap-4 py-6">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-mint/40 text-mint">
                  ✓
                </span>
                <h3 className="font-display text-lg font-semibold text-paper">
                  {d.successTitle}
                </h3>
                <p className="text-sm leading-relaxed text-dim">{d.successBody}</p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setForm({
                      name: "",
                      contact: "",
                      broker: "",
                      accountNumber: "",
                      server: "",
                      note: "",
                      pdpaConsent: false,
                    });
                  }}
                  className="mt-2 rounded-md border border-line px-4 py-2.5 text-sm font-medium text-paper hover:border-cyan/40 hover:bg-panel2"
                >
                  {d.successAgain}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs text-dim">
                      {d.labels.name}
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder={d.labels.namePlaceholder}
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      required
                      className="w-full rounded-md border border-line bg-panel2 px-3.5 py-2.5 text-sm text-paper outline-none transition-colors placeholder:text-dim/70 focus:border-cyan/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact" className="mb-2 block text-xs text-dim">
                      {d.labels.contact}
                    </label>
                    <input
                      id="contact"
                      type="text"
                      placeholder={d.labels.contactPlaceholder}
                      value={form.contact}
                      onChange={(e) => update("contact", e.target.value)}
                      required
                      className="w-full rounded-md border border-line bg-panel2 px-3.5 py-2.5 text-sm text-paper outline-none transition-colors placeholder:text-dim/70 focus:border-cyan/50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="broker" className="mb-2 block text-xs text-dim">
                    {d.labels.broker}
                  </label>
                  <select
                    id="broker"
                    value={form.broker}
                    onChange={(e) => update("broker", e.target.value)}
                    required
                    className="w-full rounded-md border border-line bg-panel2 px-3.5 py-2.5 text-sm text-paper outline-none transition-colors focus:border-cyan/50"
                  >
                    <option value="" disabled>
                      {d.labels.brokerPlaceholder}
                    </option>
                    {d.brokers.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="accountNumber" className="mb-2 block text-xs text-dim">
                      {d.labels.accountNumber}
                    </label>
                    <input
                      id="accountNumber"
                      type="text"
                      inputMode="numeric"
                      placeholder={d.labels.accountNumberPlaceholder}
                      value={form.accountNumber}
                      onChange={(e) => update("accountNumber", e.target.value)}
                      required
                      className="w-full rounded-md border border-line bg-panel2 px-3.5 py-2.5 text-sm text-paper outline-none transition-colors placeholder:text-dim/70 focus:border-cyan/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="server" className="mb-2 block text-xs text-dim">
                      {d.labels.server}
                    </label>
                    <input
                      id="server"
                      type="text"
                      placeholder={d.labels.serverPlaceholder}
                      value={form.server}
                      onChange={(e) => update("server", e.target.value)}
                      required
                      className="w-full rounded-md border border-line bg-panel2 px-3.5 py-2.5 text-sm text-paper outline-none transition-colors placeholder:text-dim/70 focus:border-cyan/50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="note" className="mb-2 block text-xs text-dim">
                    {d.labels.note}
                  </label>
                  <textarea
                    id="note"
                    rows={3}
                    placeholder={d.labels.notePlaceholder}
                    value={form.note}
                    onChange={(e) => update("note", e.target.value)}
                    className="w-full resize-none rounded-md border border-line bg-panel2 px-3.5 py-2.5 text-sm text-paper outline-none transition-colors placeholder:text-dim/70 focus:border-cyan/50"
                  />
                </div>

                {status === "error" && (
                  <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-400">
                    {errorMessage}
                  </p>
                )}

                <label className="flex items-start gap-2.5 text-xs leading-relaxed text-dim">
                  <input
                    type="checkbox"
                    checked={form.pdpaConsent}
                    onChange={(e) => update("pdpaConsent", e.target.checked)}
                    required
                    className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-line bg-panel2 accent-cyan"
                  />
                  <span>
                    {d.labels.consentPrefix}{" "}
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan underline underline-offset-2"
                    >
                      {d.labels.consentLinkText}
                    </a>{" "}
                    {d.labels.consentSuffix}
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!canSubmit || status === "loading"}
                  className="mt-1 rounded-md bg-cyan py-3.5 text-sm font-medium text-ink transition-transform enabled:hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {status === "loading" ? d.labels.submitting : d.labels.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
