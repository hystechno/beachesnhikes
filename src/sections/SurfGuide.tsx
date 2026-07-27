import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { summerSurfSpots, winterSurfSpots } from "../data";
import type { SurfSpot } from "../data";
import { Waves } from "lucide-react";
import { analytics } from "../hooks/useAnalytics";

gsap.registerPlugin(ScrollTrigger);

function getSkillColor(level: string) {
  if (level === "Beginner") return "bg-trail-green";
  if (level === "Intermediate") return "bg-amber-600";
  return "bg-red-700";
}

function WaveBar({ height, max = 30 }: { height: number; max?: number }) {
  const pct = Math.min((height / max) * 100, 100);
  const color = height <= 3 ? "#4a7c59" : height <= 8 ? "#d97706" : "#b91c1c";
  return <div className="w-full h-2 bg-deep-forest/10 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} /></div>;
}

function SurfCard({ spot }: { spot: SurfSpot }) {
  return (
    <div className="bg-sand rounded-xl p-5 group hover:bg-deep-forest transition-all duration-400">
      <WaveBar height={spot.waveHeight} />
      <p className="font-body text-[11px] text-stone mt-1.5 group-hover:text-sand/60 uppercase tracking-wider">Typical: {spot.waveLabel}</p>
      <h3 className="font-display text-[24px] text-deep-forest mt-2 group-hover:text-sand leading-tight">{spot.name}</h3>
      <span className={`inline-block mt-1.5 text-[10px] font-body tracking-wider uppercase px-2 py-0.5 rounded-full text-white ${getSkillColor(spot.skillLevel)}`}>{spot.skillLevel}</span>
      <p className="font-body text-[15px] text-deep-forest/75 mt-2 line-clamp-2 leading-relaxed group-hover:text-sand/80">{spot.description}</p>
      <p className="font-body text-[11px] text-stone mt-2 uppercase tracking-wider group-hover:text-sand/50">{spot.bestSeason}</p>
    </div>
  );
}

export default function SurfGuide() {
  const sectionRef = useRef<HTMLElement>(null);
  const [season, setSeason] = useState<"summer" | "winter">("summer");
  const spots = season === "summer" ? summerSurfSpots : winterSurfSpots;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".surf-card", { y: 30, opacity: 0, stagger: 0.06, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [season]);

  return (
    <section id="surf" ref={sectionRef} className="bg-warm-white" style={{ padding: "120px clamp(24px, 4vw, 64px)" }}>
      <div className="max-w-[1400px] mx-auto">
        <span className="font-body text-[12px] tracking-[0.15em] uppercase text-ocean font-medium flex items-center gap-1.5"><Waves size={13} /> 16 Surf Spots</span>
        <h2 className="font-display text-[48px] md:text-[64px] text-deep-forest leading-[1.05] tracking-[-0.5px] mt-2">Surf Guide</h2>
        <p className="font-body text-[18px] text-stone leading-[1.6] mt-3 max-w-[600px]">Gentle Waikiki rollers to thundering Pipeline barrels. Know where to go, know when to go.</p>

        <div className="flex gap-2 mt-8">
          <button onClick={() => { analytics.surfSeasonToggle("summer"); setSeason("summer"); }} className={`px-5 py-2.5 rounded-full font-body text-[13px] transition-all duration-300 ${season === "summer" ? "bg-deep-forest text-sand" : "border border-deep-forest/20 text-deep-forest hover:bg-deep-forest/5"}`}>
            Summer (May-Sep)
          </button>
          <button onClick={() => { analytics.surfSeasonToggle("winter"); setSeason("winter"); }} className={`px-5 py-2.5 rounded-full font-body text-[13px] transition-all duration-300 ${season === "winter" ? "bg-deep-forest text-sand" : "border border-deep-forest/20 text-deep-forest hover:bg-deep-forest/5"}`}>
            Winter (Nov-Feb)
          </button>
        </div>
        <p className="font-body text-[14px] text-stone mt-3">{season === "summer" ? "Calm North Shore, small South Shore surf. Best for beginners and swimming." : "Massive North Shore waves, flat South Shore. Watch the pros at Pipeline and Sunset."}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {spots.map((spot) => <div key={spot.id} className="surf-card"><SurfCard spot={spot} /></div>)}
        </div>
      </div>
    </section>
  );
}
