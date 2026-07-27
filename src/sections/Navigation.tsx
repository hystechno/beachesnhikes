import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MapPin, Globe, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Regions", href: "#regions" },
  { label: "Trails", href: "/trails", isPage: true },
  { label: "Beaches", href: "/beaches", isPage: true },
  { label: "Blog", href: "/blog", isPage: true },
  { label: "Surf", href: "#surf" },
  { label: "Family", href: "#family" },
  { label: "Map", href: "#map" },
];

const islands = [
  { label: "Oahu", path: "/oahu", desc: "Trails, Beaches & Surf" },
  { label: "Maui", path: "/maui", desc: "The Valley Isle" },
  { label: "Kauai", path: "/kauai", desc: "The Garden Isle" },
  { label: "Big Island", path: "/bigisland", desc: "Hawaii Island" },
];

const languages = [
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "zh-CN", label: "简体中文" },
  { code: "zh-TW", label: "繁體中文" },
  { code: "es", label: "Español" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [islandsOpen, setIslandsOpen] = useState(false);
  const islandsRef = useRef<HTMLDivElement>(null);
  const [currentLang, setCurrentLang] = useState("en");
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const gtCheckRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close islands dropdown on click outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (islandsRef.current && !islandsRef.current.contains(e.target as Node)) {
        setIslandsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Wait for Google Translate to be ready
  useEffect(() => {
    const checkReady = () => {
      const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
      if (combo && (window as any).google?.translate) {
        if (gtCheckRef.current) clearInterval(gtCheckRef.current);
      }
    };
    checkReady();
    gtCheckRef.current = setInterval(checkReady, 500);
    return () => {
      if (gtCheckRef.current) clearInterval(gtCheckRef.current);
    };
  }, []);

  const doTranslate = (lang: string) => {
    if (lang === "en") {
      // Restore original language
      const restoreEl = document.querySelector(".goog-te-banner-frame") as HTMLIFrameElement | null;
      if (restoreEl && (restoreEl as any).contentDocument) {
        const closeBtn = (restoreEl as any).contentDocument.querySelector(".goog-close-link");
        if (closeBtn) (closeBtn as HTMLElement).click();
      }
      // Alternative: reload page to original
      if (window.location.hash.includes("googtrans")) {
        window.location.hash = "";
        window.location.reload();
      }
      return;
    }
    // Programmatically trigger Google Translate
    const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (combo) {
      combo.value = lang;
      combo.dispatchEvent(new Event("change"));
    } else {
      // Fallback: use Google Translate cookie + reload
      const domain = window.location.hostname;
      document.cookie = `googtrans=/en/${lang}; domain=.${domain}; path=/;`;
      window.location.reload();
    }
  };

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setCurrentLang(lang);
    doTranslate(lang);
  };

  const handleNav = (href: string, isPage?: boolean) => {
    setMobileOpen(false);
    if (isPage) {
      navigate(href);
    } else if (isHome) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Full page navigation for anchor links from sub-pages
      window.location.href = "/" + href;
    }
  };

  const scrollToTop = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
    setMobileOpen(false);
  };

  // Determine text color based on page and scroll
  const textColor = !isHome || scrolled ? "text-deep-forest" : "text-warm-white";
  const bgClass = !isHome || scrolled ? "bg-warm-white/95 backdrop-blur-xl shadow-sm" : "bg-transparent";

  const langSelectBg = !isHome || scrolled
    ? "bg-deep-forest/5 border-deep-forest/20 text-deep-forest"
    : "bg-black/30 border-white/30 text-warm-white";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 h-[68px] flex items-center justify-between transition-all duration-300 ${bgClass}`}
        style={{ padding: "0 clamp(24px, 4vw, 64px)" }}>
        <button onClick={scrollToTop} className={`font-body text-[13px] font-semibold tracking-[0.1em] uppercase transition-colors ${textColor}`}>
          BEACHES & HIKES
        </button>

        {/* Desktop Nav + Explore */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            link.isPage ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`font-body text-[13px] tracking-[0.08em] uppercase transition-colors hover:opacity-70 ${textColor}`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                className={`font-body text-[13px] tracking-[0.08em] uppercase transition-colors hover:opacity-70 ${textColor}`}
              >
                {link.label}
              </a>
            )
          ))}
          {/* Islands Dropdown */}
          <div ref={islandsRef} className="relative">
            <button
              onClick={() => setIslandsOpen(!islandsOpen)}
              className={`font-body text-[13px] tracking-[0.08em] uppercase transition-colors hover:opacity-70 flex items-center gap-1 ${textColor}`}
            >
              Islands <ChevronDown size={12} className={`transition-transform ${islandsOpen ? "rotate-180" : ""}`} />
            </button>
            {islandsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[200px] bg-warm-white rounded-xl shadow-lg shadow-deep-forest/10 border border-deep-forest/5 overflow-hidden py-2">
                {islands.map((island) => (
                  <Link
                    key={island.label}
                    to={island.path}
                    onClick={() => setIslandsOpen(false)}
                    className={`flex flex-col px-4 py-2.5 transition-colors ${location.pathname === island.path ? "bg-sand/50" : "hover:bg-sand/30"}`}
                  >
                    <span className="font-body text-[13px] font-medium text-deep-forest">{island.label}</span>
                    <span className="font-body text-[11px] text-stone">{island.desc}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/trails"
            className={`font-body text-[12px] tracking-[0.1em] uppercase px-5 py-2 rounded-full border transition-all duration-300 hover:bg-deep-forest hover:text-sand flex items-center gap-1.5 ${!isHome || scrolled ? "border-deep-forest text-deep-forest" : "border-warm-white/50 text-warm-white"}`}
          >
            <MapPin size={13} /> Explore
          </Link>
        </div>

        {/* Right side: Language selector */}
        <div className="hidden lg:flex items-center gap-2">
          <Globe size={14} className={`${textColor} opacity-60`} />
          <select
            value={currentLang}
            onChange={handleLangChange}
            className={`lang-select font-body text-[12px] tracking-[0.05em] px-3 py-1.5 rounded-full border transition-all duration-300 hover:opacity-80 outline-none cursor-pointer ${langSelectBg}`}
            aria-label="Select language"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile hamburger */}
        <div className="flex lg:hidden items-center gap-3">
          <select
            value={currentLang}
            onChange={handleLangChange}
            className={`lang-select font-body text-[11px] px-2 py-1 rounded-full border outline-none ${langSelectBg}`}
            aria-label="Select language"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.code === "zh-CN" ? "简" : lang.code === "zh-TW" ? "繁" : lang.code === "ja" ? "日" : lang.code === "ko" ? "한" : lang.code === "es" ? "Es" : "En"}
              </option>
            ))}
          </select>
          <button className="flex flex-col gap-1.5" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <span className={`w-6 h-[2px] transition-all ${textColor} ${mobileOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
            <span className={`w-6 h-[2px] transition-all ${textColor} ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-[2px] transition-all ${textColor} ${mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-warm-white flex flex-col items-center justify-center gap-6 overflow-y-auto py-20">
          <button onClick={() => setMobileOpen(false)} className="absolute top-5 right-6 text-deep-forest font-body text-[24px]">&times;</button>
          {navLinks.map((link) => (
            link.isPage ? (
              <Link key={link.label} to={link.href} onClick={() => setMobileOpen(false)} className="font-display text-[32px] text-deep-forest">{link.label}</Link>
            ) : (
              <a key={link.label} href={link.href} onClick={(e) => { e.preventDefault(); handleNav(link.href); }} className="font-display text-[32px] text-deep-forest">{link.label}</a>
            )
          ))}
          <div className="w-16 h-[1px] bg-deep-forest/20 my-2" />
          <p className="font-body text-[11px] tracking-[0.15em] uppercase text-stone">Islands</p>
          {islands.map((island) => (
            <Link
              key={island.label}
              to={island.path}
              onClick={() => setMobileOpen(false)}
              className={`font-display text-[24px] ${location.pathname === island.path ? "text-ocean" : "text-deep-forest"}`}
            >
              {island.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
