import { useState } from "react";
import GhostHeader from "@/components/GhostHeader";
import SiteFooter from "@/components/SiteFooter";
import { categories } from "@/data/collections";

export default function Sell() {
  const [images, setImages] = useState<(string | null)[]>(Array(8).fill(null));
  const [video, setVideo] = useState<string | null>(null);

  const handleImage = (idx: number, file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImages((prev) => prev.map((v, i) => (i === idx ? url : v)));
  };

  const handleVideo = (file: File | undefined) => {
    if (!file) return;
    setVideo(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GhostHeader />

      <section className="pt-32 pb-10 border-b border-border">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <p className="font-display text-[11px] tracking-[0.5em] text-gold mb-4">
            ✦ SELLER DASHBOARD
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-[0.04em] leading-none">
            LIST A PIECE
          </h1>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground">
            Eight photos. One video. Zero stock-photo nonsense. The Den is curated —
            give it the real garment.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 lg:px-10 py-12 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
        {/* Media — 8 images + 1 video */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="font-display text-[11px] tracking-[0.5em] text-gold">MEDIA · 8 + 1</p>
            <p className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">
              {images.filter(Boolean).length}/8 IMAGES · {video ? "1/1" : "0/1"} VIDEO
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {images.map((src, i) => (
              <label
                key={i}
                className="relative aspect-square bg-card cursor-pointer group overflow-hidden"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => handleImage(i, e.target.files?.[0])}
                />
                {src ? (
                  <img src={src} alt={`Upload ${i + 1}`} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground group-hover:text-gold transition-colors">
                    <span className="font-display text-2xl">+</span>
                    <span className="font-display text-[10px] tracking-[0.4em]">
                      IMG {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                )}
                {i === 0 && (
                  <span className="absolute top-2 left-2 font-display text-[9px] tracking-[0.4em] text-gold border border-gold/60 px-2 py-0.5">
                    HERO
                  </span>
                )}
              </label>
            ))}
          </div>

          <label className="mt-px block relative aspect-[16/9] bg-card cursor-pointer group overflow-hidden hairline">
            <input
              type="file"
              accept="video/*"
              className="sr-only"
              onChange={(e) => handleVideo(e.target.files?.[0])}
            />
            {video ? (
              <video src={video} className="absolute inset-0 h-full w-full object-cover" muted controls />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground group-hover:text-gold transition-colors">
                <span className="font-display text-3xl">▶</span>
                <span className="font-display text-[10px] tracking-[0.4em]">UPLOAD MOTION · 1 VIDEO</span>
              </div>
            )}
          </label>
        </div>

        {/* Side: details */}
        <aside className="space-y-8">
          <div>
            <label className="block font-display text-[10px] tracking-[0.5em] text-gold mb-3">TITLE</label>
            <input
              className="w-full bg-card border border-border px-4 py-3 font-display tracking-[0.1em] text-foreground focus:outline-none focus:border-gold"
              placeholder="e.g. WOLF N THORNS — NAVY BOMBER"
            />
          </div>

          <div>
            <label className="block font-display text-[10px] tracking-[0.5em] text-gold mb-3">CATEGORY</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="font-display text-[10px] tracking-[0.3em] px-3 py-2 border border-border text-foreground/80 hover:border-gold hover:text-gold transition-colors"
                >
                  {c.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-display text-[10px] tracking-[0.5em] text-gold mb-3">PRICE</label>
              <input
                type="number"
                className="w-full bg-card border border-border px-4 py-3 font-display tracking-[0.1em] focus:outline-none focus:border-gold"
                placeholder="USD"
              />
            </div>
            <div>
              <label className="block font-display text-[10px] tracking-[0.5em] text-gold mb-3">SIZE</label>
              <input
                className="w-full bg-card border border-border px-4 py-3 font-display tracking-[0.1em] focus:outline-none focus:border-gold"
                placeholder="M / L / XL"
              />
            </div>
          </div>

          <div>
            <label className="block font-display text-[10px] tracking-[0.5em] text-gold mb-3">DETAILS</label>
            <textarea
              rows={5}
              className="w-full bg-card border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold"
              placeholder="Tell the Den about this piece. Materials, history, fit."
            />
          </div>

          <button className="w-full bg-gold text-primary-foreground font-display tracking-[0.4em] text-xs py-4 hover:bg-foreground transition-colors">
            PUBLISH LISTING
          </button>
          <p className="text-[11px] tracking-[0.3em] font-display text-muted-foreground text-center">
            DASHBOARD PREVIEW · BACKEND COMING SOON
          </p>
        </aside>
      </section>

      <SiteFooter />
    </div>
  );
}