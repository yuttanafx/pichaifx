import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import CandlestickBackground from "@/components/CandlestickBackground";
import RobotTrader from "@/components/RobotTrader";

// Runs before React hydrates so the site never flashes the wrong theme.
// Default theme is "dark" (night); we only need to act when the visitor
// previously chose "light" (day).
const themeInitScript = `
(function () {
  try {
    var saved = localStorage.getItem("asto-theme");
    if (saved === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    }
  } catch (e) {}
})();
`;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "PichaiFX Autotrad — ระบบเทรดอัตโนมัติสำหรับ MT4/MT5",
  description:
    "PichaiFX Autotrad คือแพลตฟอร์มเทคโนโลยีการเทรดอัตโนมัติ ครบทั้ง EA, Copy Trading และการวิเคราะห์ตลาดแบบเรียลไทม์ รองรับ MT4 และ MT5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="th"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${plexMono.variable}`}
    >
      <head>
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <CandlestickBackground />
        {children}
        <RobotTrader />
      </body>
    </html>
  );
}
