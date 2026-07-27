import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import TrailsPage from "./pages/TrailsPage";
import BeachesPage from "./pages/BeachesPage";
import BlogPage from "./pages/BlogPage";
import BlogPost from "./pages/BlogPost";
import VideoWatchPage from "./pages/VideoWatchPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MauiPage from "./pages/MauiPage";
import KauaiPage from "./pages/KauaiPage";
import BigIslandPage from "./pages/BigIslandPage";
import OahuPage from "./pages/OahuPage";
import Navigation from "./sections/Navigation";
import Footer from "./sections/Footer";
import CookieConsent from "./components/CookieConsent";
import "./App.css";

function ScrollToTopAndTrack() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    // GA4 SPA route tracking — send page_view on every route change
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-sand flex flex-col">
      <ScrollToTopAndTrack />
      <Navigation />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trails" element={<TrailsPage />} />
          <Route path="/beaches" element={<BeachesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/videos/oahu-guide" element={<VideoWatchPage />} />
          <Route path="/oahu" element={<OahuPage />} />
          <Route path="/maui" element={<MauiPage />} />
          <Route path="/kauai" element={<KauaiPage />} />
          <Route path="/bigisland" element={<BigIslandPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
      <CookieConsent />
    </div>
  );
}
