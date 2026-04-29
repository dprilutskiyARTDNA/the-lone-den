import { Link } from "react-router-dom";
import GhostHeader from "@/components/GhostHeader";
import SiteFooter from "@/components/SiteFooter";
import CollectionCard from "@/components/CollectionCard";
import Marquee from "@/components/Marquee";
import { collections } from "@/data/collections";
import heroImg from "@/assets/card-lonecrest.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <GhostHeader />

      {/* HERO */}
      <section className="relative min-h-[100svh] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="THE LONE DEN — house bomber in matte black with liquid gold crest"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 veil-bottom" />

        <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-10 pt-40 md:pt-56 pb-24">
          <p className="font-display text-[11px] tracking-[0.6em] text-gold mb-6 animate-den-rise">
            ✦ MARKETPLACE — VOL. I
          </p>
          <h1 className="font-display text-[16vw] md:text-[10vw] lg:text-[9rem] leading-[0.85] tracking-[0.02em] text-foreground animate-den-rise [animation-delay:120ms]">
            UNCOMMON
            <br />
            <span className="text-gradient-gold">STREETWEAR.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base md:text-lg text-foreground/80 leading-relaxed animate-den-rise [animation-delay:240ms]">
            Twelve living collections. Vetted sellers. Zero filler. Step into the Den —
            where every garment earned its hanger.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 animate-den-rise [animation-delay:360ms]">
            <Link
              to="/marketplace"
              className="group inline-flex items-center gap-3 bg-gold text-primary-foreground font-display text-xs tracking-[0.4em] px-8 py-4 hover:bg-foreground transition-colors duration-500"
            >
              ENTER THE SHOP
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/sell"
              className="inline-flex items-center gap-3 border border-foreground/30 text-foreground font-display text-xs tracking-[0.4em] px-8 py-4 hover:border-gold hover:text-gold transition-colors duration-500"
            >
              LIST A PIECE
            </Link>
          </div>
        </div>

        {/* Hero side meta */}
        <div className="hidden lg:flex absolute right-10 bottom-10 z-10 flex-col items-end gap-2">
          <span className="font-display text-[10px] tracking-[0.5em] text-foreground/60">EST.</span>
          <span className="font-display text-5xl text-gold">MMXXVI</span>
          <span className="font-display text-[10px] tracking-[0.5em] text-foreground/60">THE LONE DEN</span>
        </div>
      </section>

      <Marquee />

      {/* COLLECTION ENTRYWAY */}
      <section className="relative bg-background">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10 pt-24 md:pt-32 pb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="font-display text-[11px] tracking-[0.5em] text-gold mb-4">
                ✦ THE COLLECTION ENTRYWAY
              </p>
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.04em] leading-[0.9]">
                TWELVE DOORS.
                <br />
                <span className="text-foreground/40">ONE DEN.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              Each card opens into a vetted drop. No two doors lead to the same place —
              and none of them are quiet.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-[1600px] px-6 lg:px-10 pb-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-border">
            {collections.map((c, i) => (
              <CollectionCard key={c.id} item={c} priority={i < 4} />
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="relative bg-background border-t border-border">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10 py-32 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="font-display text-[11px] tracking-[0.5em] text-gold">
              ✦ HOUSE CODE
            </p>
          </div>
          <div className="md:col-span-8">
            <p className="font-display text-3xl md:text-5xl leading-[1.1] tracking-[0.01em]">
              We don't do <span className="text-gold">trends</span>. We don't do
              <span className="text-gold"> filler</span>. We do garments that walk into a
              room and refuse to leave quietly.
            </p>
            <p className="mt-8 max-w-2xl text-base text-muted-foreground leading-relaxed">
              THE LONE DEN is a marketplace for the people who already know what they want —
              and a discovery engine for the rest. Every listing passes a curator. Every
              seller passes a vibe check.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;
