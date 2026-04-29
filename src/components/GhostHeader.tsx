import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const navItems = [
  { label: "THE SHOP", to: "/marketplace" },
  { label: "SELL", to: "/sell" },
  { label: "ACCOUNT", to: "/account" },
];

export default function GhostHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "ghost-nav hairline" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-xl tracking-[0.32em] text-foreground hover:text-gold transition-colors"
          aria-label="THE LONE DEN — Home"
        >
          THE&nbsp;LONE&nbsp;DEN
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const active = pathname === item.to;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={`font-display text-[11px] tracking-[0.4em] transition-colors relative ${
                  active ? "text-gold" : "text-foreground/85 hover:text-gold"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-gold transition-all duration-500 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </NavLink>
            );
          })}
        </nav>

        <button
          className="md:hidden font-display text-[11px] tracking-[0.4em] text-foreground/85 hover:text-gold"
          onClick={() => {
            const el = document.getElementById("mobile-nav");
            el?.classList.toggle("hidden");
          }}
          aria-label="Open menu"
        >
          MENU
        </button>
      </div>

      <div id="mobile-nav" className="hidden md:hidden ghost-nav border-t border-border">
        <div className="px-6 py-6 flex flex-col gap-5">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className="font-display text-sm tracking-[0.4em] text-foreground hover:text-gold"
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}