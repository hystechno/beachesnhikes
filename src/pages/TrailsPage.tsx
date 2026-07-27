import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trails } from "../data";
import type { Trail } from "../data";
import { TrailCard, TrailPanel } from "../components/TrailComponents";
import { analytics } from "../hooks/useAnalytics";

gsap.registerPlugin(ScrollTrigger);

const filters = ["All", "Easy", "Moderate", "Hard", "Expert", "Waterfall", "Ridge", "Sunrise", "Coastal"];

export default function TrailsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTrail, setActiveTrail] = useState<Trail | null>(null);

  const filtered = activeFilter === "All"
    ? trails
    : trails.filter((t) => {
        const d = t.difficulty.toLowerCase();
        const tags = t.tags.map((tag) => tag.toLowerCase());
        if (activeFilter === "Easy") return d.includes("easy") && !d.includes("moderate");
        if (activeFilter === "Moderate") return d.includes("moderate");
        if (activeFilter === "Hard") return d.includes("hard");
        if (activeFilter === "Expert") return d.includes("expert");
        return tags.some((tag) => tag.includes(activeFilter.toLowerCase()));
      });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".trail-card",
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
    if (f !== "All") analytics.filterUse("trail_difficulty_or_tag", f, "trails_page");
  };

  return (
    <div className="min-h-screen bg-sand">
      <Helmet>
        <title>35 Hiking Trails on Oahu | Difficulty Ratings & Maps | Beaches & Hikes</title>
        <meta name="description" content="Discover 35 hiking trails across Oahu — from easy Diamond Head to expert ridge climbs. Filter by difficulty, region, or activity. Real photos and trail maps included." />
        <meta property="og:title" content="35 Hiking Trails on Oahu | Beaches & Hikes" />
        <meta property="og:description" content="From Diamond Head to hidden ridge trails — find your perfect hike with difficulty ratings, maps, and real photos." />
        <meta property="og:image" content="https://www.beachesnhikes.com/images/hero-poster.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.beachesnhikes.com/trails" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Page Header */}
      <div className="bg-deep-forest text-warm-white" style={{ padding: "120px clamp(24px, 4vw, 64px) 60px" }}>
        <div className="max-w-[1400px] mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 font-body text-[14px] text-sand/70 hover:text-sand transition-colors mb-6">
            &larr; Back to Home
          </Link>
          <h1 className="font-display text-[48px] md:text-[72px] leading-[1.05] tracking-[-1px]">Hiking Trails</h1>
          <p className="font-body text-[18px] text-sand/80 max-w-[600px] mt-4 leading-relaxed">
            35 trails across five regions — from iconic Diamond Head to hidden ridgeline vistas. Filter by difficulty or activity.
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
            Showing {filtered.length} of {trails.length} trails
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((trail) => (
              <div key={trail.id} className="trail-card">
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
        </div>
      </section>

      {activeTrail && <TrailPanel trail={activeTrail} onClose={() => setActiveTrail(null)} />}

      {/* Footer CTA */}
      <div className="bg-deep-forest" style={{ padding: "60px clamp(24px, 4vw, 64px)" }}>
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="font-body text-[18px] text-sand/80 mb-4">Ready to explore the beaches?</p>
          <Link
            to="/beaches"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-sand text-deep-forest font-body text-[15px] hover:bg-warm-white transition-all duration-300"
          >
            View All Beaches &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
