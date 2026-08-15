import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "../sections/Navigation";
import Hero from "../sections/Hero";
import IslandIntro from "../sections/IslandIntro";
import Regions from "../sections/Regions";
import FeaturedTrails from "../sections/FeaturedTrails";
import FeaturedBeaches from "../sections/FeaturedBeaches";
import SurfGuide from "../sections/SurfGuide";
import FamilyGuide from "../sections/FamilyGuide";
import VideoInterlude from "../sections/VideoInterlude";
import MapSection from "../sections/MapSection";
import PracticalInfo from "../sections/PracticalInfo";
import FeaturedBlogs from "../sections/FeaturedBlogs";
import { BackToTop } from "../components/BackToTop";
import { analytics } from "../hooks/useAnalytics";
import {
  FAQSchema,
  BreadcrumbSchema,
  ArticleSchema,
  HowToSchema,
  LocalBusinessSchema,
  WebSiteSchema,
} from "../components/SchemaMarkup";
import { Flower2, TreePine, Mountain } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqItems = [
  { question: "When is the best time to visit Oahu?", answer: "Summer (May-September) brings calm waters ideal for swimming and snorkeling on all shores. Winter (November-February) delivers massive surf on the North Shore — incredible to watch, but swimming is dangerous. Spring and fall are shoulder seasons with fewer crowds." },
  { question: "Do I need reservations for hiking in Oahu?", answer: "Diamond Head requires reservations for non-residents — book 30+ days in advance on the DLNR website. Lulumahu Falls requires a $2.50 day-use permit. Most other trails are free and open." },
  { question: "Is snorkeling gear available for rent on Oahu?", answer: "Yes — rental shops are plentiful in Waikiki, Kailua town, and Haleiwa. Hanauma Bay has on-site rentals. Lanikai and Electric Beach have no facilities — rent before you go." },
  { question: "Are the beaches in Oahu safe for swimming?", answer: "Always swim at lifeguarded beaches. Check the Hawaii Beach Safety website for daily conditions. Winter North Shore waves can reach 50 feet — stay on shore. Jellyfish warnings are posted 8-10 days after a full moon." },
  { question: "What should I pack for hiking in Oahu?", answer: "More water than you think you need. Proper hiking shoes (trails are muddy even when it hasn't rained). Sun protection (many trails have no shade). A light windbreaker for summit hikes. Tell someone where you're going." },
  { question: "How do I get around Oahu?", answer: "A rental car is recommended for accessing North Shore, Windward, and Leeward beaches. Waikiki and Honolulu are walkable and well-served by TheBus. Ride-shares are available but expensive for long distances." },
];

const breadcrumbItems = [
  { name: "Home", url: "https://beachesnhikes.com/" },
  { name: "Oahu Guide", url: "https://beachesnhikes.com/#regions" },
];

const howToSteps = [
  { name: "Choose a region", text: "Start by exploring one of Oahu's five regions: Honolulu/Waikiki for urban energy, North Shore for legendary surf, Windward for turquoise waters, Leeward for sunny resorts, or Central for lush valleys." },
  { name: "Pick a trail or beach", text: "Browse 35+ hiking trails with difficulty ratings and 27 beaches with crowd levels. Filter by activity, difficulty, or region to find your perfect spot." },
  { name: "Check conditions", text: "Verify surf reports, weather forecasts, and beach safety conditions before heading out. Summer offers calm swimming; winter brings massive North Shore waves." },
  { name: "Plan your route", text: "Use our interactive map to plan your itinerary. Group nearby trails and beaches to maximize your Oahu adventure." },
];

