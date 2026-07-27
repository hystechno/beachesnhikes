import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { kauaiBeaches, kauaiTrails } from "../data/kauaiData";
import { BreadcrumbSchema } from "../components/SchemaMarkup";
import gsap from "gsap";
import {
  Umbrella, Mountain, Eye, Waves, MapPin, Shield,
  Bath, Droplets, Car, ArrowLeft, AlertTriangle, TreePine
} from "lucide-react";

const beachImages: Record<string, string> = {
  "Hanalei Bay": "/images/kauai-beaches/hanalei.jpg",
  "Tunnels Beach (Makua)": "/images/kauai-beaches/tunnels.jpg",
};

const getBeachImage = (beachName: string) => beachImages[beachName] || null;

const getActivityIcon = (activities: string[]) => {
  if (activities.some(a => a.includes("Snorkel"))) return <Eye className="w-12 h-12 text-ocean/40" strokeWidth={1} />;
  if (activities.some(a => a.includes("Surf"))) return <Waves className="w-12 h-12 text-ocean/40" strokeWidth={1} />;
  return <Umbrella className="w-12 h-12 text-ocean/40" strokeWidth={1} />;
};

const breadcrumbItems = [
  { name: "Home", url: "https://www.beachesnhikes.com/" },
  { name: "Kauai", url: "https://www.beachesnhikes.com/kauai" },
];

