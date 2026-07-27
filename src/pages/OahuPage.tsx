import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { trails, beaches } from "../data";
import gsap from "gsap";

export default function OahuPage() {
  const [activeTab, setActiveTab] = useState<"beaches" | "trails">("beaches");
  const [beachFilter, setBeachFilter] = useState("All");
  const [trailFilter, setTrailFilter] = useState("All");
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(".oahu-fade-in", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power2.out" });
    }, heroRef);
    return () => ctx.revert();
  }, [activeTab]);

  const beachRegions = ["All", ...Array.from(new Set(beaches.map(b => b.region)))];
  const trailRegions = ["All", ...Array.from(new Set(trails.map(t => t.region)))];

  const filteredBeaches = beachFilter === "All" ? beaches : beaches.filter(b => b.region === beachFilter);
  const filteredTrails = trailFilter === "All" ? trails : trails.filter(t => t.region === trailFilter);

  return (
    <div className="min-h-screen bg-warm-white" ref={heroRef}>
      {/* Hero */}
      <div className="relative h-[45vh] bg-deep-forest overflow-hidden">
        <img
          src="/images/hero-poster.jpg"
          alt="Oahu Hawaii beaches and coastline"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        <div className="absolute top-0 left-0 right-0 z-10" style={{ padding: "0 clamp(24px, 4vw, 64px)" }}>
          <div className="max-w-[1400px] mx-auto pt-24">
            <Link to="/" className="inline-flex items-center gap-2 font-body text-[14px] text-warm-white/70 hover:text-warm-white transition-colors">
              &larr; Back to Home
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10" style={{ padding: "0 clamp(24px, 4vw, 64px) 40px" }}>
          <div className="max-w-[1400px] mx-auto">
            <span className="font-body text-[12px] tracking-[0.15em] uppercase text-warm-white/70">The Gathering Place</span>
            <h1 className="font-display text-[48px] md:text-[64px] text-warm-white leading-[1.05] mt-2">Oahu</h1>
            <p className="font-body text-[16px] text-warm-white/80 mt-3 max-w-[600px] leading-relaxed">
              35+ hiking trails, 25 beaches, and world-famous surf breaks. The ultimate Hawaiian adventure starts here.
            </p>
          </div>
        </div>
      </div>

      {/* Island Navigation */}
      <div className="bg-sand/30 border-b border-deep-forest/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex items-center gap-6 overflow-x-auto">
          <span className="font-body text-[14px] text-deep-forest font-medium whitespace-nowrap border-b-2 border-ocean pb-4 -mb-4">Oahu</span>
          <Link to="/maui" className="font-body text-[14px] text-stone hover:text-deep-forest transition-colors whitespace-nowrap">Maui</Link>
          <Link to="/kauai" className="font-body text-[14px] text-stone hover:text-deep-forest transition-colors whitespace-nowrap">Kauai</Link>
          <Link to="/bigisland" className="font-body text-[14px] text-stone hover:text-deep-forest transition-colors whitespace-nowrap">Big Island</Link>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-10">
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("beaches")}
            className={`px-5 py-2.5 rounded-full font-body text-[14px] transition-all duration-300 ${activeTab === "beaches" ? "bg-deep-forest text-sand" : "border border-deep-forest/20 text-deep-forest hover:bg-deep-forest/5"}`}
          >
            🏖️ Beaches ({beaches.length})
          </button>
          <button
            onClick={() => setActiveTab("trails")}
            className={`px-5 py-2.5 rounded-full font-body text-[14px] transition-all duration-300 ${activeTab === "trails" ? "bg-deep-forest text-sand" : "border border-deep-forest/20 text-deep-forest hover:bg-deep-forest/5"}`}
          >
            🥾 Hiking Trails ({trails.length})
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === "beaches" ? (
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-20">
          {/* Region Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {beachRegions.map(region => (
              <button
                key={region}
                onClick={() => setBeachFilter(region)}
                className={`px-4 py-1.5 rounded-full font-body text-[13px] transition-all duration-300 ${beachFilter === region ? "bg-ocean text-white" : "border border-deep-forest/10 text-deep-forest/70 hover:border-ocean/40"}`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Beach Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBeaches.map((beach) => (
              <div key={beach.id} className="oahu-fade-in bg-white rounded-2xl overflow-hidden border border-deep-forest/5 hover:shadow-lg hover:shadow-deep-forest/5 transition-all duration-300 group">
                <div className="relative h-[180px] overflow-hidden">
                  <img
                    src={beach.image}
                    alt={beach.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/images/region-northshore.jpg"; }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 font-body text-[11px] text-deep-forest">{beach.crowdLabel}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-[18px] text-deep-forest leading-tight">{beach.name}</h3>
                  <p className="font-body text-[13px] text-stone mt-1">{beach.region}</p>
                  <p className="font-body text-[14px] text-deep-forest/70 mt-2 leading-relaxed line-clamp-3">{beach.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {beach.activities.slice(0, 3).map(a => (
                      <span key={a} className="px-2 py-0.5 rounded-full bg-sand/50 font-body text-[11px] text-deep-forest/70">{a}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-20">
          {/* Region Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {trailRegions.map(region => (
              <button
                key={region}
                onClick={() => setTrailFilter(region)}
                className={`px-4 py-1.5 rounded-full font-body text-[13px] transition-all duration-300 ${trailFilter === region ? "bg-ocean text-white" : "border border-deep-forest/10 text-deep-forest/70 hover:border-ocean/40"}`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Trail Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrails.map((trail) => (
              <div key={trail.id} className="oahu-fade-in bg-white rounded-2xl overflow-hidden border border-deep-forest/5 hover:shadow-lg hover:shadow-deep-forest/5 transition-all duration-300 group">
                <div className="relative h-[160px] overflow-hidden">
                  <img
                    src={trail.image}
                    alt={trail.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/images/region-northshore.jpg"; }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 rounded-full font-body text-[11px] font-medium ${trail.difficulty === "Easy" ? "bg-green-100 text-green-700" : trail.difficulty === "Moderate" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                      {trail.difficulty}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-[18px] text-deep-forest leading-tight">{trail.name}</h3>
                  <p className="font-body text-[13px] text-stone mt-1">{trail.region}</p>
                  <div className="flex flex-wrap gap-3 mt-3">
                    <span className="font-body text-[12px] text-deep-forest/60">📏 {trail.distance}</span>
                    <span className="font-body text-[12px] text-deep-forest/60">⏱️ {trail.duration}</span>
                    <span className="font-body text-[12px] text-deep-forest/60">↗️ {trail.elevation}</span>
                  </div>
                  <p className="font-body text-[14px] text-deep-forest/70 mt-3 leading-relaxed line-clamp-3">{trail.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {trail.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-sand/50 font-body text-[11px] text-deep-forest/70">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
