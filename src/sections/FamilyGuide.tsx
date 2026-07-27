import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Clock, Backpack, Fish, Car, Calendar, Waves } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const tips = [
  { icon: Shield, title: "Safety First", description: "Swim at lifeguarded beaches. Check conditions boards. Never turn your back on the ocean." },
  { icon: Clock, title: "Best Times", description: "Arrive before 8 AM for parking and calm water. Mornings are less crowded and cooler." },
  { icon: Backpack, title: "Gear Up", description: "Rent snorkel gear in town before heading to beaches without facilities. Bring reef-safe sunscreen." },
  { icon: Fish, title: "Snorkeling with Kids", description: "Hanauma Bay has calm water, lifeguards, and abundant fish. Life jackets available for beginners." },
  { icon: Car, title: "Parking Strategy", description: "Avoid Lanikai residential parking. Use Kailua Beach Park lot. Ko Olina fills by 9 AM." },
  { icon: Calendar, title: "Seasonal Planning", description: "Summer (May-Sep): Calm swimming everywhere. Winter (Nov-Feb): Watch North Shore surf from shore only." },
];

export default function FamilyGuide() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".family-featured", { y: 30, opacity: 0, stagger: 0.15, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
      });
      gsap.from(".family-tip", { y: 20, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".family-tips-grid", start: "top 85%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="family" ref={sectionRef} className="bg-sand" style={{ padding: "120px clamp(24px, 4vw, 64px)" }}>
      <div className="max-w-[1400px] mx-auto">
        <span className="font-body text-[12px] tracking-[0.15em] uppercase text-ocean font-medium">For Families</span>
        <h2 className="font-display text-[48px] md:text-[64px] text-deep-forest leading-[1.05] tracking-[-0.5px] mt-2">Family Guide</h2>
        <p className="font-body text-[18px] text-stone leading-[1.6] mt-3 max-w-[600px]">Oahu is one of the best family destinations in Hawaii. Calm shores, safe swimming, and kid-friendly adventures everywhere.</p>

        <div className="grid md:grid-cols-2 gap-5 mt-10">
          <div className="family-featured relative h-[380px] rounded-xl overflow-hidden group">
            <img src="/images/real/beach-koolina.jpg" alt="Ko Olina Lagoons" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="inline-block px-3 py-1 rounded-full bg-ocean text-warm-white font-body text-[11px] tracking-wider uppercase mb-3"><Waves size={11} className="inline mr-1" /> Family-Friendly</span>
              <h3 className="font-display text-[30px] text-warm-white">Ko Olina Lagoons</h3>
              <p className="font-body text-[15px] text-warm-white/85 mt-2 leading-relaxed">Four protected lagoons with pool-like calm water. Lifeguards, restrooms, and resort amenities make this the safest choice for families with young children.</p>
              <p className="font-body text-[12px] text-warm-white/50 mt-2">Best for: Ages 0-10</p>
            </div>
          </div>
          <div className="family-featured relative h-[380px] rounded-xl overflow-hidden group">
            <img src="/images/real/1_Aerial_view_of_a_Kailua_beach_on.jpg" alt="Kailua Beach" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="inline-block px-3 py-1 rounded-full bg-ocean text-warm-white font-body text-[11px] tracking-wider uppercase mb-3"><Waves size={11} className="inline mr-1" /> Family-Friendly</span>
              <h3 className="font-display text-[30px] text-warm-white">Kailua Beach Park</h3>
              <p className="font-body text-[15px] text-warm-white/85 mt-2 leading-relaxed">2.5 miles of gentle shoreline with soft waves, lifeguards, picnic areas, and easy parking. Kayak rentals available for light adventure.</p>
              <p className="font-body text-[12px] text-warm-white/50 mt-2">Best for: Ages 5-15</p>
            </div>
          </div>
        </div>

        <div className="family-tips-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {tips.map((tip) => {
            const Icon = tip.icon;
            return (
              <div key={tip.title} className="family-tip bg-warm-white rounded-xl p-6">
                <div className="w-10 h-10 rounded-full bg-ocean flex items-center justify-center"><Icon size={18} className="text-white" /></div>
                <h3 className="font-display text-[22px] text-deep-forest mt-4">{tip.title}</h3>
                <p className="font-body text-[15px] text-deep-forest/75 mt-2 leading-relaxed">{tip.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
