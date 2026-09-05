import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import SiteFooter from "@/components/SiteFooter";
import EarningsCalculator from "@/components/EarningsCalculator";
import { submitWaitlist, submitSellerApplication, type SellerApplication } from "@/lib/submissions";

const waitlistSchema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email address" }).max(255),
});

const sellerSchema = z.object({
  name: z.string().trim().nonempty({ message: "Name is required" }).max(100),
  email: z.string().trim().email({ message: "Enter a valid email address" }).max(255),
  brand: z.string().trim().nonempty({ message: "Brand name is required" }).max(120),
  link: z.string().trim().url({ message: "Enter a valid URL" }).max(300),
  gearType: z.enum(["Streetwear", "Cut & Sew", "Customs", "Vintage"]),
});

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
  });
  const [busy, setBusy] = useState(false);

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
    setSeller({ name: "", email: "", brand: "", link: "", gearType: "Streetwear" });
    toast({ title: "APPLICATION RECEIVED", description: "A curator will review your work and reach out." });
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
                NAME
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
              <label htmlFor="s-email" className="block font-display text-[10px] tracking-[0.4em] text-muted-foreground mb-2">
                EMAIL
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
              <label htmlFor="s-brand" className="block font-display text-[10px] tracking-[0.4em] text-muted-foreground mb-2">
                BRAND NAME
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
              <label htmlFor="s-link" className="block font-display text-[10px] tracking-[0.4em] text-muted-foreground mb-2">
                SOCIAL / PORTFOLIO LINK
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
              <label htmlFor="s-gear" className="block font-display text-[10px] tracking-[0.4em] text-muted-foreground mb-2">
                GEAR TYPE
              </label>
              <select
                id="s-gear"
                value={seller.gearType}
                onChange={(e) => setSeller({ ...seller, gearType: e.target.value })}
                className={field}
              >
                <option>Streetwear</option>
                <option>Cut &amp; Sew</option>
                <option>Customs</option>
                <option>Vintage</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={busy}
                className="w-full sm:w-auto bg-gold text-primary-foreground font-display text-xs tracking-[0.4em] px-10 py-4 hover:bg-foreground transition-colors duration-500 disabled:opacity-60"
              >
                SUBMIT APPLICATION
              </button>
            </div>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
