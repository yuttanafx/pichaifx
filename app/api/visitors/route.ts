import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VISITS_KEY = "pichaifx:site:visits";

function getConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  return { url, token };
}

async function redisCommand(url: string, token: string, path: string) {
  const res = await fetch(`${url}/${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Upstash error: ${res.status}`);
  }

  const data = (await res.json()) as { result: string | number | null };
  return data.result;
}

const NOT_CONFIGURED_RESPONSE = {
  ok: false as const,
  error:
    "เซิร์ฟเวอร์ยังไม่ได้ตั้งค่าตัวนับผู้เข้าชม กรุณาติดต่อผู้ดูแลระบบให้ตั้งค่า Upstash Redis ในไฟล์ .env.local",
};

// อ่านยอดปัจจุบัน โดยไม่เพิ่มค่า (ใช้ตอนผู้เข้าชมคนเดิม refresh หน้าในเซสชันเดียวกัน)
export async function GET() {
  const { url, token } = getConfig();

  if (!url || !token) {
    console.error(
      "Missing Upstash Redis configuration. Please set UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN in .env.local"
    );
    return NextResponse.json(NOT_CONFIGURED_RESPONSE, { status: 500 });
  }

  try {
    const result = await redisCommand(url, token, `get/${VISITS_KEY}`);
    const count = result ? Number(result) : 0;
    return NextResponse.json({ ok: true, count });
  } catch (error) {
    console.error("Failed to read visitor count:", error);
    return NextResponse.json(
      { ok: false, error: "อ่านยอดผู้เข้าชมไม่สำเร็จ" },
      { status: 500 }
    );
  }
}

// เพิ่มยอดผู้เข้าชม 1 ครั้ง (เรียกครั้งเดียวต่อเซสชันจากฝั่งไคลเอนต์)
export async function POST() {
  const { url, token } = getConfig();

  if (!url || !token) {
    console.error(
      "Missing Upstash Redis configuration. Please set UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN in .env.local"
    );
    return NextResponse.json(NOT_CONFIGURED_RESPONSE, { status: 500 });
  }

  try {
    const result = await redisCommand(url, token, `incr/${VISITS_KEY}`);
    return NextResponse.json({ ok: true, count: Number(result) });
  } catch (error) {
    console.error("Failed to increment visitor count:", error);
    return NextResponse.json(
      { ok: false, error: "บันทึกยอดผู้เข้าชมไม่สำเร็จ" },
      { status: 500 }
    );
  }
}
