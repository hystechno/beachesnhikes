import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";
import { analytics } from "../hooks/useAnalytics";

gsap.registerPlugin(ScrollTrigger);

const column1 = [
  { q: "When is the best time to visit?", a: "Summer (May-September) brings calm waters ideal for swimming and snorkeling on all shores. Winter (November-February) delivers massive surf on the North Shore — incredible to watch, but swimming is dangerous. Spring and fall are shoulder seasons with fewer crowds." },
  { q: "Do I need reservations for hiking?", a: "Diamond Head requires reservations for non-residents — book 30+ days in advance on the DLNR website. Lulumahu Falls requires a $2.50 day-use permit. Most other trails are free and open." },
  { q: "Is snorkeling gear available for rent?", a: "Yes — rental shops are plentiful in Waikiki, Kailua town, and Haleiwa. Hanauma Bay has on-site rentals. Lanikai and Electric Beach have no facilities — rent before you go." },
];

const column2 = [
  { q: "Are the beaches safe for swimming?", a: "Always swim at lifeguarded beaches. Check the Hawaii Beach Safety website for daily conditions. Winter North Shore waves can reach 50 feet — stay on shore. Jellyfish warnings are posted 8-10 days after a full moon." },
  { q: "What should I pack for hiking?", a: "More water than you think you need. Proper hiking shoes (trails are muddy even when it hasn't rained). Sun protection (many trails have no shade). A light windbreaker for summit hikes. Tell someone where you're going." },
  { q: "How do I get around Oahu?", a: "A rental car is recommended for accessing North Shore, Windward, and Leeward beaches. Waikiki and Honolulu are walkable and well-served by TheBus. Ride-shares are available but expensive for long distances." },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div className="border-b border-deep-forest/10">
      <button className="w-full py-5 flex items-center justify-between text-left group" onClick={() => { if (!open) analytics.faqOpen(q); setOpen(!open); }}>
        <h3 className="font-display text-[20px] md:text-[22px] text-deep-forest pr-4">{q}</h3>
        <Plus size={18} className={`text-deep-forest flex-shrink-0 transition-transform duration-[400ms] ${open ? "rotate-45" : ""}`} />
      </button>
      <div ref={contentRef} className="overflow-hidden transition-all duration-[400ms] ease-out" style={{ maxHeight: open ? `${contentRef.current?.scrollHeight || 200}px` : "0px" }}>
        <p className="font-body text-[16px] text-deep-forest/80 leading-[1.7] pb-6">{a}</p>
      </div>
    </div>
  );
}

export default function PracticalInfo() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".accordion-item", { y: 15, opacity: 0, stagger: 0.06, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-warm-white" style={{ padding: "120px clamp(24px, 4vw, 64px)" }}>
      <div className="max-w-[1400px] mx-auto">
        <span className="font-body text-[12px] tracking-[0.15em] uppercase text-ocean font-medium">FAQ</span>
        <h2 className="font-display text-[48px] md:text-[64px] text-deep-forest leading-[1.05] tracking-[-0.5px] mt-2 mb-10">Know Before You Go</h2>
        <div className="grid md:grid-cols-2 gap-x-12">
          <div>{column1.map((item) => <div key={item.q} className="accordion-item"><AccordionItem q={item.q} a={item.a} /></div>)}</div>
          <div>{column2.map((item) => <div key={item.q} className="accordion-item"><AccordionItem q={item.q} a={item.a} /></div>)}</div>
        </div>
      </div>
    </section>
  );
}
