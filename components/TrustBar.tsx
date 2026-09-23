const items = [
  { label: "Smart Algorithms", desc: "แม่นยำสูงกว่าเดิม" },
  { label: "Risk Management", desc: "ป้องกันในตัวระบบ" },
  { label: "24/7 Monitoring", desc: "ติดตามตลาดตลอดเวลา" },
  { label: "เทรดได้ทุกที่", desc: "ทุกเวลา ทุกอุปกรณ์" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-line bg-panel/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-line sm:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className="bg-ink px-6 py-6">
            <p className="text-sm font-medium text-paper">{it.label}</p>
            <p className="mt-1 text-xs text-dim">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
