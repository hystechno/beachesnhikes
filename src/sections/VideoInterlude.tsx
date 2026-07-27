import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoInterlude() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".interlude-video-wrap", { scale: 1.05, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
      gsap.fromTo(".interlude-text", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
    }, sectionRef);

    // Lazy load video only when section is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current && entry.isIntersecting && !hasPlayedRef.current) {
          hasPlayedRef.current = true;
          videoRef.current.play().catch(() => {});
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => { ctx.revert(); observer.disconnect(); };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[55vh] overflow-hidden bg-deep-forest">
      {/* Static background image while video loads */}
      <div className="absolute inset-0 bg-[url('/images/hero-poster.jpg')] bg-cover bg-center" />

      <div className="interlude-video-wrap absolute inset-0">
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          preload="none"
          poster="/images/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          aria-label="Oahu island scenery video"
        >
          <source src="/videos/video-interlude.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(42,61,46,0.08) 0%, rgba(42,61,46,0.25) 100%)" }} />
      </div>
      <div className="interlude-text relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h2 className="font-display text-[36px] md:text-[56px] text-warm-white leading-[1.1]">Every trail leads somewhere worth going</h2>
        <p className="font-body text-[14px] tracking-[0.12em] uppercase text-warm-white/70 mt-4">Explore responsibly</p>
      </div>
    </section>
  );
}
