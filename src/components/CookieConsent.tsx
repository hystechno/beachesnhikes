import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show after a short delay so it doesn't block initial page load
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-warm-white border-t border-deep-forest/10 shadow-lg shadow-deep-forest/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1">
          <p className="font-body text-[14px] text-deep-forest/80 leading-relaxed">
            We use cookies to enhance your experience, serve personalized ads, and analyze traffic. By clicking "Accept All", you consent to our use of cookies.{" "}
            <a href="/privacy" className="text-ocean hover:underline">Learn more in our Privacy Policy</a>.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-5 py-2 rounded-full border border-deep-forest/20 font-body text-[13px] text-deep-forest hover:bg-deep-forest/5 transition-all"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 rounded-full bg-deep-forest font-body text-[13px] text-sand hover:bg-deep-forest/80 transition-all"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
