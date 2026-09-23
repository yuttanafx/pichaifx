"use client";

import { useState } from "react";

const faqs = [
  {
    q: "ASTO QUANT คืออะไร",
    a: "ASTO QUANT เป็นแพลตฟอร์มเทคโนโลยีสำหรับการเทรดอัตโนมัติ ให้บริการ EA, Copy Trading และเครื่องมือวิเคราะห์ตลาด สำหรับผู้ใช้ MT4 และ MT5",
  },
  {
    q: "รองรับ MT4 หรือ MT5 หรือไม่",
    a: "รองรับทั้งสองแพลตฟอร์ม คุณสามารถเชื่อมต่อบัญชีเทรดที่มีอยู่แล้วเข้ากับระบบได้ทันที",
  },
  {
    q: "จำเป็นต้องเปิด VPS หรือไม่",
    a: "ไม่จำเป็น แต่แนะนำให้ใช้ VPS เพื่อให้ระบบทำงานต่อเนื่องตลอด 24 ชั่วโมงโดยไม่ขึ้นกับคอมพิวเตอร์ส่วนตัว แพ็กเกจ Professional มี VPS ให้ฟรี",
  },
  {
    q: "ใช้ได้กับโบรกเกอร์ใดบ้าง",
    a: "ใช้ได้กับโบรกเกอร์ส่วนใหญ่ที่รองรับ MT4/MT5 มาตรฐาน ทีมงานจะตรวจสอบความเข้ากันได้ให้ก่อนเริ่มใช้งานจริง",
  },
  {
    q: "ถอนเงินได้เองหรือไม่",
    a: "ได้ เงินทุนทั้งหมดอยู่ในบัญชีเทรดของคุณเองที่โบรกเกอร์ ASTO QUANT ไม่ได้ถือครองเงินทุนของผู้ใช้งาน",
  },
  {
    q: "มีความเสี่ยงอะไรบ้าง",
    a: "การเทรดมีความเสี่ยงต่อเงินทุนเสมอ ผลตอบแทนในอดีตไม่ได้รับประกันผลลัพธ์ในอนาคต ควรศึกษาและกำหนดขนาดความเสี่ยงที่ยอมรับได้ก่อนเริ่มใช้งาน",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-line py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12">
          <p className="text-sm text-cyan">คำถามที่พบบ่อย</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-paper sm:text-4xl">
            สิ่งที่ควรรู้ก่อนเริ่มต้น
          </h2>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-[15px] font-medium text-paper">
                    {f.q}
                  </span>
                  <span
                    className={`flex-shrink-0 font-mono text-lg text-cyan transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-5 pr-8 text-sm leading-relaxed text-dim">
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
