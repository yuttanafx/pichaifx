// Deterministic pseudo-random generator (mulberry32) so the markup is
// identical on server and client — no Math.random(), no hydration mismatch.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Candle = {
  up: boolean;
  bodyHeight: number;
  bodyBottom: number;
  wickHeight: number;
  wickBottom: number;
};

const BAND_HEIGHT = 420; // px, height of the ticker-style band
const CANDLE_COUNT = 40;

function generateCandles(count: number, seed: number): Candle[] {
  const rand = mulberry32(seed);
  const candles: Candle[] = [];
  let last = BAND_HEIGHT * 0.4;

  for (let i = 0; i < count; i++) {
    const drift = (rand() - 0.5) * BAND_HEIGHT * 0.5;
    const next = Math.min(BAND_HEIGHT * 0.85, Math.max(BAND_HEIGHT * 0.12, last + drift));
    const up = next >= last;
    const bodyBottom = Math.min(last, next);
    const bodyHeight = Math.max(6, Math.abs(next - last));
    const wickPad = 8 + rand() * 26;
    const wickHeight = bodyHeight + wickPad * 2;
    const wickBottom = Math.max(0, bodyBottom - wickPad);

    candles.push({ up, bodyHeight, bodyBottom, wickHeight, wickBottom });
    last = next;
  }
  return candles;
}

const CANDLES = generateCandles(CANDLE_COUNT, 20260925);

function CandleColumn({ candle, index }: { candle: Candle; index: number }) {
  const colorClass = candle.up ? "bg-mint" : "bg-rose";
  return (
    <div className="relative h-full w-[18px] flex-shrink-0" aria-hidden="true">
      <span
        className={`absolute left-1/2 w-[2px] -translate-x-1/2 ${colorClass}`}
        style={{ height: candle.wickHeight, bottom: candle.wickBottom }}
      />
      <span
        className={`absolute left-1/2 w-[12px] -translate-x-1/2 rounded-[2px] ${colorClass}`}
        style={{ height: candle.bodyHeight, bottom: candle.bodyBottom }}
      />
    </div>
  );
}

export default function CandlestickBackground() {
  // render the sequence twice back to back so translateX(-50%) loops seamlessly
  const loop = [...CANDLES, ...CANDLES];

  return (
    <div className="candle-layer" aria-hidden="true">
      <div
        className="candle-track"
        style={{ height: BAND_HEIGHT, gap: "16px", paddingInline: "8px" }}
      >
        {loop.map((c, i) => (
          <CandleColumn candle={c} index={i} key={i} />
        ))}
      </div>
      {/* fade the band into the page background at its top edge (full opacity,
          independent from the dimmed candle-track above) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: BAND_HEIGHT,
          background: "linear-gradient(to bottom, rgb(var(--color-ink)) 0%, transparent 55%)",
        }}
      />
    </div>
  );
}
