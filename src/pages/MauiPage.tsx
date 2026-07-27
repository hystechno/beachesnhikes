import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { mauiBeaches, mauiTrails } from "../data/mauiData";
import { BreadcrumbSchema } from "../components/SchemaMarkup";
import gsap from "gsap";
import {
  Umbrella, Mountain, Eye, Waves, MapPin, Shield,
  Bath, Droplets, Car, ArrowLeft, TreePine
} from "lucide-react";

const beachImages: Record<string, string> = {
  "Makena Beach (Big Beach)": "/images/maui-beaches/makena.jpg",
  "Ka'anapali Beach": "/images/maui-beaches/kaanapali.jpg",
};

const getBeachImage = (beachName: string) => {
  return beachImages[beachName] || null;
};

const getActivityIcon = (activities: string[]) => {
  if (activities.some(a => a.includes("Snorkel"))) return <Eye className="w-12 h-12 text-ocean/40" strokeWidth={1} />;
  if (activities.some(a => a.includes("Surf"))) return <Waves className="w-12 h-12 text-ocean/40" strokeWidth={1} />;
  return <Umbrella className="w-12 h-12 text-ocean/40" strokeWidth={1} />;
};

const breadcrumbItems = [
  { name: "Home", url: "https://www.beachesnhikes.com/" },
  { name: "Maui", url: "https://www.beachesnhikes.com/maui" },
];

