"use client";

import { useEffect, useRef, useState } from "react";

const PAGE_URL = "https://www.facebook.com/QuantFxthai/";

declare global {
  interface Window {
    FB?: { XFBML: { parse: (el?: HTMLElement) => void } };
    fbAsyncInit?: () => void;
  }
}

/**
 * Facebook Page Plugin — โหลดเฉพาะเมื่อผู้เข้าชมกดปุ่ม (Facebook จะตั้งคุกกี้/ติดตามผู้ใช้ จึงไม่โหลดเองตั้งแต่แรก ตามนโยบาย PDPA)
 * ความกว้างปรับตามกรอบอัตโนมัติ (Facebook รองรับ 180–500px)
 */
export default function FacebookFeed() {
  const box = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [width, setWidth] = useState(380);

  useEffect(() => {
    if (!box.current) return;
    const w = Math.round(Math.min(500, Math.max(180, box.current.clientWidth)));
    setWidth(w);
  }, []);

  useEffect(() => {
    if (!on) return;
    const parse = () => window.FB?.XFBML.parse(box.current ?? undefined);
    if (window.FB) {
      parse();
      return;
    }
    window.fbAsyncInit = parse;
    if (!document.getElementById("facebook-jssdk")) {
      const s = document.createElement("script");
      s.id = "facebook-jssdk";
      s.async = true;
      s.defer = true;
      s.crossOrigin = "anonymous";
      s.src = "https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v19.0";
      document.body.appendChild(s);
    }
  }, [on]);

  return (
    <div ref={box} className="w-full">
      <div id="fb-root" />
      {on ? (
        <div
          key={width}
          className="fb-page"
          data-tabs="timeline,events,messages"
          data-href={PAGE_URL}
          data-width={width}
          data-height="500"
          data-hide-cover="false"
          data-small-header="false"
          data-adapt-container-width="true"
        >
          <blockquote cite={PAGE_URL} className="fb-xfbml-parse-ignore">
            <a href={PAGE_URL}>Quant FX Thai</a>
          </blockquote>
        </div>
      ) : (
        <div className="rounded-lg border border-line bg-panel2 p-5">
          <p className="text-sm font-medium text-paper">ติดตามเราบน Facebook</p>
          <p className="mt-1 text-xs leading-relaxed text-dim">
            การแสดงฟีดจะโหลดข้อมูลจาก Facebook ซึ่งอาจตั้งคุกกี้ของ Facebook กดเมื่อคุณยินยอมเท่านั้น
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button onClick={() => setOn(true)} className="rounded-md bg-cyan px-4 py-2 text-sm font-medium text-ink">
              แสดงฟีด Facebook
            </button>
            <a href={PAGE_URL} target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-line px-4 py-2 text-sm text-paper hover:border-cyan/40">
              เปิดเพจ Facebook
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
