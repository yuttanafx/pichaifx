const rows = [
  { symbol: "XAUUSD", price: "2,638.42", change: "+1.24%", up: true },
  { symbol: "BTCUSD", price: "108,420", change: "+2.14%", up: true },
  { symbol: "EURUSD", price: "1.17482", change: "-0.42%", up: false },
  { symbol: "GBPUSD", price: "1.35124", change: "+0.31%", up: true },
  { symbol: "ETHUSD", price: "3,942.10", change: "+1.87%", up: true },
  { symbol: "USDJPY", price: "148.62", change: "-0.18%", up: false },
];

export default function LiveMarket() {
  const loop = [...rows, ...rows];
  return (
    <section className="border-t border-line py-6">
      <div className="group overflow-hidden">
        <div className="flex w-max animate-ticker gap-10 py-2 [animation-play-state:running] group-hover:[animation-play-state:paused]">
          {loop.map((r, i) => (
            <div key={i} className="flex items-center gap-2.5 whitespace-nowrap font-mono text-sm">
              <span className="text-paper">{r.symbol}</span>
              <span className="text-dim">{r.price}</span>
              <span className={r.up ? "text-mint" : "text-rose"}>{r.change}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
