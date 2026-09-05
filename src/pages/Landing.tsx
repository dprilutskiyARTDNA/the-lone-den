import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import SiteFooter from "@/components/SiteFooter";
import EarningsCalculator from "@/components/EarningsCalculator";
import { submitWaitlist, submitSellerApplication, type SellerApplication } from "@/lib/submissions";
import wolfThornsImg from "@/assets/card-wolfthorns.jpg";
import anarchyImg from "@/assets/card-anarchy.jpg";

const waitlistSchema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email address" }).max(255),
});

const sellerSchema = z.object({
  name: z.string().trim().nonempty({ message: "Name is required" }).max(100),
  email: z.string().trim().email({ message: "Enter a valid email address" }).max(255),
  brand: z.string().trim().nonempty({ message: "Brand name is required" }).max(120),
  link: z.string().trim().url({ message: "Enter a valid URL" }).max(300),
  gearType: z.enum(["Streetwear", "Cut & Sew", "Customs", "Vintage"]),
  dropVolume: z.enum(["1-10 pieces", "10-50 pieces", "50+ pieces"]),
});

const gearStyles = ["Streetwear", "Cut & Sew", "Customs", "Vintage"] as const;
const dropVolumes = ["1-10 pieces", "10-50 pieces", "50+ pieces"] as const;

const featuredDrops = [
  {
    title: "WOLF N THORNS",
    tag: "FLAGSHIP DROP",
    image: wolfThornsImg,
    apply: false,
  },
  {
    title: "SOFISTICATED ANARCHY",
    tag: "FEATURED BRAND",
    image: anarchyImg,
    apply: false,
  },
  {
    title: "YOUR BRAND HERE",
    tag: "ACCEPTING APPLICATIONS",
    text: "Reserve your slot for the next drop season.",
    image: null,
    apply: true,
  },
] as const;

const faqItems = [
  {
    q: "How do listing and platform fees work?",
    a: "A flat 3% per sale — that's it. No listing fees, no monthly subscriptions, no per-item charges. List as much as you want, pay nothing until something sells.",
  },
  {
    q: "How are independent brands vetted?",
    a: "Every application is reviewed by a curator focused on authentic streetwear, cut & sew, customs, and archive vintage. We block dropshippers and mass-produced filler to keep the Den curated and culture-first.",
  },
  {
    q: "When do sellers get paid?",
    a: "Direct, next-day payouts to your linked account. No 5–21 day holds, no rolling reserves — your money moves when your drop sells.",
  },
  {
    q: "Can I sell on other platforms simultaneously?",
    a: "Always. The Lone Den is 100% non-exclusive. Run your Shopify, Instagram, or Depop in parallel — we never lock your catalog or your audience behind us.",
  },
];

const comparison = [
  { label: "Seller fees", den: "3% flat", them: "8–13% + payment fees" },
  { label: "Listing cuts", den: "Zero. List free, always.", them: "Per-listing charges" },
  { label: "Payouts", den: "Direct, next-day", them: "Held 5–21 days" },
  { label: "Dropship filler", den: "Banned. Curated only.", them: "Flooded with resell junk" },
  { label: "Creator support", den: "Real humans, real reach", them: "Ticket queues" },
  { label: "Discovery", den: "Editorial drops & capsules", them: "Pay-to-play ads" },
];

