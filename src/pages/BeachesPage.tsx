import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { beaches } from "../data";
import type { Beach } from "../data";
import { BeachCard, BeachPanel } from "../components/BeachComponents";
import { analytics } from "../hooks/useAnalytics";

gsap.registerPlugin(ScrollTrigger);

const filters = ["All", "Swimming", "Snorkeling", "Surfing", "Family", "Secluded"];

export default function BeachesPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeBeach, setActiveBeach] = useState<Beach | null>(null);

  const filtered = activeFilter === "All"
    ? beaches
    : beaches.filter((b) => {
        if (activeFilter === "Swimming") return b.activities.includes("Swimming");
        if (activeFilter === "Snorkeling") return b.activities.includes("Snorkeling");
        if (activeFilter === "Surfing") return b.activities.includes("Surfing") || b.surf;
        if (activeFilter === "Family") return b.facilities.some((f) => f.name === "Lifeguards" && f.available);
        if (activeFilter === "Secluded") return b.crowdLevel <= 2;
        return true;
      });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".beach-card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.5, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 95%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [activeFilter]);

  const handleFilter = (f: string) => {
    setActiveFilter(f);
    if (f !== "All") analytics.filterUse("beach_activity", f, "beaches_page");
  };

  return (
    <div className="min-h-screen bg-sand">
      <Helmet>
        <title>27 Beaches on Oahu | Swimming, Snorkeling & Surf | Beaches & Hikes</title>
        <meta name="description" content="Explore 27 beaches across Oahu — from world-famous Waikiki to hidden coves. Filter by activity, crowd level, and facilities. Real photos and surf reports." />
        <meta property="og:title" content="27 Beaches on Oahu | Beaches & Hikes" />
        <meta property="og:description" content="From Waikiki to secret coves — find your perfect beach with crowd levels, activities, and real photos." />
        <meta property="og:image" content="https://www.beachesnhikes.com/images/hero-poster.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.beachesnhikes.com/beaches" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Page Header */}
      <div className="bg-deep-forest text-warm-white" style={{ padding: "120px clamp(24px, 4vw, 64px) 60px" }}>
        <div className="max-w-[1400px] mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 font-body text-[14px] text-sand/70 hover:text-sand transition-colors mb-6">
            &larr; Back to Home
          </Link>
          <h1 className="font-display text-[48px] md:text-[72px] leading-[1.05] tracking-[-1px]">Beaches</h1>
          <p className="font-body text-[18px] text-sand/80 max-w-[600px] mt-4 leading-relaxed">
            27 beaches across Oahu — from world-famous Waikiki to hidden coves. Filter by activity, crowd level, or region.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-warm-white border-b border-deep-forest/10" style={{ padding: "20px clamp(24px, 4vw, 64px)" }}>
        <div className="max-w-[1400px] mx-auto flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`px-4 py-2 rounded-full font-body text-[13px] transition-all duration-300 ${activeFilter === f ? "bg-deep-forest text-sand" : "border border-deep-forest/20 text-deep-forest hover:bg-deep-forest/5"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section ref={sectionRef} style={{ padding: "40px clamp(24px, 4vw, 64px) 100px" }}>
        <div className="max-w-[1400px] mx-auto">
          <p className="font-body text-[14px] text-stone mb-6">
            Showing {filtered.length} of {beaches.length} beaches
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((beach) => (
              <div key={beach.id} className="beach-card">
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
        </div>
      </section>

      {activeBeach && <BeachPanel beach={activeBeach} onClose={() => setActiveBeach(null)} />}

      {/* Footer CTA */}
      <div className="bg-deep-forest" style={{ padding: "60px clamp(24px, 4vw, 64px)" }}>
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="font-body text-[18px] text-sand/80 mb-4">Ready to hit the trails?</p>
          <Link
            to="/trails"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-sand text-deep-forest font-body text-[15px] hover:bg-warm-white transition-all duration-300"
          >
            View All Trails &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
