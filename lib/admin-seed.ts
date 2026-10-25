// บัญชีแอดมินเริ่มต้น — เก็บเฉพาะ "แฮช" ของรหัสผ่าน (scrypt) ไม่ได้เก็บรหัสผ่านตรง ๆ
// บัญชีจะถูกสร้างอัตโนมัติใน Firestore ตอนล็อกอินครั้งแรกด้วยอีเมล+รหัสผ่านนี้
// หลังจากนั้นเปลี่ยนรหัสได้ที่หน้า "ลืมรหัสผ่าน"
export const ADMIN_SEED_EMAIL = "pichai.6022@gmail.com";
export const ADMIN_SEED_NAME = "Pichai (Admin)";
export const ADMIN_SEED_HASH =
  "s1$9d9dd4e4185aa5fd081c0383c089c919$145ab51cdbba3c9e1a8370e489d804062f8f0a10f754c4babf7d550e5ebf706b7b43b2604717cdd2c85aff34e0d2273c61a4872d6d072e83f2fda190912fc672";
