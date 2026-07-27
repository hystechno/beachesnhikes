import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
      .to(scrollRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4");
    return () => { tl.kill(); };
  }, []);

  const scrollTo = () => { document.querySelector("#regions")?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <section ref={sectionRef} id="top" className="relative w-full h-screen overflow-hidden bg-deep-forest">
      {/* Poster image loads instantly as background */}
      <img
        src="/images/hero-poster.jpg"
        alt="Aerial view of Hawaii's turquoise ocean and white sand beach"
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
        loading="eager"
      />

      {/* Background hero video */}
      <video
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        poster="/images/hero-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover z-10"
        aria-label="Hawaii travel guide video showing beaches and ocean"
      >
        <source src="/videos/hero-ocean.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-20" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)" }} />

      <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 ref={titleRef} className="font-display text-[48px] md:text-[72px] text-warm-white leading-none tracking-[-2px] opacity-0 translate-y-[30px]">Hawaii</h1>
        <p className="font-body text-[13px] text-warm-white tracking-[0.3em] uppercase mt-3">Beaches & Hikes</p>
        <p ref={subtitleRef} className="font-body text-[17px] md:text-[20px] text-warm-white/85 max-w-[640px] mt-6 leading-relaxed opacity-0 translate-y-[30px]">
          Your guide to beaches, trails, and surf across Oahu, Maui, Kauai, and the Big Island.
        </p>
        <button ref={ctaRef} onClick={scrollTo} className="mt-10 px-8 py-3.5 rounded-full bg-sand text-deep-forest font-body text-[16px] hover:bg-warm-white transition-colors duration-300 opacity-0 translate-y-[30px]">
          Start Exploring
        </button>
      </div>
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 z-30">
        <div className="w-[1px] h-[36px] bg-warm-white/50 animate-scroll-pulse" />
        <span className="font-body text-[11px] text-warm-white/45 tracking-[0.15em] uppercase">Scroll</span>
      </div>
    </section>
  );
}
