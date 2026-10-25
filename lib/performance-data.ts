/**
 * ผลการเทรดบนหน้าแรก
 *  - กราฟ: วิดเจ็ตจริงจาก Myfxbook (บัญชี Gold-Grid) อัปเดตเองอัตโนมัติ
 *  - ตัวเลข 4 ช่อง (metrics): กรอกเองจากหน้า Myfxbook แล้วเปลี่ยน isSample เป็น false
 */
export const MYFXBOOK_ACCOUNT_ID = "12220131";
export const MYFXBOOK_URL = "https://www.myfxbook.com/members/yuttanafx/gold-grid/12220131";

export const PERFORMANCE = {
  isSample: true, // ← ตัวเลข metrics ด้านล่างยังเป็นตัวอย่าง เปลี่ยนเป็น false เมื่อใส่ค่าจริงแล้ว
  metrics: {
    profitUsd: 12842,
    maxDrawdownPct: 8.42,
    winRatePct: 72.8,
    profitFactor: 1.84,
  },
};

export function metricValues() {
  const m = PERFORMANCE.metrics;
  return [
    `${m.profitUsd >= 0 ? "+" : "-"}$${Math.abs(m.profitUsd).toLocaleString("en-US")}`,
    `${m.maxDrawdownPct}%`,
    `${m.winRatePct}%`,
    `${m.profitFactor}`,
  ];
}

/** URL วิดเจ็ต Myfxbook แยกสีตามธีมมืด/สว่างของเว็บ */
export function widgetUrl(theme: "dark" | "light") {
  const c =
    theme === "dark"
      ? { bg: "0b111a", grid: "2a3442", font: "cbd5e1", line: "00e5ff", bar: "1f6f7a", bar1: "1f6f7a", equity: "f4d03f" }
      : { bg: "ffffff", grid: "bdbdbd", font: "525252", line: "ff0505", bar: "ffadad", bar1: "ffadad", equity: "eff45a" };
  const q = new URLSearchParams({
    id: MYFXBOOK_ACCOUNT_ID,
    width: "600",
    height: "300",
    bart: "0",
    linet: "0",
    symbol: "NZDUSD",
    magic: "-1",
    title: "Gold-Grid",
    titles: "12",
    bgColor: c.bg,
    gridColor: c.grid,
    lineColor: c.line,
    barColor: c.bar,
    bar1Color: c.bar1,
    fontColor: c.font,
    chartbgc: c.bg,
    equityColor: c.equity,
  });
  return `https://widgets.mfbcdn.net/custom-widget?${q.toString()}`;
}
