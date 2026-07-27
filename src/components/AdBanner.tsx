import { useEffect, useRef } from "react";

// ── AdSense Publisher ID ──
const AD_CLIENT = "ca-pub-8538793806490766";

// ── Ad Slot IDs (create these in your AdSense dashboard) ──
// Replace these with your actual AdSense ad unit IDs once approved
const AD_SLOTS: Record<string, string> = {
  // Leaderboard - top of page (homepage)
  homepage_top: "1234567890",
  // Leaderboard - bottom of page
  homepage_bottom: "1234567891",
  // Medium rectangle - content sidebar
  content_inline: "1234567892",
  // Large rectangle - between sections
  content_mid: "1234567893",
  // Skyscraper - sidebar
  sidebar: "1234567894",
  // Anchor - sticky bottom mobile
  anchor: "1234567895",
  // In-article - between content
  in_article: "1234567896",
  // Trails page
  trails_top: "1234567897",
  trails_mid: "1234567898",
  // Beaches page
  beaches_top: "1234567899",
  beaches_mid: "1234567900",
  // Blog
  blog_sidebar: "1234567901",
  blog_inline: "1234567902",
};

type AdSize =
  | "leaderboard"      // 728x90
  | "large-leaderboard" // 970x90
  | "medium-rectangle" // 300x250
  | "large-rectangle"  // 336x280
  | "half-page"        // 300x600
  | "skyscraper"       // 160x600
  | "wide-skyscraper"  // 300x600 (same as half-page)
  | "mobile-banner"    // 320x50
  | "large-mobile"     // 320x100
  | "square"           // 250x250
  | "small-square"     // 200x200
  | "portrait"         // 300x1050
  | "billboard"        // 970x250
  | "fluid"            // responsive
  | "anchor";          // bottom sticky

const SIZE_CLASSES: Record<AdSize, string> = {
  leaderboard: "w-[728px] h-[90px] max-w-full",
  "large-leaderboard": "w-[970px] h-[90px] max-w-full",
  "medium-rectangle": "w-[300px] h-[250px]",
  "large-rectangle": "w-[336px] h-[280px] max-w-full",
  "half-page": "w-[300px] h-[600px]",
  skyscraper: "w-[160px] h-[600px] hidden lg:block",
  "wide-skyscraper": "w-[300px] h-[600px] hidden xl:block",
  "mobile-banner": "w-[320px] h-[50px] max-w-full sm:hidden",
  "large-mobile": "w-[320px] h-[100px] max-w-full sm:hidden",
  square: "w-[250px] h-[250px]",
  "small-square": "w-[200px] h-[200px]",
  portrait: "w-[300px] h-[1050px] hidden lg:block",
  billboard: "w-[970px] h-[250px] max-w-full hidden md:block",
  fluid: "w-full min-h-[90px]",
  anchor: "fixed bottom-0 left-0 right-0 z-50 bg-white/95 border-t border-gray-200 backdrop-blur-sm",
};

interface AdBannerProps {
  slot: keyof typeof AD_SLOTS;
  size: AdSize;
  className?: string;
  label?: string;
}

// ── Check if AdSense script is loaded ──
function isAdSenseLoaded(): boolean {
  return typeof (window as any).adsbygoogle !== "undefined";
}