export default function MauiPage() {
  const [activeTab, setActiveTab] = useState<"beaches" | "trails">("beaches");
  const [beachFilter, setBeachFilter] = useState("All");
  const [trailFilter, setTrailFilter] = useState("All");
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(".maui-fade-in", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power2.out" });
    }, heroRef);
    return () => ctx.revert();
  }, [activeTab]);

  const beachRegions = ["All", "West Maui", "South Maui", "North Maui", "East Maui", "Upcountry"];
  const trailRegions = ["All", "West Maui", "South Maui", "East Maui", "Upcountry", "Central Maui"];

  const filteredBeaches = beachFilter === "All" ? mauiBeaches : mauiBeaches.filter(b => b.region === beachFilter);
  const filteredTrails = trailFilter === "All" ? mauiTrails : mauiTrails.filter(t => t.region === trailFilter);

  return (
    <div className="min-h-screen bg-warm-white" ref={heroRef}>
      <Helmet>
        <title>Maui Beaches & Hiking Trails | 18 Beaches & 12 Trails | Beaches & Hikes</title>
        <meta name="description" content="Discover Maui's best beaches and hiking trails — from Ka'anapali to Hana. 18 beaches, 12 trails, insider tips, and maps for your Maui adventure." />
        <meta property="og:title" content="Maui Beaches & Hiking Trails Guide | Beaches & Hikes" />
        <meta property="og:description" content="18 beaches and 12 trails from the Road to Hana to Haleakala's summit. Your complete Maui adventure guide." />
        <meta property="og:image" content="https://www.beachesnhikes.com/images/maui-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.beachesnhikes.com/maui" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Maui Beaches & Hiking Trails Guide" />
        <meta name="twitter:description" content="18 beaches and 12 trails from the Road to Hana to Haleakala's summit." />
        <meta name="twitter:image" content="https://www.beachesnhikes.com/images/maui-hero.jpg" />
      </Helmet>
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero */}
      <div className="relative h-[45vh] bg-deep-forest overflow-hidden">
        <img
          src="/images/maui-hero.jpg"
          alt="Maui Hawaii Road to Hana coastline with waterfalls"
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
            <span className="font-body text-[12px] tracking-[0.15em] uppercase text-warm-white/70">The Valley Isle</span>
            <h1 className="font-display text-[48px] md:text-[64px] text-warm-white leading-[1.05] mt-2">Maui</h1>
            <p className="font-body text-[16px] text-warm-white/80 mt-3 max-w-[600px] leading-relaxed">
              From the Road to Hana to Haleakala&apos;s summit, discover Maui&apos;s legendary beaches and epic trails. {mauiBeaches.length} beaches &amp; {mauiTrails.length} hiking trails.
            </p>
          </div>
        </div>
      </div>

      {/* Island Navigation */}
      <div className="bg-sand/30 border-b border-deep-forest/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex items-center gap-6 overflow-x-auto">
          <Link to="/oahu" className="font-body text-[14px] text-stone hover:text-deep-forest transition-colors whitespace-nowrap">Oahu</Link>
          <span className="font-body text-[14px] text-deep-forest font-medium whitespace-nowrap border-b-2 border-ocean pb-4 -mb-4">Maui</span>
          <Link to="/kauai" className="font-body text-[14px] text-stone hover:text-deep-forest transition-colors whitespace-nowrap">Kauai</Link>
          <Link to="/bigisland" className="font-body text-[14px] text-stone hover:text-deep-forest transition-colors whitespace-nowrap">Big Island</Link>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-10">
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("beaches")}
            className={`px-5 py-2.5 rounded-full font-body text-[14px] transition-all duration-300 inline-flex items-center gap-2 ${activeTab === "beaches" ? "bg-deep-forest text-sand" : "border border-deep-forest/20 text-deep-forest hover:bg-deep-forest/5"}`}
          >
            <Umbrella size={15} /> Beaches ({mauiBeaches.length})
          </button>
          <button
            onClick={() => setActiveTab("trails")}
            className={`px-5 py-2.5 rounded-full font-body text-[14px] transition-all duration-300 inline-flex items-center gap-2 ${activeTab === "trails" ? "bg-deep-forest text-sand" : "border border-deep-forest/20 text-deep-forest hover:bg-deep-forest/5"}`}
          >
            <Mountain size={15} /> Hiking Trails ({mauiTrails.length})
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
          <div className="grid md:grid-cols-2 gap-6">
            {filteredBeaches.map((beach) => {
              const img = getBeachImage(beach.name);
              return (
                <div key={beach.name} className="maui-fade-in bg-white rounded-2xl overflow-hidden border border-deep-forest/5 hover:shadow-lg hover:shadow-deep-forest/5 transition-all duration-300 group">
                  <div className="relative h-[200px] bg-gradient-to-br from-ocean/20 to-sand/40 flex items-center justify-center overflow-hidden">
                    {img ? (
                      <img src={img} alt={beach.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      getActivityIcon(beach.activities)
                    )}
                    {img && <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-full font-body text-[11px] font-medium ${beach.difficulty === "Easy" ? "bg-green-100 text-green-700" : beach.difficulty === "Moderate" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                        {beach.difficulty}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 font-body text-[11px] text-deep-forest">{beach.region}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-[22px] text-deep-forest leading-tight">{beach.name}</h3>
                    <p className="font-body text-[13px] text-stone mt-1">{beach.location}</p>
                    <p className="font-body text-[14px] text-deep-forest/70 mt-3 leading-relaxed line-clamp-3">{beach.description}</p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {beach.highlights.slice(0, 3).map(h => (
                        <span key={h} className="px-2 py-0.5 rounded-full bg-sand/50 font-body text-[11px] text-deep-forest/70">{h}</span>
                      ))}
                    </div>

                    {/* Amenities */}
                    <div className="flex gap-4 mt-4 pt-4 border-t border-deep-forest/5">
                      {beach.amenities.lifeguard && <span className="font-body text-[12px] text-deep-forest/50 inline-flex items-center gap-1"><Shield size={12} /> Lifeguard</span>}
                      {beach.amenities.restrooms && <span className="font-body text-[12px] text-deep-forest/50 inline-flex items-center gap-1"><Bath size={12} /> Restrooms</span>}
                      {beach.amenities.showers && <span className="font-body text-[12px] text-deep-forest/50 inline-flex items-center gap-1"><Droplets size={12} /> Showers</span>}
                      {beach.amenities.parking && <span className="font-body text-[12px] text-deep-forest/50 inline-flex items-center gap-1"><Car size={12} /> Parking</span>}
                    </div>

                    {/* Best Season & Tips */}
                    <div className="mt-4 p-3 rounded-lg bg-sand/30">
                      <p className="font-body text-[12px] text-deep-forest/60"><strong>Best:</strong> {beach.bestSeason}</p>
                      <p className="font-body text-[12px] text-deep-forest/50 mt-1"><strong>Tip:</strong> {beach.tips}</p>
                    </div>

                    <a
                      href={beach.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-full bg-deep-forest text-sand font-body text-[13px] hover:bg-deep-forest/80 transition-all"
                    >
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
          <div className="grid md:grid-cols-2 gap-6">
            {filteredTrails.map((trail) => (
              <div key={trail.name} className="maui-fade-in bg-white rounded-2xl overflow-hidden border border-deep-forest/5 hover:shadow-lg hover:shadow-deep-forest/5 transition-all duration-300">
                <div className="relative h-[160px] bg-gradient-to-br from-emerald-800/10 to-sand/40 flex items-center justify-center">
                  <TreePine className="w-12 h-12 text-emerald-800/30" strokeWidth={1} />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 rounded-full font-body text-[11px] font-medium ${trail.difficulty === "Easy" ? "bg-green-100 text-green-700" : trail.difficulty === "Moderate" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                      {trail.difficulty}
                    </span>
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
                  <a
                    href={trail.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-full bg-deep-forest text-sand font-body text-[13px] hover:bg-deep-forest/80 transition-all"
                  >
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
