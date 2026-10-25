/**
 * กติกาค่าแนะนำ 3 ชั้น — แก้ตัวเลขได้ที่ไฟล์นี้ไฟล์เดียว
 *
 * ราคา EA = 100% (1,990 บาท)
 * ตัดไปจ่ายค่าแนะนำรวม 40% = 796 บาท แบ่งมาก -> น้อย:
 *   ชั้น 1 (ผู้แนะนำโดยตรง)            20%  = 398.00 บาท
 *   ชั้น 2 (ผู้แนะนำของชั้น 1)          12%  = 238.80 บาท
 *   ชั้น 3 (ผู้แนะนำของชั้น 2)           8%  = 159.20 บาท
 *
 * ถ้าสายแนะนำสั้นกว่า 3 ชั้น ส่วนที่ไม่มีคนรับจะไม่ถูกจ่ายใคร (เป็นของบริษัท)
 */
export const PRODUCT_PRICE_THB = 1990;
export const COMMISSION_POOL_PERCENT = 40;
export const LEVEL_PERCENTS = [20, 12, 8] as const;

export const PRICE_SATANG = PRODUCT_PRICE_THB * 100;

// เงินทั้งหมดเก็บเป็น "สตางค์" (จำนวนเต็ม) เพื่อไม่ให้เศษทศนิยมคลาดเคลื่อน
export function levelAmountsSatang(priceSatang: number = PRICE_SATANG): number[] {
  return LEVEL_PERCENTS.map((p) => Math.floor((priceSatang * p) / 100));
}

const sum = LEVEL_PERCENTS.reduce((a, b) => a + b, 0);
if (sum !== COMMISSION_POOL_PERCENT) {
  throw new Error(
    `LEVEL_PERCENTS รวมได้ ${sum}% แต่ COMMISSION_POOL_PERCENT = ${COMMISSION_POOL_PERCENT}%`
  );
}