// ── Ad Banner Component ──
export function AdBanner({ slot, size, className = "", label }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const slotId = AD_SLOTS[slot];
  const isAnchor = size === "anchor";

  useEffect(() => {
    // Only push to adsbygoogle if the script is loaded
    if (isAdSenseLoaded() && adRef.current) {
      try {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      } catch (e) {
        // AdSense not ready yet — placeholder will show
      }
    }
  }, [slot]);

  // ── Anchor Ad (sticky bottom) ──
  if (isAnchor) {
    return (
      <div className={`${SIZE_CLASSES.anchor} ${className}`}>
        <div className="max-w-[728px] mx-auto px-4 py-2 flex items-center justify-between gap-4">
          <ins
            className="adsbygoogle flex-1"
            style={{ display: "inline-block", height: "50px", minWidth: "320px" }}
            data-ad-client={AD_CLIENT}
            data-ad-slot={slotId}
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          />
          <AdPlaceholder size="anchor" label={label || "Advertisement"} />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {label && (
        <span className="font-body text-[10px] tracking-[0.1em] uppercase text-stone/40 mb-1">
          {label}
        </span>
      )}
      <div className={`relative ${SIZE_CLASSES[size]} overflow-hidden rounded-lg`}>
        {/* Actual AdSense unit */}
        <ins
          ref={adRef as any}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={slotId}
          data-ad-format={size === "fluid" ? "fluid" : "auto"}
          data-full-width-responsive={size === "fluid" ? "true" : undefined}
        />
        {/* Fallback placeholder (shown while AdSense loads or if blocked) */}
        <AdPlaceholder size={size} label="Advertisement" />
      </div>
    </div>
  );
}

// ── Visual Placeholder (shows while AdSense loads) ──
function AdPlaceholder({ size, label }: { size: AdSize; label: string }) {
  const dims = SIZE_CLASSES[size];
  const isAnchor = size === "anchor";

  if (isAnchor) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-[320px] h-[50px] bg-gradient-to-r from-sand to-warm-white border border-stone/10 rounded flex items-center justify-center">
          <span className="font-body text-[11px] text-stone/40">{label}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${dims} bg-gradient-to-br from-sand via-warm-white to-sand border border-stone/10 rounded-lg flex flex-col items-center justify-center gap-2 overflow-hidden relative`}>
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-2 left-2 w-8 h-8 border border-deep-forest rounded-full" />
        <div className="absolute top-6 right-4 w-4 h-4 border border-ocean rounded-full" />
        <div className="absolute bottom-4 left-6 w-6 h-6 border border-deep-forest rounded-full" />
        <div className="absolute bottom-2 right-8 w-3 h-3 border border-stone rounded-full" />
      </div>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-stone/30">
        <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="font-body text-[10px] tracking-[0.08em] uppercase text-stone/30 relative z-10">
        {label}
      </span>
    </div>
  );
}

// ── Inline Content Ad (between sections) ──
export function InlineAd({ slot = "in_article", className = "" }: { slot?: keyof typeof AD_SLOTS; className?: string }) {
  return (
    <div className={`my-8 flex justify-center ${className}`}>
      <AdBanner slot={slot} size="large-rectangle" label="Sponsored" />
    </div>
  );
}

// ── Sidebar Ad ──
export function SidebarAd({ slot = "sidebar" }: { slot?: keyof typeof AD_SLOTS }) {
  return (
    <div className="sticky top-24">
      <AdBanner slot={slot} size="half-page" label="Sponsored" />
    </div>
  );
}

// ── Leaderboard Ad (top/bottom of page) ──
export function LeaderboardAd({ slot = "homepage_top", position = "top" }: { slot?: keyof typeof AD_SLOTS; position?: "top" | "bottom" }) {
  const pt = position === "top" ? "pt-6" : "pt-0";
  const pb = position === "bottom" ? "pb-6" : "pb-0";
  return (
    <div className={`flex justify-center ${pt} ${pb}`}>
      <AdBanner slot={slot} size="leaderboard" label="Advertisement" />
    </div>
  );
}

// ── Mobile Anchor Ad ──
export function MobileAnchorAd() {
  return <AdBanner slot="anchor" size="anchor" />;
}

// ── Ad Preview Component (for dev/design review) ──
export function AdPreview() {
  const sizes: { name: string; size: AdSize }[] = [
    { name: "Leaderboard (728x90)", size: "leaderboard" },
    { name: "Large Leaderboard (970x90)", size: "large-leaderboard" },
    { name: "Medium Rectangle (300x250)", size: "medium-rectangle" },
    { name: "Large Rectangle (336x280)", size: "large-rectangle" },
    { name: "Half Page (300x600)", size: "half-page" },
    { name: "Skyscraper (160x600)", size: "skyscraper" },
    { name: "Mobile Banner (320x50)", size: "mobile-banner" },
    { name: "Large Mobile (320x100)", size: "large-mobile" },
    { name: "Square (250x250)", size: "square" },
    { name: "Billboard (970x250)", size: "billboard" },
    { name: "Fluid (Responsive)", size: "fluid" },
  ];

  return (
    <div className="min-h-screen bg-sand p-8">
      <h1 className="font-display text-[36px] text-deep-forest mb-2">Ad Placement Preview</h1>
      <p className="font-body text-[14px] text-stone mb-8">
        All ad units are configured with AdSense ID <code className="bg-warm-white px-2 py-1 rounded text-[13px]">{AD_CLIENT}</code>.
        Replace placeholder slot IDs with your actual AdSense ad unit IDs once approved.
      </p>

      <div className="space-y-8">
        {sizes.map(({ name, size }) => (
          <div key={size} className="bg-warm-white rounded-xl p-6 border border-stone/10">
            <h3 className="font-body text-[14px] font-semibold text-deep-forest mb-4">{name}</h3>
            <div className="flex justify-center">
              <AdPlaceholder size={size} label="Your Ad Here" />
            </div>
          </div>
        ))}
      </div>

      {/* Anchor ad demo */}
      <div className="mt-8 bg-warm-white rounded-xl p-6 border border-stone/10">
        <h3 className="font-body text-[14px] font-semibold text-deep-forest mb-4">Anchor Ad (Bottom Sticky — Mobile)</h3>
        <div className="relative h-[120px] bg-deep-forest/5 rounded-lg overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-gray-200 p-2 flex justify-center">
            <AdPlaceholder size="anchor" label="Anchor Ad" />
          </div>
        </div>
      </div>
    </div>
  );
}