export default function Landing() {
  const [email, setEmail] = useState("");
  const [seller, setSeller] = useState({
    name: "",
    email: "",
    brand: "",
    link: "",
    gearType: "Streetwear",
    dropVolume: "1-10 pieces",
  });
  const [busy, setBusy] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const onWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = waitlistSchema.safeParse({ email });
    if (!parsed.success) {
      toast({ title: "Check your email", description: parsed.error.issues[0].message });
      return;
    }
    setBusy(true);
    await submitWaitlist(parsed.data.email);
    setBusy(false);
    setEmail("");
    toast({ title: "YOU'RE ON THE LIST", description: "Welcome to the Den. Watch your inbox for Vol. I." });
  };

  const onSeller = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = sellerSchema.safeParse(seller);
    if (!parsed.success) {
      toast({ title: "Fix the form", description: parsed.error.issues[0].message });
      return;
    }
    setBusy(true);
    await submitSellerApplication(parsed.data as SellerApplication);
    setBusy(false);
    setSeller({ name: "", email: "", brand: "", link: "", gearType: "Streetwear", dropVolume: "1-10 pieces" });
    toast({
      title: "APPLICATION RECEIVED.",
      description: "Welcome to The Lone Den pipeline—we'll reach out shortly.",
    });
  };

  const field =
    "w-full bg-secondary border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 ghost-nav hairline">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="font-display text-xl tracking-[0.32em] hover:text-gold transition-colors">
            THE&nbsp;LONE&nbsp;DEN
          </Link>
          <div className="flex items-center gap-5 md:gap-8">
            <Link
              to="/sell"
              className="font-display text-[11px] tracking-[0.4em] text-foreground/85 hover:text-gold transition-colors"
            >
              SELL GEAR
            </Link>
            <Link
              to="/app"
              className="bg-gold text-primary-foreground font-display text-[11px] tracking-[0.3em] px-4 md:px-6 py-3 hover:bg-foreground transition-colors duration-500"
            >
              EXPLORE LIVE DEMO
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden grain">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(44_65%_52%/0.10),transparent_55%)]" />
        <div className="relative z-10 mx-auto max-w-[1400px] w-full px-6 lg:px-10 pt-32 pb-20">
          <p className="font-display text-[11px] tracking-[0.6em] text-gold mb-6">✦ WAITLIST — VOL. I</p>
          <h1 className="font-display text-[13vw] md:text-[7.5vw] lg:text-[6.5rem] leading-[0.86] tracking-[0.02em] max-w-5xl">
            THE NEW UNDERGROUND MARKETPLACE FOR{" "}
            <span className="text-gradient-gold">INDEPENDENT STREETWEAR.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base md:text-lg text-foreground/75 leading-relaxed">
            Built for creators, collectors, and independent brands who bypass mainstream corporate
            platforms. Lower fees, zero listing cuts, pure street culture.
          </p>

          <form onSubmit={onWaitlist} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl">
            <label htmlFor="waitlist-email" className="sr-only">
              Email address
            </label>
            <input
              id="waitlist-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
              placeholder="you@domain.com"
              className={field}
            />
            <button
              type="submit"
              disabled={busy}
              className="bg-gold text-primary-foreground font-display text-xs tracking-[0.4em] px-8 py-4 hover:bg-foreground transition-colors duration-500 disabled:opacity-60"
            >
              JOIN WAITLIST
            </button>
          </form>

          <div className="mt-6">
            <Link
              to="/app"
              className="group inline-flex items-center gap-3 border border-foreground/30 font-display text-xs tracking-[0.4em] px-8 py-4 hover:border-gold hover:text-gold transition-colors duration-500"
            >
              EXPLORE LIVE DEMO
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* COMPARISON MATRIX */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-24 md:py-32">
          <p className="font-display text-[11px] tracking-[0.5em] text-gold mb-4">✦ THE DIFFERENCE</p>
          <h2 className="font-display text-4xl md:text-6xl tracking-[0.04em] leading-[0.95] mb-12">
            THE LONE DEN <span className="text-foreground/40">VS. THE REST.</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <caption className="sr-only">
                Comparison of THE LONE DEN against Etsy, Depop and Vinted
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="text-left py-5 pr-6 font-display text-[11px] tracking-[0.4em] text-muted-foreground">
                    &nbsp;
                  </th>
                  <th scope="col" className="text-left py-5 px-6 font-display text-sm tracking-[0.3em] text-gold">
                    THE LONE DEN
                  </th>
                  <th scope="col" className="text-left py-5 px-6 font-display text-sm tracking-[0.3em] text-foreground/50">
                    ETSY / DEPOP / VINTED
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-b border-border">
                    <th scope="row" className="text-left py-5 pr-6 font-display text-[11px] tracking-[0.35em] text-muted-foreground align-top">
                      {row.label.toUpperCase()}
                    </th>
                    <td className="py-5 px-6 text-sm text-foreground bg-card/60">{row.den}</td>
                    <td className="py-5 px-6 text-sm text-muted-foreground">{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <EarningsCalculator />

      {/* FEATURED DEN DROPS */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-24 md:py-32">
          <p className="font-display text-[11px] tracking-[0.5em] text-gold mb-4">✦ FEATURED DROPS</p>
          <h2 className="font-display text-4xl md:text-6xl tracking-[0.04em] leading-[0.95] mb-12">
            CURATED CAPSULES.
          </h2>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {featuredDrops.map((drop) => (
              <article key={drop.title} className="group relative bg-background flex flex-col">
                {drop.image ? (
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={drop.image}
                      alt={drop.title}
                      loading="lazy"
                      className="h-full w-full object-cover grayscale-[0.15] transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  </div>
                ) : (
                  <div className="relative aspect-[4/5] flex items-center justify-center border-b border-border">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,hsl(44_65%_52%/0.10),transparent_60%)]" />
                    <span className="relative font-display text-[10px] tracking-[0.5em] text-muted-foreground/60">
                      EMPTY SLOT
                    </span>
                  </div>
                )}

                <div className="flex flex-1 flex-col p-7">
                  <span className="font-display text-[10px] tracking-[0.4em] text-gold mb-3">
                    {drop.tag}
                  </span>
                  <h3 className="font-display text-2xl tracking-[0.06em] mb-3">{drop.title}</h3>
                  {drop.text && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{drop.text}</p>
                  )}
                  <div className="mt-auto">
                    {drop.apply ? (
                      <a
                        href="#apply"
                        className="inline-flex items-center gap-3 border border-foreground/30 font-display text-[11px] tracking-[0.4em] px-6 py-4 hover:border-gold hover:text-gold transition-colors duration-500"
                      >
                        APPLY NOW
                        <span className="transition-transform group-hover:translate-y-1">↓</span>
                      </a>
                    ) : (
                      <Link
                        to="/app"
                        className="inline-flex items-center gap-3 border border-foreground/30 font-display text-[11px] tracking-[0.4em] px-6 py-4 hover:border-gold hover:text-gold transition-colors duration-500"
                      >
                        PREVIEW DROP
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SELLER APPLICATION */}
      <section id="apply" className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-24 md:py-32 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="font-display text-[11px] tracking-[0.5em] text-gold mb-4">✦ APPLY TO SELL</p>
            <h2 className="font-display text-4xl md:text-6xl tracking-[0.04em] leading-[0.95]">
              INDEPENDENT
              <br />
              <span className="text-foreground/40">CREATORS ONLY.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm text-muted-foreground leading-relaxed">
              Cut & sew, customs, archive vintage, original streetwear. Every application passes a
              curator — no dropshippers, no filler.
            </p>
          </div>

          <form onSubmit={onSeller} className="md:col-span-7 grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-1">
              <label htmlFor="s-name" className="block font-display text-[10px] tracking-[0.4em] text-muted-foreground mb-2">
                FULL NAME
              </label>
              <input
                id="s-name"
                value={seller.name}
                maxLength={100}
                onChange={(e) => setSeller({ ...seller, name: e.target.value })}
                className={field}
              />
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="s-brand" className="block font-display text-[10px] tracking-[0.4em] text-muted-foreground mb-2">
                BRAND / CREATOR NAME
              </label>
              <input
                id="s-brand"
                value={seller.brand}
                maxLength={120}
                onChange={(e) => setSeller({ ...seller, brand: e.target.value })}
                className={field}
              />
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="s-email" className="block font-display text-[10px] tracking-[0.4em] text-muted-foreground mb-2">
                EMAIL ADDRESS
              </label>
              <input
                id="s-email"
                type="email"
                value={seller.email}
                maxLength={255}
                onChange={(e) => setSeller({ ...seller, email: e.target.value })}
                className={field}
              />
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="s-link" className="block font-display text-[10px] tracking-[0.4em] text-muted-foreground mb-2">
                INSTAGRAM / TIKTOK / PORTFOLIO LINK
              </label>
              <input
                id="s-link"
                value={seller.link}
                maxLength={300}
                placeholder="https://"
                onChange={(e) => setSeller({ ...seller, link: e.target.value })}
                className={field}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="s-volume" className="block font-display text-[10px] tracking-[0.4em] text-muted-foreground mb-2">
                MONTHLY DROP VOLUME
              </label>
              <select
                id="s-volume"
                value={seller.dropVolume}
                onChange={(e) => setSeller({ ...seller, dropVolume: e.target.value })}
                className={field}
              >
                {dropVolumes.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <span className="block font-display text-[10px] tracking-[0.4em] text-muted-foreground mb-2">
                PRIMARY GEAR STYLE
              </span>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Primary gear style">
                {gearStyles.map((style) => {
                  const active = seller.gearType === style;
                  return (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setSeller({ ...seller, gearType: style })}
                      aria-pressed={active}
                      className={`font-display text-[11px] tracking-[0.3em] px-5 py-3 border transition-colors duration-300 ${
                        active
                          ? "bg-gold text-primary-foreground border-gold"
                          : "border-border text-muted-foreground hover:border-gold hover:text-gold"
                      }`}
                    >
                      {style.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={busy}
                className="w-full bg-gold text-primary-foreground font-display text-xs tracking-[0.4em] px-10 py-4 hover:bg-foreground transition-colors duration-500 disabled:opacity-60"
              >
                SUBMIT SELLER APPLICATION
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* CREATOR FAQ */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-24 md:py-32">
          <p className="font-display text-[11px] tracking-[0.5em] text-gold mb-4">✦ PLATFORM INFO</p>
          <h2 className="font-display text-4xl md:text-6xl tracking-[0.04em] leading-[0.95] mb-12">
            FREQUENTLY ASKED QUESTIONS.
          </h2>

          <div className="divide-y divide-border border-y border-border">
            {faqItems.map((item, idx) => {
              const open = openFaq === idx;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : idx)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-6 py-7 text-left"
                  >
                    <span className="font-display text-base md:text-lg tracking-[0.04em]">
                      {item.q}
                    </span>
                    <span
                      className={`font-display text-lg text-gold transition-transform duration-500 ${
                        open ? "rotate-45" : "rotate-0"
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      open ? "grid-rows-[1fr] opacity-100 pb-7" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl text-sm text-muted-foreground leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
