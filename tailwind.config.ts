import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#05070B",
        panel: "#0B111A",
        panel2: "#0E1622",
        line: "rgba(255,255,255,0.07)",
        cyan: "#00E5FF",
        blue: "#4169FF",
        mint: "#00FF9C",
        rose: "#FF5C7A",
        paper: "#F5F7FA",
        dim: "#7D8998",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        grid:
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        "fade-cyan":
          "radial-gradient(60% 60% at 50% 0%, rgba(0,229,255,0.16) 0%, rgba(0,229,255,0) 70%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(0,229,255,0.15), 0 0 40px rgba(0,229,255,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
