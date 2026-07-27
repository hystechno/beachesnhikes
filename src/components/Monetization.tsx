import { ExternalLink, MapPin, Palmtree, ShoppingBag, Car, Waves } from "lucide-react";

// ── Amazon Associates Config ──
const AMAZON_TAG = "hawaiigolfg02-20";

function amazonLink(asin: string) {
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}`;
}

// ── Gear Products Database ──
const trailGear = [
  { name: "Reef-Safe Sunscreen (SPF 50)", asin: "B08N5WRWNW", category: "Essential", icon: "sun" },
  { name: "Merrell Moab 3 Hiking Shoes", asin: "B08Q8GNSG1", category: "Footwear", icon: "boot" },
  { name: "Osprey Daylite Plus Daypack", asin: "B08P54D7LB", category: "Gear", icon: "pack" },
  { name: "Hydro Flask 32oz Water Bottle", asin: "B01ACAXC60", category: "Essential", icon: "water" },
  { name: "GoPro HERO12 Black", asin: "B0CDDY8F9L", category: "Electronics", icon: "camera" },
  { name: "Columbia Bora Bora Booney Hat", asin: "B0080FB56U", category: "Clothing", icon: "hat" },
];

const beachGear = [
  { name: "Snorkel Set with Dry Top", asin: "B08Q3K4DQS", category: "Water Gear", icon: "mask" },
  { name: "Teva Hurricane XLT2 Sandals", asin: "B07ZH5ZWS7", category: "Footwear", icon: "sandal" },
  { name: "Speedo UV Swim Shirt", asin: "B07QVMXFSM", category: "Clothing", icon: "shirt" },
  { name: "Dry Bag Waterproof 20L", asin: "B07QDKH88F", category: "Gear", icon: "bag" },
  { name: "Beach Tent Sun Shelter", asin: "B07S8Y7QGP", category: "Shelter", icon: "tent" },
  { name: "Microfiber Beach Towel", asin: "B08CZCQ2RX", category: "Essential", icon: "towel" },
];

const familyGear = [
  { name: "Kids Snorkel Set (Ages 4-12)", asin: "B08M9LMB28", category: "Water Gear", icon: "mask" },
  { name: "Intex Inflatable Kayak 2-Person", asin: "B000F5A7YK", category: "Water Gear", icon: "kayak" },
  { name: "Life Jacket for Kids (USCG)", asin: "B07QVMXFSM", category: "Safety", icon: "life" },
  { name: "Beach Wagon with Big Wheels", asin: "B07S8Y7QGP", category: "Gear", icon: "wagon" },
  { name: "Kid-Size Rash Guard UPF 50+", asin: "B08M9LMB28", category: "Clothing", icon: "shirt" },
  { name: "Beach Toys Sandcastle Set", asin: "B07QDKH88F", category: "Fun", icon: "toys" },
];

// ── Gear Card Component ──
function GearCard({ name, asin }: { name: string; asin: string }) {
  return (
    <a
      href={amazonLink(asin)}
      target="_blank"
      rel="noopener sponsored"
      className="group flex items-center gap-3 bg-warm-white rounded-lg p-3 border border-stone/10 hover:border-ocean/40 transition-all duration-300 hover:shadow-md"
    >
      <div className="w-10 h-10 rounded-lg bg-ocean/10 flex items-center justify-center shrink-0 group-hover:bg-ocean/20 transition-colors">
        <ShoppingBag size={16} className="text-ocean" />
      </div>
      <div className="min-w-0">
        <p className="font-body text-[13px] text-deep-forest leading-tight truncate group-hover:text-ocean transition-colors">
          {name}
        </p>
        <p className="font-body text-[11px] text-stone/60 mt-0.5 flex items-center gap-1">
          <ExternalLink size={9} /> Amazon
        </p>
      </div>
    </a>
  );
}

// ── Gear Section Component ──
export function GearSection({ type }: { type: "trail" | "beach" | "family" }) {
  const gear = type === "trail" ? trailGear : type === "beach" ? beachGear : familyGear;
  const title = type === "trail" ? "Gear You'll Need" : type === "beach" ? "Beach Essentials" : "Family Beach Gear";
  const subtitle = type === "trail"
    ? "These essentials will keep you safe and comfortable on Oahu's trails."
    : type === "beach"
    ? "Everything you need for a perfect day at the beach."
    : "Make beach days easy and safe for the whole family.";

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-1">
        <ShoppingBag size={16} className="text-ocean" />
        <h4 className="font-display text-[18px] text-deep-forest">{title}</h4>
      </div>
      <p className="font-body text-[13px] text-stone/70 mb-3">{subtitle}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {gear.map((item) => (
          <GearCard key={item.asin} name={item.name} asin={item.asin} />
        ))}
      </div>
      <p className="font-body text-[11px] text-stone/50 mt-2 italic">
        As an Amazon Associate we earn from qualifying purchases.
      </p>
    </div>
  );
}

// ── TravelPayouts Placeholder Sections ──
export function WhereToStaySection({ region }: { region: string }) {
  return (
    <div className="mt-8 bg-warm-white rounded-xl p-6 border border-stone/10">
      <div className="flex items-center gap-2 mb-2">
        <MapPin size={18} className="text-ocean" />
        <h4 className="font-display text-[20px] text-deep-forest">Where to Stay Near {region}</h4>
      </div>
      <p className="font-body text-[14px] text-stone leading-relaxed mb-4">
        Find the best hotels and vacation rentals near {region}. Compare prices and book your perfect Oahu accommodation.
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href="#"
          target="_blank"
          rel="noopener sponsored"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-ocean text-warm-white rounded-full font-body text-[13px] tracking-wide hover:bg-deep-forest transition-colors"
        >
          <Palmtree size={14} /> Hotels in {region}
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener sponsored"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-ocean text-ocean rounded-full font-body text-[13px] tracking-wide hover:bg-ocean hover:text-warm-white transition-colors"
        >
          <Car size={14} /> Vacation Rentals
        </a>
      </div>
      <p className="font-body text-[11px] text-stone/50 mt-3 italic">Links powered by Booking.com via TravelPayouts</p>
    </div>
  );
}

export function BookTourSection({ activity }: { activity: string }) {
  return (
    <div className="mt-6 bg-warm-white rounded-xl p-6 border border-stone/10">
      <div className="flex items-center gap-2 mb-2">
        <Waves size={18} className="text-ocean" />
        <h4 className="font-display text-[20px] text-deep-forest">Book a {activity} Tour</h4>
      </div>
      <p className="font-body text-[14px] text-stone leading-relaxed mb-4">
        Skip the research — book a guided {activity.toLowerCase()} experience with top-rated local operators.
      </p>
      <a
        href="#"
        target="_blank"
        rel="noopener sponsored"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-ocean text-warm-white rounded-full font-body text-[13px] tracking-wide hover:bg-deep-forest transition-colors"
      >
        <ExternalLink size={14} /> Find {activity} Tours
      </a>
      <p className="font-body text-[11px] text-stone/50 mt-3 italic">Links powered by GetYourGuide via TravelPayouts</p>
    </div>
  );
}

export function CarRentalSection() {
  return (
    <div className="mt-6 bg-warm-white rounded-xl p-6 border border-stone/10">
      <div className="flex items-center gap-2 mb-2">
        <Car size={18} className="text-ocean" />
        <h4 className="font-display text-[20px] text-deep-forest">Rent a Car in Oahu</h4>
      </div>
      <p className="font-body text-[14px] text-stone leading-relaxed mb-4">
        A rental car is the best way to explore Oahu's trails and beaches. Compare rates from all major providers and book the best deal.
      </p>
      <a
        href="#"
        target="_blank"
        rel="noopener sponsored"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-ocean text-warm-white rounded-full font-body text-[13px] tracking-wide hover:bg-deep-forest transition-colors"
      >
        <ExternalLink size={14} /> Compare Car Rental Rates
      </a>
      <p className="font-body text-[11px] text-stone/50 mt-3 italic">Links powered by Discover Cars via TravelPayouts</p>
    </div>
  );
}

// ── Affiliate Disclosure ──
export function AffiliateDisclosure() {
  return (
    <div className="bg-warm-white border-t border-stone/10 py-4 px-6">
      <div className="max-w-[1400px] mx-auto">
        <p className="font-body text-[11px] text-stone/50 text-center leading-relaxed">
          <strong>Affiliate Disclosure:</strong> beachesnhikes.com participates in affiliate programs including Amazon Associates, Booking.com, GetYourGuide, and TravelPayouts. We earn commissions from qualifying purchases at no extra cost to you. All recommendations are editorially independent — we only recommend products and services we genuinely believe in.
        </p>
      </div>
    </div>
  );
}

// ── Email Capture ──
export function EmailCapture() {
  return (
    <div className="bg-deep-forest rounded-xl p-8 text-center">
      <h3 className="font-display text-[28px] text-warm-white">Free Oahu Trip Planning Checklist</h3>
      <p className="font-body text-[15px] text-warm-white/80 mt-2 max-w-[500px] mx-auto leading-relaxed">
        Get our curated packing list, trail safety tips, and insider recommendations delivered to your inbox. Join 2,000+ travelers planning their Oahu adventure.
      </p>
      <form className="flex flex-col sm:flex-row gap-3 justify-center mt-5 max-w-[480px] mx-auto" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Enter your email"
          className="px-5 py-3 rounded-full font-body text-[14px] text-deep-forest bg-warm-white outline-none flex-1"
        />
        <button className="px-6 py-3 bg-ocean text-warm-white rounded-full font-body text-[14px] font-medium hover:bg-warm-white hover:text-deep-forest transition-colors">
          Get My Checklist
        </button>
      </form>
      <p className="font-body text-[11px] text-warm-white/40 mt-3">No spam. Unsubscribe anytime.</p>
    </div>
  );
}
