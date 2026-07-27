import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trails } from "../data";
import type { Trail } from "../data";
import { TrailCard, TrailPanel } from "../components/TrailComponents";
import { analytics } from "../hooks/useAnalytics";

gsap.registerPlugin(ScrollTrigger);

const featuredTrailIds = ["diamond-head", "lanikai-pillbox", "koko-head", "manoa-falls"];

export default function FeaturedTrails() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTrail, setActiveTrail] = useState<Trail | null>(null);

  const featured = featuredTrailIds.map((id) => trails.find((t) => t.id === id)).filter(Boolean) as Trail[];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-trail-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="trails" ref={sectionRef} className="bg-warm-white" style={{ padding: "100px clamp(24px, 4vw, 64px)" }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="font-body text-[12px] tracking-[0.15em] uppercase text-ocean font-medium">35 Trails</span>
            <h2 className="font-display text-[42px] md:text-[56px] text-deep-forest leading-[1.05] tracking-[-0.5px] mt-2">
              Hiking Trails
            </h2>
            <p className="font-body text-[17px] text-stone leading-[1.6] mt-2 max-w-[500px]">
              From iconic summits to hidden ridgeline vistas. Every trail rewards the effort.
            </p>
          </div>
        </div>

        {/* Featured 4 trails */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {featured.map((trail) => (
            <div key={trail.id} className="featured-trail-card">
              <TrailCard
                trail={trail}
                onClick={(t) => {
                  analytics.trailClick(t.name, t.difficulty, t.region);
                  setActiveTrail(t);
                }}
              />
            </div>
          ))}
        </div>

        {/* Link to full page */}
        <div className="mt-10 text-center">
          <Link
            to="/trails"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-deep-forest/30 text-deep-forest font-body text-[15px] hover:bg-deep-forest hover:text-sand transition-all duration-300"
            onClick={() => analytics.ctaClick("view_all_trails", "home_trails_section")}
          >
            View All 35 Trails &rarr;
          </Link>
        </div>
      </div>
      {activeTrail && <TrailPanel trail={activeTrail} onClose={() => setActiveTrail(null)} />}
    </section>
  );
}
