# PichaiFX Autotrad — เว็บไซต์ Next.js

หน้าเว็บ landing page สไตล์ Trading Technology Platform ตามคอนเซปต์ที่ออกแบบไว้
(Dark background, Neon Cyan/Electric Blue, Dashboard/Terminal look)

## เทคโนโลยีที่ใช้

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (กำหนด design token สีและฟอนต์ไว้ใน `tailwind.config.ts`)
- ฟอนต์: Inter (เนื้อหา), Space Grotesk (หัวข้อ), IBM Plex Mono (ตัวเลข/ข้อมูล) โหลดผ่าน `next/font/google`

## วิธีติดตั้งและรัน

ต้องมี [Node.js](https://nodejs.org) เวอร์ชัน 18.18 ขึ้นไป

```bash
# ติดตั้ง dependencies
npm install

# รันโหมดพัฒนา (dev server)
npm run dev
```

จากนั้นเปิด http://localhost:3000

> หมายเหตุ: ตอนรัน `npm run build` หรือ `npm run dev` ครั้งแรก เครื่องต้องต่ออินเทอร์เน็ต
> เพื่อดาวน์โหลดฟอนต์จาก Google Fonts (เกิดขึ้นอัตโนมัติผ่าน `next/font`)

## Build สำหรับ production

```bash
npm run build
npm run start
```

## ฟีเจอร์ที่เพิ่มเข้ามา

- **พื้นหลังกราฟแท่งเทียนเคลื่อนที่** (`components/CandlestickBackground.tsx`) — แถบกราฟแท่งเทียนวิ่งต่อเนื่องแบบวนลูปที่ขอบล่างของหน้าจอ อยู่ด้านหลังเนื้อหาทั้งหมด (`position: fixed`, ตำแหน่งข้อมูลถูกสุ่มแบบ deterministic ไม่เปลี่ยนทุกครั้งที่โหลดหน้า จึงไม่มีปัญหา hydration) หยุดเคลื่อนไหวอัตโนมัติถ้าเบราว์เซอร์ตั้งค่า "ลดการเคลื่อนไหว" (`prefers-reduced-motion`)
- **สลับโหมดกลางวัน/กลางคืน** — ปุ่มรูปพระอาทิตย์/พระจันทร์ในเมนู (`components/ThemeToggle.tsx`) สลับ `data-theme` บน `<html>` ระหว่าง dark (ค่าเริ่มต้น) กับ light จำค่าไว้ใน `localStorage` และมีสคริปต์เล็ก ๆ ใน `app/layout.tsx` ทำงานก่อน React hydrate เพื่อไม่ให้จอกะพริบผิดสี สีทั้งหมดของเว็บ (ink, panel, cyan, mint, rose ฯลฯ) ถูกกำหนดเป็น CSS variable ใน `app/globals.css` ภายใต้ `:root` (กลางคืน) และ `[data-theme="light"]` (กลางวัน) จุดเดียว จึงสลับได้ทั้งเว็บพร้อมกัน
- **กล่องข้อความแจ้งบัญชีเทรดถึงแอดมิน** (`components/ConnectAccount.tsx`, ส่วน "แจ้งบัญชีเทรดให้แอดมิน") — ฟอร์มให้สมาชิกกรอกชื่อ ช่องทางติดต่อกลับ โบรกเกอร์ เลขบัญชี เซิร์ฟเวอร์ และข้อความเพิ่มเติม เพื่อแจ้งแอดมินว่าต้องการใช้บัญชีใดกับระบบเทรดอัตโนมัติ (ไม่มีการขอรหัสผ่านใด ๆ ในฟอร์มนี้ — แอดมินจะติดต่อกลับเพื่อแจ้งขั้นตอนต่อไปเอง)

  > **สำคัญ — ต้องทำเพิ่มก่อนใช้งานจริง:** ตอนนี้ฟอร์มนี้เป็นเพียง UI ฝั่ง frontend (เก็บ state ไว้ในเบราว์เซอร์ชั่วคราวเท่านั้น ยังไม่ได้ส่งข้อมูลไปที่ไหน) ต้องต่อกับ backend หรือบริการอย่าง Google Forms / Airtable / LINE Notify / อีเมล เพื่อให้ข้อมูลที่สมาชิกกรอกจริง ๆ ถูกส่งไปหาแอดมิน

## โครงสร้างไฟล์

```
app/
  layout.tsx      # root layout + โหลดฟอนต์
  page.tsx        # ประกอบทุก section ของหน้า Home
  globals.css     # สไตล์พื้นฐาน, scrollbar, animation
components/
  Navbar.tsx        # เมนูบนสุด (responsive, sticky)
  Hero.tsx          # ส่วน Hero + Live Trading Terminal mockup
  TrustBar.tsx      # แถบจุดเด่นสั้น ๆ
  Performance.tsx   # ผลการเทรด/ตัวเลขจริง + กราฟ equity curve
  Products.tsx      # การ์ดสินค้า (EA, Copy Trading, AI Analytics, Tools)
  HowItWorks.tsx    # ขั้นตอนการใช้งาน 4 ขั้นตอน
  CopyTrading.tsx   # รายการกลยุทธ์ Copy Trading
  LiveMarket.tsx    # แถบราคาตลาดวิ่ง (ticker)
  Pricing.tsx       # แพ็กเกจราคา 3 แบบ
  Academy.tsx       # บทความให้ความรู้
  Faq.tsx              # คำถามที่พบบ่อย (accordion, client component)
  ConnectAccount.tsx   # กล่องข้อความแจ้งบัญชีเทรดถึงแอดมิน
  CandlestickBackground.tsx  # พื้นหลังกราฟแท่งเทียนเคลื่อนที่
  ThemeToggle.tsx      # ปุ่มสลับกลางวัน/กลางคืน
  Contact.tsx          # ช่องทางติดต่อ
  Footer.tsx           # ท้ายเว็บไซต์
```

## ปรับแต่งสี/ฟอนต์

แก้ไขได้ที่ `tailwind.config.ts` ในส่วน `theme.extend.colors` และ `fontFamily`
ทุก component เรียกใช้สีผ่านชื่อ token เช่น `bg-ink`, `text-cyan`, `border-line`
เพื่อให้เปลี่ยนธีมทั้งเว็บได้จากจุดเดียว

## เนื้อหาที่ควรแทนที่ด้วยข้อมูลจริงก่อนเผยแพร่

- ตัวเลขผลการเทรดใน `Performance.tsx` และ `CopyTrading.tsx` (ปัจจุบันเป็นข้อมูลตัวอย่าง)
- ลิงก์ Myfxbook จริงใน `Performance.tsx`
- ช่องทางติดต่อใน `Contact.tsx` (LINE / Telegram / อีเมล)
- ราคาแพ็กเกจใน `Pricing.tsx`
