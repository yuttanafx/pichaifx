import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // stored as "r g b" CSS variables so Tailwind's opacity modifiers
        // (e.g. bg-cyan/10) keep working while the values swap per theme
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        panel: "rgb(var(--color-panel) / <alpha-value>)",
        panel2: "rgb(var(--color-panel-2) / <alpha-value>)",
        line: "var(--color-line)",
        cyan: "rgb(var(--color-cyan) / <alpha-value>)",
        blue: "rgb(var(--color-blue) / <alpha-value>)",
        mint: "rgb(var(--color-mint) / <alpha-value>)",
        rose: "rgb(var(--color-rose) / <alpha-value>)",
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        dim: "rgb(var(--color-dim) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        grid:
          "linear-gradient(var(--color-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid-line) 1px, transparent 1px)",
        "fade-cyan":
          "radial-gradient(60% 60% at 50% 0%, var(--color-hero-fade) 0%, rgba(0,0,0,0) 70%)",
      },
      boxShadow: {
        glow: "var(--shadow-glow)",
      },
    },
  },
  plugins: [],
};
export default config;
