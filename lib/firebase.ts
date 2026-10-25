import crypto from "crypto";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { firebaseCredentials } from "./firebase-credentials";

function validKey(k: string | undefined) {
  if (!k) return false;
  try {
    crypto.createPrivateKey(k);
    return true;
  } catch {
    return false;
  }
}

// ใช้ Firebase Admin SDK ฝั่งเซิร์ฟเวอร์เท่านั้น (เบราว์เซอร์ไม่คุยกับ Firestore ตรง)
export function getDb() {
  if (getApps().length === 0) {
    // ถ้า env FIREBASE_PRIVATE_KEY ใน Vercel อ่านไม่ได้/ผิดรูปแบบ ให้ข้ามไปใช้ค่าที่ฝังในไฟล์แทน
    const envKey = process.env.FIREBASE_PRIVATE_KEY?.trim()
      .replace(/^["']|["']$/g, "")
      .replace(/\\n/g, "\n");
    const useEnv =
      validKey(envKey) && !!process.env.FIREBASE_PROJECT_ID && !!process.env.FIREBASE_CLIENT_EMAIL;
    initializeApp({
      credential: cert(
        useEnv
          ? {
              projectId: process.env.FIREBASE_PROJECT_ID!,
              clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
              privateKey: envKey!,
            }
          : firebaseCredentials
      ),
    });
  }
  return getFirestore();
}
