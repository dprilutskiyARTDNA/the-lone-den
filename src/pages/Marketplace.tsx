import { useMemo, useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import GhostHeader from "@/components/GhostHeader";
import SiteFooter from "@/components/SiteFooter";
import { collections, categories } from "@/data/collections";

export default function Marketplace() {
  const [params, setParams] = useSearchParams();
  const initial = params.get("c");
  const [active, setActive] = useState<string | null>(initial);
  const [sort, setSort] = useState<"feature" | "az" | "za">("feature");

  useEffect(() => {
    if (active) setParams({ c: active }, { replace: true });
    else setParams({}, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const filtered = useMemo(() => {
    let list = active ? collections.filter((c) => c.category === active) : collections;
    if (sort === "az") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "za") list = [...list].sort((a, b) => b.title.localeCompare(a.title));
    return list;
  }, [active, sort]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of categories) map[c] = collections.filter((x) => x.category === c).length;
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GhostHeader />

      {/* Page intro */}
      <section className="pt-32 pb-10 border-b border-border">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <p className="font-display text-[11px] tracking-[0.5em] text-gold mb-4">
            ✦ THE SHOP
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h1 className="font-display text-5xl md:text-7xl tracking-[0.04em] leading-none">
              MARKETPLACE
            </h1>
            <p className="text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"} · vetted by the Den
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 lg:px-10 py-12 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
        {/* Sidebar filters */}
        <aside className="lg:sticky lg:top-24 self-start space-y-10">
          <div>
            <p className="font-display text-[10px] tracking-[0.5em] text-gold mb-5">CATEGORY</p>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setActive(null)}
                  className={`w-full text-left flex items-center justify-between py-2 font-display tracking-[0.2em] text-sm transition-colors ${
                    !active ? "text-gold" : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  <span>ALL</span>
                  <span className="text-xs text-muted-foreground">{collections.length}</span>
                </button>
              </li>
              {categories.map((cat) => {
                const isActive = active === cat;
                return (
                  <li key={cat}>
                    <button
                      onClick={() => setActive(cat)}
                      className={`w-full text-left flex items-center justify-between py-2 font-display tracking-[0.2em] text-sm transition-colors ${
                        isActive ? "text-gold" : "text-foreground/80 hover:text-foreground"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`h-px w-4 transition-all ${
                            isActive ? "bg-gold w-8" : "bg-border"
                          }`}
                        />
                        {cat.toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">{counts[cat] ?? 0}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="font-display text-[10px] tracking-[0.5em] text-gold mb-5">SORT</p>
            <div className="space-y-1">
              {[
                { id: "feature", label: "FEATURED" },
                { id: "az", label: "A → Z" },
                { id: "za", label: "Z → A" },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSort(s.id as typeof sort)}
                  className={`block w-full text-left py-2 font-display tracking-[0.2em] text-sm ${
                    sort === s.id ? "text-gold" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border border-border p-5">
            <p className="font-display text-[10px] tracking-[0.4em] text-gold mb-2">SELLERS</p>
            <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
              List your archive. 8 photos + 1 video per piece.
            </p>
            <Link
              to="/sell"
              className="inline-flex items-center gap-2 font-display text-[11px] tracking-[0.4em] text-foreground hover:text-gold"
            >
              OPEN DASHBOARD →
            </Link>
          </div>
        </aside>

        {/* 4-column responsive grid */}
        <div>
          {filtered.length === 0 ? (
            <div className="border border-border py-32 text-center">
              <p className="font-display tracking-[0.3em] text-muted-foreground">
                NO PIECES IN THIS DRAWER YET.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-border">
              {filtered.map((c) => (
                <Link
                  key={c.id}
                  to={`/marketplace?c=${encodeURIComponent(c.category)}`}
                  className="group relative block bg-card overflow-hidden"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={c.image}
                      alt={`${c.title} — ${c.subtitle}`}
                      width={1024}
                      height={1536}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 veil-bottom pointer-events-none" />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="font-display text-[10px] tracking-[0.4em] text-foreground/80">
                        {c.category.toUpperCase()}
                      </span>
                      {c.flag && (
                        <span className="font-display text-[10px] tracking-[0.4em] text-gold">
                          {c.flag}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-5 flex items-start justify-between gap-4 border-t border-border">
                    <div className={c.inverted ? "upside-down" : undefined}>
                      <p className="font-display text-[10px] tracking-[0.4em] text-gold">
                        {c.subtitle}
                      </p>
                      <h3 className="font-display text-lg tracking-[0.08em] mt-1">{c.title}</h3>
                    </div>
                    <span className="font-display text-[10px] tracking-[0.4em] text-foreground/60 group-hover:text-gold transition-colors">
                      VIEW →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}