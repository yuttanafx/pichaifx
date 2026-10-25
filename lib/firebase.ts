import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { firebaseCredentials } from "./firebase-credentials";

// ใช้ Firebase Admin SDK ฝั่งเซิร์ฟเวอร์เท่านั้น (เบราว์เซอร์ไม่คุยกับ Firestore ตรง)
export function getDb() {
  if (getApps().length === 0) {
    // ใช้ค่าจาก environment variables ถ้ามี ไม่งั้นใช้ค่าที่ฝังไว้ใน firebase-credentials.ts
    const projectId = process.env.FIREBASE_PROJECT_ID || firebaseCredentials.projectId;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL || firebaseCredentials.clientEmail;
    const privateKey = (process.env.FIREBASE_PRIVATE_KEY?.replace(/^"|"$/g, "").replace(/\\n/g, "\n")) || firebaseCredentials.privateKey;
    initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  }
  return getFirestore();
}
