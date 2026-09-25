"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#platform", label: "แพลตฟอร์ม" },
  { href: "#products", label: "โปรดักต์" },
  { href: "#performance", label: "ผลการเทรด" },
  { href: "#connect-account", label: "แจ้งบัญชีเทรด" },
  { href: "#academy", label: "อคาเดมี" },
  { href: "#pricing", label: "แพ็กเกจ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled ? "border-line bg-ink/85 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-md border border-cyan/30 bg-panel">
            <span className="h-2.5 w-2.5 rounded-sm bg-cyan" />
          </span>
          <span className="font-display text-[15px] font-semibold tracking-wide text-paper">
            PichaiFX Autotrad
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-dim transition-colors hover:text-paper"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <a
            href="#connect-account"
            className="text-sm text-dim transition-colors hover:text-paper"
          >
            เข้าสู่ระบบ
          </a>
          <a
            href="#pricing"
            className="rounded-md bg-cyan px-4 py-2 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
          >
            เริ่มต้นใช้งาน
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            aria-label="เปิดเมนู"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-md border border-line"
          >
            <div className="flex flex-col gap-[5px]">
              <span className="h-[1.5px] w-4 bg-paper" />
              <span className="h-[1.5px] w-4 bg-paper" />
              <span className="h-[1.5px] w-4 bg-paper" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-ink px-6 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-sm text-dim hover:bg-panel hover:text-paper"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-cyan px-4 py-3 text-center text-sm font-medium text-ink"
            >
              เริ่มต้นใช้งาน
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
