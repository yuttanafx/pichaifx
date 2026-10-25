// ไคลเอนต์ Upstash Redis (REST) แบบไม่ต้องติดตั้งแพ็กเกจเพิ่ม
// ใช้ตัวแปรเดียวกับตัวนับผู้เข้าชม: UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN

type Arg = string | number;

function config() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/+$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error(
      "ยังไม่ได้ตั้งค่า UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN ใน .env.local"
    );
  }
  return { url, token };
}

async function post(path: string, body: unknown) {
  const { url, token } = config();
  const res = await fetch(`${url}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Upstash error ${res.status}: ${JSON.stringify(data)}`);
  }
  return data;
}

export async function cmd<T = unknown>(...args: Arg[]): Promise<T> {
  const data = await post("", args);
  if (data.error) throw new Error(`Upstash: ${data.error}`);
  return data.result as T;
}

function unwrap(results: { result?: unknown; error?: string }[]) {
  return results.map((r) => {
    if (r.error) throw new Error(`Upstash: ${r.error}`);
    return r.result;
  });
}

/** ส่งหลายคำสั่งในครั้งเดียว (ไม่เป็น transaction) */
export async function pipeline(cmds: Arg[][]): Promise<unknown[]> {
  if (cmds.length === 0) return [];
  return unwrap(await post("/pipeline", cmds));
}

/** ส่งหลายคำสั่งแบบ transaction — สำเร็จทั้งหมดหรือไม่สำเร็จเลย */
export async function multi(cmds: Arg[][]): Promise<unknown[]> {
  if (cmds.length === 0) return [];
  return unwrap(await post("/multi-exec", cmds));
}

export async function mgetJson<T>(keys: string[]): Promise<T[]> {
  if (keys.length === 0) return [];
  const raw = await cmd<(string | null)[]>("MGET", ...keys);
  return raw.filter((s): s is string => !!s).map((s) => JSON.parse(s) as T);
}
