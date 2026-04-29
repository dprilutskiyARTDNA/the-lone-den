import { Link } from "react-router-dom";
import type { Collection } from "@/data/collections";

type Props = { item: Collection; priority?: boolean };

export default function CollectionCard({ item, priority }: Props) {
  return (
    <Link
      to={`/marketplace?c=${encodeURIComponent(item.category)}`}
      className="group relative block overflow-hidden bg-card hairline focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={item.image}
          alt={`${item.title} — ${item.subtitle}`}
          width={1024}
          height={1536}
          loading={priority ? "eager" : "lazy"}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        {/* Veil */}
        <div className="absolute inset-0 veil-bottom pointer-events-none" />

        {/* Top meta row */}
        <div className="absolute top-0 inset-x-0 p-4 flex items-start justify-between">
          <span className="font-display text-[10px] tracking-[0.4em] text-foreground/80">
            {item.index} / 12
          </span>
          {item.flag && (
            <span className="font-display text-[10px] tracking-[0.4em] text-gold border border-gold/60 px-2 py-1">
              {item.flag}
            </span>
          )}
        </div>

        {/* Bottom label */}
        <div className="absolute bottom-0 inset-x-0 p-5">
          <div className={item.inverted ? "upside-down" : undefined}>
            <p className="font-display text-[10px] tracking-[0.4em] text-gold mb-1">
              {item.subtitle}
            </p>
            <h3 className="font-display text-2xl md:text-3xl tracking-[0.08em] text-foreground leading-none">
              {item.title}
            </h3>
          </div>
        </div>

        {/* Hover gold rule */}
        <span className="absolute left-5 right-5 bottom-3 h-px bg-gold scale-x-0 origin-left transition-transform duration-700 group-hover:scale-x-100" />
      </div>
    </Link>
  );
}