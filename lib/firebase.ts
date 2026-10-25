import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// ใช้ Firebase Admin SDK ฝั่งเซิร์ฟเวอร์เท่านั้น (เบราว์เซอร์ไม่คุยกับ Firestore ตรง)
export function getDb() {
  if (getApps().length === 0) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    // Vercel มักเก็บ private key เป็นบรรทัดเดียวที่มี \n เป็นตัวอักษร จึงต้องแปลงกลับ
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/^"|"$/g, "").replace(/\\n/g, "\n");
    if (!projectId || !clientEmail || !privateKey) {
      throw new Error(
        "ยังไม่ได้ตั้งค่า FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY"
      );
    }
    initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  }
  return getFirestore();
}
