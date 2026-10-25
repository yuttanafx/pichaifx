export function baht(satang: number) {
  return (
    "฿" +
    (satang / 100).toLocaleString("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

export function thaiDate(iso: string) {
  return new Date(iso).toLocaleString("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// เทียบชื่อแบบไม่สนคำนำหน้า ช่องว่าง เครื่องหมาย หรือตัวพิมพ์เล็ก/ใหญ่
const TITLES = /^(นางสาว|นาย|นาง|น\.ส\.|ด\.ช\.|ด\.ญ\.|mr\.?|mrs\.?|ms\.?|miss)/i;
export function normName(s: string) {
  return s
    .normalize("NFC")
    .trim()
    .replace(TITLES, "")
    .replace(/[\s.\-_,]/g, "")
    .toLowerCase();
}