export default function KauaiPage() {
  const [activeTab, setActiveTab] = useState<"beaches" | "trails">("beaches");
  const [beachFilter, setBeachFilter] = useState("All");
  const [trailFilter, setTrailFilter] = useState("All");
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(".kauai-fade-in", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power2.out" });
    }, heroRef);
    return () => ctx.revert();
  }, [activeTab]);

  const beachRegions = ["All", "North Shore", "South Shore", "East Shore", "West Shore"];
  const trailRegions = ["All", "North Shore", "South Shore", "East Shore", "West Shore", "Central"];

  const filteredBeaches = beachFilter === "All" ? kauaiBeaches : kauaiBeaches.filter(b => b.region === beachFilter);
  const filteredTrails = trailFilter === "All" ? kauaiTrails : kauaiTrails.filter(t => t.region === trailFilter);

  return (
    <div className="min-h-screen bg-warm-white" ref={heroRef}>
      <Helmet>
        <title>Kauai Beaches & Hiking Trails | 15 Beaches & 10 Trails | Beaches & Hikes</title>
        <meta name="description" content="Discover Kauai's dramatic beaches and legendary trails — from the Na Pali Coast to Waimea Canyon. 15 beaches, 10 trails, and insider tips for the Garden Isle." />
        <meta property="og:title" content="Kauai Beaches & Hiking Trails Guide | Beaches & Hikes" />
        <meta property="og:description" content="15 beaches and 10 trails along the legendary Na Pali Coast and Waimea Canyon. Your complete Kauai adventure guide." />
        <meta property="og:image" content="https://www.beachesnhikes.com/images/kauai-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.beachesnhikes.com/kauai" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kauai Beaches & Hiking Trails Guide" />
        <meta name="twitter:description" content="15 beaches and 10 trails along the legendary Na Pali Coast." />
        <meta name="twitter:image" content="https://www.beachesnhikes.com/images/kauai-hero.jpg" />
      </Helmet>
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero */}
      <div className="relative h-[45vh] bg-deep-forest overflow-hidden">
        <img
          src="/images/kauai-hero.jpg"
          alt="Kauai Hawaii Na Pali Coast sea cliffs"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = "/images/region-northshore.jpg"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        <div className="absolute top-0 left-0 right-0 z-10" style={{ padding: "0 clamp(24px, 4vw, 64px)" }}>
          <div className="max-w-[1400px] mx-auto pt-24">
            <Link to="/" className="inline-flex items-center gap-2 font-body text-[14px] text-warm-white/70 hover:text-warm-white transition-colors">
              <ArrowLeft size={14} /> Back to Home
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10" style={{ padding: "0 clamp(24px, 4vw, 64px) 40px" }}>
          <div className="max-w-[1400px] mx-auto">
            <span className="font-body text-[12px] tracking-[0.15em] uppercase text-warm-white/70">The Garden Isle</span>
            <h1 className="font-display text-[48px] md:text-[64px] text-warm-white leading-[1.05] mt-2">Kauai</h1>
            <p className="font-body text-[16px] text-warm-white/80 mt-3 max-w-[600px] leading-relaxed">
              Home to the Na Pali Coast and Waimea Canyon. Discover Kauai&apos;s dramatic beaches and legendary trails. {kauaiBeaches.length} beaches &amp; {kauaiTrails.length} hiking trails.
            </p>
          </div>
        </div>
      </div>

      {/* Island Navigation */}
      <div className="bg-sand/30 border-b border-deep-forest/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex items-center gap-6 overflow-x-auto">
          <Link to="/oahu" className="font-body text-[14px] text-stone hover:text-deep-forest transition-colors whitespace-nowrap">Oahu</Link>
          <Link to="/maui" className="font-body text-[14px] text-stone hover:text-deep-forest transition-colors whitespace-nowrap">Maui</Link>
          <span className="font-body text-[14px] text-deep-forest font-medium whitespace-nowrap border-b-2 border-ocean pb-4 -mb-4">Kauai</span>
          <Link to="/bigisland" className="font-body text-[14px] text-stone hover:text-deep-forest transition-colors whitespace-nowrap">Big Island</Link>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-10">
        <div className="flex gap-2 mb-8">
          <button onClick={() => setActiveTab("beaches")} className={`px-5 py-2.5 rounded-full font-body text-[14px] transition-all duration-300 inline-flex items-center gap-2 ${activeTab === "beaches" ? "bg-deep-forest text-sand" : "border border-deep-forest/20 text-deep-forest hover:bg-deep-forest/5"}`}>
            <Umbrella size={15} /> Beaches ({kauaiBeaches.length})
          </button>
          <button onClick={() => setActiveTab("trails")} className={`px-5 py-2.5 rounded-full font-body text-[14px] transition-all duration-300 inline-flex items-center gap-2 ${activeTab === "trails" ? "bg-deep-forest text-sand" : "border border-deep-forest/20 text-deep-forest hover:bg-deep-forest/5"}`}>
            <Mountain size={15} /> Hiking Trails ({kauaiTrails.length})
          </button>
        </div>
      </div>

      {/* Seasonal Safety Banner */}
      {activeTab === "beaches" && (
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="font-body text-[13px] text-yellow-800 leading-relaxed">
              <strong>Seasonal Safety:</strong> Kauai&apos;s North Shore beaches are only safe for swimming May–September. October–April brings dangerous surf. When in doubt, head to the South Shore (Poipu) for year-round calm swimming.
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      {activeTab === "beaches" ? (
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-20">
          <div className="flex flex-wrap gap-2 mb-8">
            {beachRegions.map(region => (
              <button key={region} onClick={() => setBeachFilter(region)} className={`px-4 py-1.5 rounded-full font-body text-[13px] transition-all duration-300 ${beachFilter === region ? "bg-ocean text-white" : "border border-deep-forest/10 text-deep-forest/70 hover:border-ocean/40"}`}>
                {region}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredBeaches.map((beach) => {
              const img = getBeachImage(beach.name);
              return (
                <div key={beach.name} className="kauai-fade-in bg-white rounded-2xl overflow-hidden border border-deep-forest/5 hover:shadow-lg hover:shadow-deep-forest/5 transition-all duration-300 group">
                  <div className="relative h-[200px] bg-gradient-to-br from-ocean/20 to-sand/40 flex items-center justify-center overflow-hidden">
                    {img ? (
                      <img src={img} alt={beach.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      getActivityIcon(beach.activities)
                    )}
                    {img && <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-full font-body text-[11px] font-medium ${beach.difficulty === "Easy" ? "bg-green-100 text-green-700" : beach.difficulty === "Moderate" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{beach.difficulty}</span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 font-body text-[11px] text-deep-forest">{beach.region}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-[22px] text-deep-forest leading-tight">{beach.name}</h3>
                    <p className="font-body text-[13px] text-stone mt-1">{beach.location}</p>
                    <p className="font-body text-[14px] text-deep-forest/70 mt-3 leading-relaxed line-clamp-3">{beach.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {beach.highlights.slice(0, 3).map(h => (
                        <span key={h} className="px-2 py-0.5 rounded-full bg-sand/50 font-body text-[11px] text-deep-forest/70">{h}</span>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-4 pt-4 border-t border-deep-forest/5">
                      {beach.amenities.lifeguard && <span className="font-body text-[12px] text-deep-forest/50 inline-flex items-center gap-1"><Shield size={12} /> Lifeguard</span>}
                      {beach.amenities.restrooms && <span className="font-body text-[12px] text-deep-forest/50 inline-flex items-center gap-1"><Bath size={12} /> Restrooms</span>}
                      {beach.amenities.showers && <span className="font-body text-[12px] text-deep-forest/50 inline-flex items-center gap-1"><Droplets size={12} /> Showers</span>}
                      {beach.amenities.parking && <span className="font-body text-[12px] text-deep-forest/50 inline-flex items-center gap-1"><Car size={12} /> Parking</span>}
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-sand/30">
                      <p className="font-body text-[12px] text-deep-forest/60"><strong>Best:</strong> {beach.bestSeason}</p>
                      <p className="font-body text-[12px] text-deep-forest/50 mt-1"><strong>Tip:</strong> {beach.tips}</p>
                    </div>
                    <a href={beach.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-full bg-deep-forest text-sand font-body text-[13px] hover:bg-deep-forest/80 transition-all">
                      <MapPin size={13} /> Get Directions
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-20">
          <div className="flex flex-wrap gap-2 mb-8">
            {trailRegions.map(region => (
              <button key={region} onClick={() => setTrailFilter(region)} className={`px-4 py-1.5 rounded-full font-body text-[13px] transition-all duration-300 ${trailFilter === region ? "bg-ocean text-white" : "border border-deep-forest/10 text-deep-forest/70 hover:border-ocean/40"}`}>{region}</button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {filteredTrails.map((trail) => (
              <div key={trail.name} className="kauai-fade-in bg-white rounded-2xl overflow-hidden border border-deep-forest/5 hover:shadow-lg hover:shadow-deep-forest/5 transition-all duration-300">
                <div className="relative h-[160px] bg-gradient-to-br from-emerald-800/10 to-sand/40 flex items-center justify-center">
                  <TreePine className="w-12 h-12 text-emerald-800/30" strokeWidth={1} />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 rounded-full font-body text-[11px] font-medium ${trail.difficulty === "Easy" ? "bg-green-100 text-green-700" : trail.difficulty === "Moderate" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{trail.difficulty}</span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 font-body text-[11px] text-deep-forest">{trail.region}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-[20px] text-deep-forest leading-tight">{trail.name}</h3>
                  <p className="font-body text-[13px] text-stone mt-1">{trail.location}</p>
                  <div className="flex gap-4 mt-2 font-body text-[12px] text-deep-forest/60">
                    <span>{trail.distance}</span>
                    <span>{trail.duration}</span>
                    <span>{trail.elevationGain} gain</span>
                  </div>
                  <p className="font-body text-[14px] text-deep-forest/70 mt-3 leading-relaxed line-clamp-3">{trail.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {trail.highlights.slice(0, 3).map(h => (
                      <span key={h} className="px-2 py-0.5 rounded-full bg-sand/50 font-body text-[11px] text-deep-forest/70">{h}</span>
                    ))}
                  </div>
                  <a href={trail.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-full bg-deep-forest text-sand font-body text-[13px] hover:bg-deep-forest/80 transition-all">
                    <MapPin size={13} /> Get Directions
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
