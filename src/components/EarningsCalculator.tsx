import { useMemo, useState } from "react";

/**
 * Interactive Seller Earnings Calculator.
 * Compares net monthly payout on THE LONE DEN vs mainstream platforms.
 *
 * Fee model (transparent, illustrative):
 *  - THE LONE DEN: 3% flat. No listing fees, no payment surcharge.
 *  - Mainstream (Etsy / Depop / Vinted): 13% commission + 3% payment
 *    processing + $0.20 per-listing fee. Listing count is estimated from
 *    an average $40 item price.
 */
const DEN_FEE = 0.03;
const MAIN_COMMISSION = 0.13;
const MAIN_PAYMENT = 0.03;
const MAIN_LISTING_FEE = 0.2;
const AVG_ITEM_PRICE = 40;

const MIN_SALES = 100;
const MAX_SALES = 5000;
const STEP = 50;

function money(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function EarningsCalculator() {
  const [sales, setSales] = useState(1500);

  const { denNet, mainNet, delta, listings } = useMemo(() => {
    const listings = Math.max(1, Math.round(sales / AVG_ITEM_PRICE));
    const mainListingTotal = listings * MAIN_LISTING_FEE;
    const denNet = sales * (1 - DEN_FEE);
    const mainNet = sales * (1 - MAIN_COMMISSION - MAIN_PAYMENT) - mainListingTotal;
    return {
      denNet,
      mainNet,
      delta: denNet - mainNet,
      listings,
    };
  }, [sales]);

  const denPct = Math.round((denNet / sales) * 100);
  const mainPct = Math.round((mainNet / sales) * 100);
  const pct = Math.min(100, Math.round((sales - MIN_SALES) / (MAX_SALES - MIN_SALES) * 100));

  return (
    <section id="calculator" className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left: intro + slider */}
          <div className="lg:col-span-5">
            <p className="font-display text-[11px] tracking-[0.5em] text-gold mb-4">✦ DO THE MATH</p>
            <h2 className="font-display text-4xl md:text-6xl tracking-[0.04em] leading-[0.95]">
              SELLER EARNINGS
              <br />
              <span className="text-foreground/40">CALCULATOR.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm text-muted-foreground leading-relaxed">
              Drag the dial to your estimated monthly clothing sales and watch the
              difference stack up. Lower fees on THE LONE DEN mean more of your
              money stays in your pocket — every single month.
            </p>

            <div className="mt-10">
              <div className="flex items-baseline justify-between mb-4">
                <label htmlFor="sales-slider" className="font-display text-[11px] tracking-[0.4em] text-muted-foreground">
                  MONTHLY SALES
                </label>
                <span className="font-display text-2xl text-gold tracking-[0.04em]">
                  {money(sales)}
                </span>
              </div>

              <input
                id="sales-slider"
                type="range"
                min={MIN_SALES}
                max={MAX_SALES}
                step={STEP}
                value={sales}
                onChange={(e) => setSales(Number(e.target.value))}
                className="den-range w-full"
                style={{
                  background: `linear-gradient(to right, hsl(var(--gold)) 0%, hsl(var(--gold)) ${pct}%, hsl(var(--secondary)) ${pct}%, hsl(var(--secondary)) 100%)`,
                }}
              />
              <div className="flex justify-between mt-2 font-display text-[10px] tracking-[0.3em] text-muted-foreground">
                <span>{money(MIN_SALES)}</span>
                <span>{money(MAX_SALES)}</span>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Estimating <span className="text-foreground">{listings}</span> listings / mo at an
                average <span className="text-foreground">{money(AVG_ITEM_PRICE)}</span> per item.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="#apply"
                className="group inline-flex items-center gap-3 bg-gold text-primary-foreground font-display text-xs tracking-[0.4em] px-8 py-4 hover:bg-foreground transition-colors duration-500"
              >
                APPLY FOR EARLY SELLER ACCESS
                <span className="transition-transform group-hover:translate-x-1">↓</span>
              </a>
            </div>
          </div>

          {/* Right: payout comparison */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* THE LONE DEN */}
              <div className="relative border border-gold/40 bg-background p-8 flex flex-col">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-gold" />
                <p className="font-display text-[11px] tracking-[0.4em] text-gold mb-3">THE LONE DEN</p>
                <p className="font-display text-5xl md:text-6xl text-gradient-gold leading-none tracking-[0.02em]">
                  {money(denNet)}
                </p>
                <p className="mt-2 font-display text-[11px] tracking-[0.3em] text-muted-foreground">
                  YOU KEEP {denPct}%
                </p>
                <div className="mt-6 space-y-2 text-xs text-foreground/70">
                  <Row label="Platform fee" value={`${(DEN_FEE * 100).toFixed(0)}% flat`} />
                  <Row label="Listing fees" value="None" />
                  <Row label="Payment processing" value="Included" />
                </div>
              </div>

              {/* Mainstream */}
              <div className="relative border border-border bg-secondary/40 p-8 flex flex-col">
                <p className="font-display text-[11px] tracking-[0.4em] text-muted-foreground mb-3">
                  ETSY / DEPOP / VINTED
                </p>
                <p className="font-display text-5xl md:text-6xl text-foreground/55 leading-none tracking-[0.02em]">
                  {money(mainNet)}
                </p>
                <p className="mt-2 font-display text-[11px] tracking-[0.3em] text-muted-foreground">
                  YOU KEEP {mainPct}%
                </p>
                <div className="mt-6 space-y-2 text-xs text-muted-foreground">
                  <Row label="Commission" value={`${(MAIN_COMMISSION * 100).toFixed(0)}%`} dim />
                  <Row label="Payment processing" value={`${(MAIN_PAYMENT * 100).toFixed(0)}%`} dim />
                  <Row label="Listing fees" value={`${money(listings * MAIN_LISTING_FEE)}`} dim />
                </div>
              </div>
            </div>

            {/* Dynamic stat callout */}
            <div className="mt-4 border border-gold/30 bg-gradient-to-r from-background to-card p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="font-display text-xl md:text-2xl tracking-[0.04em] leading-tight max-w-xl">
                YOU KEEP{" "}
                <span className="text-gradient-gold">{money(delta)}</span>{" "}
                MORE OF YOUR PROFITS EVERY MONTH BY DROPPING ON THE LONE DEN.
              </p>
              <div className="shrink-0 text-right">
                <p className="font-display text-[10px] tracking-[0.4em] text-muted-foreground">YEARLY GAIN</p>
                <p className="font-display text-3xl text-gold tracking-[0.02em]">{money(delta * 12)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, dim }: { label: string; value: string; dim?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0 last:pb-0">
      <span className={dim ? "text-muted-foreground" : "text-foreground/70"}>{label}</span>
      <span className={dim ? "text-foreground/55" : "text-foreground"}>{value}</span>
    </div>
  );
}
