import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mapLocations } from "../data";
import { MapPin, Waves, Mountain } from "lucide-react";
import { analytics } from "../hooks/useAnalytics";

gsap.registerPlugin(ScrollTrigger);

// Proper Google Maps search URLs using actual place names
function getGoogleMapsUrl(name: string): string {
  const encoded = encodeURIComponent(name + ", Oahu, Hawaii");
  return `https://www.google.com/maps/search/?api=1&query=${encoded}`;
}

export default function MapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<"all" | "trails" | "beaches">("all");

  const counts = {
    all: mapLocations.length,
    trails: mapLocations.filter((l) => l.type === "trail").length,
    beaches: mapLocations.filter((l) => l.type === "beach").length,
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".map-container",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleFilter = (f: "all" | "trails" | "beaches") => {
    setFilter(f);
    analytics.mapInteraction("filter", f);
  };

  const googleMapUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d237754.78021953274!2d-157.8581!3d21.3099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus`;

  return (
    <section id="map" ref={sectionRef} className="bg-warm-white" style={{ padding: "120px clamp(24px, 4vw, 64px)" }}>
      <div className="max-w-[1400px] mx-auto">
        <span className="font-body text-[12px] tracking-[0.15em] uppercase text-ocean font-medium">Interactive Map</span>
        <h2 className="font-display text-[48px] md:text-[64px] text-deep-forest leading-[1.05] tracking-[-0.5px] mt-2">Explore Oahu</h2>
        <p className="font-body text-[18px] text-stone leading-[1.6] mt-3 max-w-[600px]">
          All {counts.trails} trails and {counts.beaches} beaches mapped across the island. Click any location to open in Google Maps.
        </p>

        <div className="flex flex-wrap gap-3 mt-6">
          {(["all", "trails", "beaches"] as const).map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`px-5 py-2.5 rounded-full font-body text-[13px] transition-all duration-300 flex items-center gap-2 ${filter === f ? "bg-deep-forest text-sand" : "border border-deep-forest/20 text-deep-forest hover:bg-deep-forest/5"}`}
            >
              {f === "all" && <MapPin size={14} />}
              {f === "trails" && <Mountain size={14} />}
              {f === "beaches" && <Waves size={14} />}
              {f === "all" ? `All Locations (${counts.all})` : f === "trails" ? `Trails (${counts.trails})` : `Beaches (${counts.beaches})`}
            </button>
          ))}
        </div>

        {/* Google Maps Embed */}
        <div className="map-container mt-8 rounded-2xl overflow-hidden border border-deep-forest/10 shadow-lg relative">
          <iframe
            src={googleMapUrl}
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map of Oahu, Hawaii showing all hiking trails and beaches"
          />
          <div className="absolute bottom-4 left-4 bg-warm-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-md">
            <p className="font-body text-[12px] text-deep-800 flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-trail-green" /> Trails</span>
              <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-wave-blue" /> Beaches</span>
            </p>
          </div>
        </div>

        {/* Location Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8">
          {mapLocations
            .filter((l) => filter === "all" || l.type === filter.slice(0, -1))
            .map((loc) => (
              <a
                key={loc.name}
                href={getGoogleMapsUrl(loc.name)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.outboundClick(getGoogleMapsUrl(loc.name), loc.name)}
                className="flex items-center gap-2 p-3 rounded-lg bg-sand hover:bg-deep-forest hover:text-sand transition-colors group"
              >
                {loc.type === "trail" ? (
                  <Mountain size={14} className="text-trail-green group-hover:text-sand flex-shrink-0" />
                ) : (
                  <Waves size={14} className="text-wave-blue group-hover:text-sand flex-shrink-0" />
                )}
                <span className="font-body text-[13px] truncate">{loc.name}</span>
              </a>
            ))}
        </div>
      </div>
    </section>
  );
}
