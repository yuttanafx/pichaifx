"use client";

import { useEffect } from "react";

export const REF_STORAGE_KEY = "pichaifx-ref";

// เก็บรหัสแนะนำจากลิงก์ ?ref=XXXX ไว้ในเครื่อง เพื่อให้ยังจำได้
// แม้ผู้ใช้เดินไปดูหน้าอื่นก่อนแล้วค่อยกดสมัครสมาชิก
export default function RefCapture() {
  useEffect(() => {
    try {
      const ref = new URLSearchParams(window.location.search).get("ref");
      if (ref && /^[A-Za-z0-9]{4,16}$/.test(ref)) {
        window.localStorage.setItem(REF_STORAGE_KEY, ref.toUpperCase());
      }
    } catch {
      // ignore
    }
  }, []);
  return null;
}
