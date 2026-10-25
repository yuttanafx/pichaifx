/**
 * กติกาค่าแนะนำ 3 ชั้น — แก้ตัวเลขได้ที่ไฟล์นี้ไฟล์เดียว
 *
 * ยอดค่าสมาชิกครั้งแรก (ที่แอดมินตั้ง) = 100%
 * ตัดไปจ่ายค่าแนะนำรวม 30% แบ่งมาก -> น้อย (สัดส่วน 5:3:2):
 *   ชั้น 1 (ผู้แนะนำโดยตรง)            15%
 *   ชั้น 2 (ผู้แนะนำของชั้น 1)           9%
 *   ชั้น 3 (ผู้แนะนำของชั้น 2)           6%
 * ตัวอย่างยอด 1,990 บาท: 298.50 / 179.10 / 119.40 (รวม 597 บาท)
 *
 * ถ้าสายแนะนำสั้นกว่า 3 ชั้น ส่วนที่ไม่มีคนรับจะไม่ถูกจ่ายใคร (เป็นของบริษัท)
 */
export const PRODUCT_PRICE_THB = 1990;
export const COMMISSION_POOL_PERCENT = 30;
export const LEVEL_PERCENTS = [15, 9, 6] as const;

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