function useScrollDepthTracking() {
  useEffect(() => {
    const milestones = [25, 50, 75, 90];
    const reached = new Set<number>();
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);
      for (const milestone of milestones) {
        if (pct >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          analytics.scrollDepth(milestone);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);
  useScrollDepthTracking();

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08 });
    lenisRef.current = lenis;
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); };
  }, []);

  return (
    <div className="min-h-screen bg-sand">
      <WebSiteSchema />
      <FAQSchema items={faqItems} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <ArticleSchema
        headline="Hawaii Beaches & Hikes: Trail & Beach Guides for All Islands"
        description="The most complete Hawaii travel guide with 80+ beaches, 60+ hiking trails, and surf spots across Oahu, Maui, Kauai, and the Big Island."
        image="https://beachesnhikes.com/images/og-image.jpg"
        datePublished="2026-01-01"
        dateModified="2026-06-05"
      />
      <HowToSchema
        name="How to Plan Your Oahu Adventure"
        description="A step-by-step guide to planning the perfect Oahu hiking and beach itinerary."
        steps={howToSteps}
      />
      <LocalBusinessSchema />

      <Navigation />
      <main>
        <Hero />
        <IslandIntro />
        <Regions />
        <FeaturedTrails />
        <FeaturedBeaches />
        <FeaturedBlogs />
        <SurfGuide />
        <FamilyGuide />
        <VideoInterlude />
        <MapSection />
        <PracticalInfo />

        {/* Explore Other Islands */}
        <section className="bg-sand/30 border-t border-deep-forest/5">
          <div className="max-w-[1400px] mx-auto" style={{ padding: "80px clamp(24px, 4vw, 64px)" }}>
            <div className="text-center mb-12">
              <span className="font-body text-[12px] tracking-[0.15em] uppercase text-stone">Beyond Oahu</span>
              <h2 className="font-display text-[36px] md:text-[48px] text-deep-forest leading-tight mt-2">Explore Other Islands</h2>
              <p className="font-body text-[16px] text-deep-forest/60 mt-3 max-w-[500px] mx-auto">Your guide to beaches and trails across all of Hawaii's major islands.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/maui" className="group bg-white rounded-2xl overflow-hidden border border-deep-forest/5 hover:shadow-lg hover:shadow-deep-forest/5 transition-all duration-300">
                <div className="h-[160px] bg-gradient-to-br from-ocean/20 to-sand/40 flex items-center justify-center">
                  <Flower2 className="w-16 h-16 text-ocean/30 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-[22px] text-deep-forest">Maui</h3>
                  <p className="font-body text-[12px] tracking-[0.1em] uppercase text-stone mt-1">The Valley Isle</p>
                  <p className="font-body text-[14px] text-deep-forest/60 mt-3 leading-relaxed">18 beaches and 12 trails from the Road to Hana to Haleakala's summit.</p>
                  <span className="inline-flex items-center gap-1 mt-4 font-body text-[13px] text-ocean group-hover:underline">Explore Maui &rarr;</span>
                </div>
              </Link>
              <Link to="/kauai" className="group bg-white rounded-2xl overflow-hidden border border-deep-forest/5 hover:shadow-lg hover:shadow-deep-forest/5 transition-all duration-300">
                <div className="h-[160px] bg-gradient-to-br from-emerald-800/10 to-sand/40 flex items-center justify-center">
                  <TreePine className="w-16 h-16 text-emerald-800/30 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-[22px] text-deep-forest">Kauai</h3>
                  <p className="font-body text-[12px] tracking-[0.1em] uppercase text-stone mt-1">The Garden Isle</p>
                  <p className="font-body text-[14px] text-deep-forest/60 mt-3 leading-relaxed">15 beaches and 10 trails along the legendary Na Pali Coast.</p>
                  <span className="inline-flex items-center gap-1 mt-4 font-body text-[13px] text-ocean group-hover:underline">Explore Kauai &rarr;</span>
                </div>
              </Link>
              <Link to="/bigisland" className="group bg-white rounded-2xl overflow-hidden border border-deep-forest/5 hover:shadow-lg hover:shadow-deep-forest/5 transition-all duration-300">
                <div className="h-[160px] bg-gradient-to-br from-deep-forest/10 to-sand/40 flex items-center justify-center">
                  <Mountain className="w-16 h-16 text-deep-forest/30 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-[22px] text-deep-forest">Big Island</h3>
                  <p className="font-body text-[12px] tracking-[0.1em] uppercase text-stone mt-1">Hawaii Island</p>
                  <p className="font-body text-[14px] text-deep-forest/60 mt-3 leading-relaxed">16 beaches and 12 trails across volcanic landscapes.</p>
                  <span className="inline-flex items-center gap-1 mt-4 font-body text-[13px] text-ocean group-hover:underline">Explore Big Island &rarr;</span>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <BackToTop />
    </div>
  );
}
