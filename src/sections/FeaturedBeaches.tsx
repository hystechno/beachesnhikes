import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { beaches } from "../data";
import type { Beach } from "../data";
import { BeachCard, BeachPanel } from "../components/BeachComponents";
import { analytics } from "../hooks/useAnalytics";

gsap.registerPlugin(ScrollTrigger);

const featuredBeachIds = ["waikiki", "lanikai", "hanauma-bay", "sunset-beach"];

export default function FeaturedBeaches() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeBeach, setActiveBeach] = useState<Beach | null>(null);

  const featured = featuredBeachIds.map((id) => beaches.find((b) => b.id === id)).filter(Boolean) as Beach[];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-beach-card",
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
    <section id="beaches" ref={sectionRef} className="bg-sand" style={{ padding: "100px clamp(24px, 4vw, 64px)" }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="font-body text-[12px] tracking-[0.15em] uppercase text-ocean font-medium">27 Beaches</span>
            <h2 className="font-display text-[42px] md:text-[56px] text-deep-forest leading-[1.05] tracking-[-0.5px] mt-2">
              Beaches
            </h2>
            <p className="font-body text-[17px] text-stone leading-[1.6] mt-2 max-w-[500px]">
              From world-famous Waikiki to hidden coves. Every shore has its own character.
            </p>
          </div>
        </div>

        {/* Featured 4 beaches */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {featured.map((beach) => (
            <div key={beach.id} className="featured-beach-card">
              <BeachCard
                beach={beach}
                onClick={(b) => {
                  analytics.beachClick(b.name, b.crowdLabel, b.region);
                  setActiveBeach(b);
                }}
              />
            </div>
          ))}
        </div>

        {/* Link to full page */}
        <div className="mt-10 text-center">
          <Link
            to="/beaches"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-deep-forest/30 text-deep-forest font-body text-[15px] hover:bg-deep-forest hover:text-sand transition-all duration-300"
            onClick={() => analytics.ctaClick("view_all_beaches", "home_beaches_section")}
          >
            View All 27 Beaches &rarr;
          </Link>
        </div>
      </div>
      {activeBeach && <BeachPanel beach={activeBeach} onClose={() => setActiveBeach(null)} />}
    </section>
  );
}
