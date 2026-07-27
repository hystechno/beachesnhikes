import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { regions } from "../data";
import type { Region } from "../data";
import { X } from "lucide-react";
import { analytics } from "../hooks/useAnalytics";

gsap.registerPlugin(ScrollTrigger);

function RegionModal({ region, onClose }: { region: Region; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-warm-white rounded-2xl max-w-[800px] w-full max-h-[85vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()} style={{ animation: "modalIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-warm-white flex items-center justify-center text-deep-forest hover:bg-deep-forest hover:text-sand transition-colors shadow-md"><X size={20} /></button>
        <div className="h-[200px] overflow-hidden rounded-t-2xl"><img src={region.image} alt={region.name} className="w-full h-full object-cover" /></div>
        <div className="p-8">
          <h2 className="font-display text-[42px] text-deep-forest">{region.name}</h2>
          <p className="font-body text-[14px] tracking-[0.12em] uppercase text-stone mt-1">{region.tagline}</p>
          <p className="font-body text-[16px] text-deep-forest/70 mt-3">{region.description}</p>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="font-display text-[28px] text-deep-forest mb-4">Trails <span className="font-body text-[14px] text-stone">({region.trails.length})</span></h3>
              {region.trails.map((t) => (
                <div key={t.name} className="mb-4 pb-4 border-b border-deep-forest/10">
                  <div className="flex items-center gap-2">
                    <h4 className="font-display text-[18px] text-deep-forest">{t.name}</h4>
                    <span className={`text-[10px] font-body tracking-wider uppercase px-1.5 py-0.5 rounded-full text-white ${t.difficulty === "Easy" ? "bg-trail-green" : t.difficulty === "Moderate" ? "bg-amber-600" : "bg-red-700"}`}>{t.difficulty}</span>
                  </div>
                  <p className="font-body text-[12px] text-stone mt-0.5">{t.distance}</p>
                  <p className="font-body text-[14px] text-deep-forest/70 mt-1">{t.description}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-display text-[28px] text-deep-forest mb-4">Beaches <span className="font-body text-[14px] text-stone">({region.beaches.length})</span></h3>
              {region.beaches.length > 0 ? region.beaches.map((b) => (
                <div key={b.name} className="mb-4 pb-4 border-b border-deep-forest/10">
                  <h4 className="font-display text-[18px] text-deep-forest">{b.name}</h4>
                  <p className="font-body text-[14px] text-deep-forest/70 mt-1">{b.description}</p>
                </div>
              )) : <p className="font-body text-[15px] text-stone italic">This region is primarily inland with no major beaches.</p>}
            </div>
          </div>
          <div className="mt-4 p-4 bg-sand rounded-lg"><p className="font-body text-[14px] text-deep-forest">{region.keySeason}</p></div>
        </div>
      </div>
    </div>
  );
}

export default function Regions() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeRegion, setActiveRegion] = useState<Region | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".region-card", { y: 40, opacity: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="regions" ref={sectionRef} className="bg-sand" style={{ padding: "120px clamp(24px, 4vw, 64px)" }}>
        <div className="max-w-[1400px] mx-auto">
          <span className="font-body text-[12px] tracking-[0.15em] uppercase text-ocean font-medium">Explore by Area</span>
          <h2 className="font-display text-[48px] md:text-[64px] text-deep-forest leading-[1.05] tracking-[-0.5px] mt-2">Five Regions</h2>
          <p className="font-body text-[18px] text-stone leading-[1.6] mt-3 max-w-[600px]">Every corner of Oahu offers something different — from the beginner surf of Waikiki to the big-wave breaks of the North Shore.</p>

          <div className="flex gap-5 mt-10 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {regions.map((r) => (
              <button key={r.id} className="region-card relative flex-shrink-0 w-[240px] h-[340px] rounded-xl overflow-hidden text-left group snap-start" onClick={() => { analytics.regionView(r.name); setActiveRegion(r); }}>
                <img src={r.image} alt={r.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.03]" loading="lazy" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.6) 100%)" }} />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="font-display text-[32px] text-warm-white leading-tight">{r.name}</h3>
                  <p className="font-body text-[12px] tracking-[0.12em] uppercase text-warm-white/70 mt-1">{r.tagline}</p>
                  <div className="flex gap-3 mt-3">
                    <span className="text-[11px] font-body text-warm-white/60">{r.trails.length} trails</span>
                    <span className="text-[11px] font-body text-warm-white/60">{r.beaches.length} beaches</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      {activeRegion && <RegionModal region={activeRegion} onClose={() => setActiveRegion(null)} />}
    </>
  );
}
