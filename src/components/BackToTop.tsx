import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { analytics } from "../hooks/useAnalytics";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => { analytics.backToTop(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full border border-deep-forest/20 bg-warm-white/90 backdrop-blur-sm flex items-center justify-center text-deep-forest hover:bg-deep-forest hover:text-sand transition-all duration-300 shadow-lg"
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}
