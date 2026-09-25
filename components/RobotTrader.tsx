export default function RobotTrader() {
  return (
    <div className="robot-mascot" aria-hidden="true">
      <svg
        viewBox="0 0 160 210"
        className="robot-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="robotScreenClip">
            <rect x="34" y="96" width="92" height="46" rx="6" />
          </clipPath>
          <linearGradient id="robotScreenFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgb(var(--color-ink))" stopOpacity="1" />
            <stop offset="12%" stopColor="rgb(var(--color-ink))" stopOpacity="0" />
            <stop offset="88%" stopColor="rgb(var(--color-ink))" stopOpacity="0" />
            <stop offset="100%" stopColor="rgb(var(--color-ink))" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* soft glow behind the whole unit */}
        <ellipse cx="80" cy="150" rx="66" ry="46" fill="rgb(var(--color-cyan))" opacity="0.08" />

        {/* antenna */}
        <g className="robot-antenna">
          <line x1="80" y1="10" x2="80" y2="28" stroke="rgb(var(--color-cyan))" strokeWidth="2.5" />
          <circle cx="80" cy="8" r="5" fill="rgb(var(--color-cyan))" className="robot-antenna-dot" />
        </g>

        {/* head */}
        <rect
          x="38"
          y="28"
          width="84"
          height="52"
          rx="14"
          fill="rgb(var(--color-panel))"
          stroke="var(--color-line)"
          strokeWidth="1.5"
        />
        {/* eyes */}
        <g className="robot-eyes">
          <circle cx="64" cy="54" r="7" fill="rgb(var(--color-cyan))" />
          <circle cx="96" cy="54" r="7" fill="rgb(var(--color-cyan))" />
        </g>

        {/* ear lights */}
        <circle cx="34" cy="46" r="4" fill="rgb(var(--color-mint))" className="robot-blink-slow" />
        <circle cx="126" cy="46" r="4" fill="rgb(var(--color-mint))" className="robot-blink-slow" />

        {/* neck */}
        <rect x="72" y="80" width="16" height="10" fill="rgb(var(--color-panel-2))" />

        {/* body */}
        <rect
          x="24"
          y="90"
          width="112"
          height="88"
          rx="16"
          fill="rgb(var(--color-panel))"
          stroke="var(--color-line)"
          strokeWidth="1.5"
        />

        {/* chest screen bezel */}
        <rect x="32" y="94" width="96" height="50" rx="8" fill="rgb(var(--color-ink))" />

        {/* animated mini price line inside the screen */}
        <g clipPath="url(#robotScreenClip)">
          <g className="robot-ticker">
            <polyline
              points="0,128 12,118 24,124 36,108 48,114 60,96 72,104 84,90 96,100 108,86 120,94 132,80 144,88 156,76 168,84 180,72 192,80 204,68"
              fill="none"
              stroke="rgb(var(--color-mint))"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="204,68 216,78 228,72 240,128 252,118 264,124 276,108 288,114 300,96 312,104 324,90 336,100 348,86 360,94 372,80 384,88 396,76 408,84"
              fill="none"
              stroke="rgb(var(--color-mint))"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
        <rect x="34" y="96" width="92" height="46" rx="6" fill="url(#robotScreenFade)" opacity="0.9" />
        <rect
          x="32"
          y="94"
          width="96"
          height="50"
          rx="8"
          fill="none"
          stroke="rgb(var(--color-cyan))"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />

        {/* status dot */}
        <circle cx="118" cy="150" r="3.5" fill="rgb(var(--color-mint))" className="robot-blink" />
        <text
          x="30"
          y="153"
          fontSize="8"
          letterSpacing="0.5"
          fill="rgb(var(--color-dim))"
          fontFamily="var(--font-plex-mono), monospace"
        >
          AUTO-TRADE
        </text>

        {/* arms */}
        <rect
          x="6"
          y="104"
          width="16"
          height="10"
          rx="5"
          fill="rgb(var(--color-panel-2))"
          className="robot-arm-left"
        />
        <rect
          x="138"
          y="104"
          width="16"
          height="10"
          rx="5"
          fill="rgb(var(--color-panel-2))"
          className="robot-arm-right"
        />

        {/* base feet */}
        <rect x="40" y="180" width="26" height="10" rx="4" fill="rgb(var(--color-panel-2))" />
        <rect x="94" y="180" width="26" height="10" rx="4" fill="rgb(var(--color-panel-2))" />
      </svg>
    </div>
  );
}
