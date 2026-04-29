const items = [
  "ARCHIVE-GRADE STREETWEAR",
  "NO STOCK PHOTO POLICY",
  "VERIFIED SELLERS",
  "12 LIVING COLLECTIONS",
  "SHIPS WORLDWIDE",
  "EST. THE LONE DEN",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border bg-background py-4">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="font-display text-xs tracking-[0.5em] text-foreground/70 flex items-center gap-12"
          >
            {t}
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}