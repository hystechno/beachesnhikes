import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IslandIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current?.children || [], { y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
      gsap.from(imageRef.current, { y: 50, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-warm-white" style={{ padding: "120px clamp(24px, 4vw, 64px)" }}>
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-start">
        <div ref={leftRef} className="md:w-[55%]">
          <span className="font-body text-[12px] tracking-[0.15em] uppercase text-ocean font-medium">The Gathering Place</span>
          <h2 className="font-display text-[42px] md:text-[56px] text-deep-forest leading-[1.08] tracking-[-0.5px] mt-3">
            Five Regions.<br />One Island.
          </h2>
          <p className="font-body text-[17px] text-deep-forest/75 leading-[1.7] mt-5 max-w-[520px]">
            Oahu stretches from the turquoise shores of Lanikai to the towering waves of the North Shore. Whether you're chasing waterfalls in Manoa Valley or watching sunset at Pipeline, every trail and beach tells a different story.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="w-[60px] h-[1px] bg-deep-forest/25" />
          </div>
          <p className="font-body text-[13px] tracking-[0.12em] uppercase text-stone mt-4">
            112 miles of coastline &middot; 35+ trails &middot; 27 beaches &middot; Year-round surf
          </p>
        </div>
        <div className="md:w-[45%] md:mt-8">
          <img ref={imageRef} src="/images/real/5_Is_Lanikai_Beach_the_Best_Beach_on.jpg" alt="Oahu coastline" className="w-full rounded-lg object-cover" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
