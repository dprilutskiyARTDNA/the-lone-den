import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl tracking-[0.18em] text-foreground">
            THE&nbsp;LONE&nbsp;DEN
          </p>
          <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
            A curated marketplace for archive-grade streetwear. We do not stock filler.
            Every collection is hand-selected, every seller is vetted.
          </p>
        </div>
        <div>
          <p className="font-display text-[11px] tracking-[0.4em] text-gold mb-4">SHOP</p>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li><Link to="/marketplace" className="hover:text-gold">All</Link></li>
            <li><Link to="/marketplace?c=Hoodies" className="hover:text-gold">Hoodies</Link></li>
            <li><Link to="/marketplace?c=Jackets" className="hover:text-gold">Jackets</Link></li>
            <li><Link to="/marketplace?c=Tees" className="hover:text-gold">Tees</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-display text-[11px] tracking-[0.4em] text-gold mb-4">DEN</p>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li><Link to="/sell" className="hover:text-gold">Sell on the Den</Link></li>
            <li><Link to="/account" className="hover:text-gold">Account</Link></li>
            <li><a href="#" className="hover:text-gold">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs tracking-[0.3em] font-display text-muted-foreground">
            © {new Date().getFullYear()} THE LONE DEN. ALL RIGHTS RESERVED.
          </p>
          <p className="text-xs tracking-[0.3em] font-display text-muted-foreground">
            MATTE BLACK · LIQUID GOLD
          </p>
        </div>
      </div>
    </footer>
  );
}