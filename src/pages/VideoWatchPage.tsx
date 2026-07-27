import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { VideoSchema } from "../components/SchemaMarkup";

export default function VideoWatchPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-focus the video for accessibility
    if (videoRef.current) {
      videoRef.current.focus();
    }
  }, []);

  const videoData = {
    name: "Oahu Hawaii: Trails, Beaches & Surf Guide",
    description: "A cinematic journey through Oahu's best hiking trails, beaches, and surf spots. Discover Diamond Head, Lanikai Beach, the North Shore, and hidden gems across the island.",
    thumbnailUrl: "https://www.beachesnhikes.com/images/hero-poster.jpg",
    contentUrl: "https://www.beachesnhikes.com/videos/hero-ocean.mp4",
    uploadDate: "2026-05-01T00:00:00-10:00",
    duration: "PT5S",
    embedUrl: "https://www.beachesnhikes.com/videos/oahu-guide",
  };

  return (
    <div className="min-h-screen bg-deep-forest">
      <VideoSchema {...videoData} />

      {/* Header */}
      <div className="flex items-center justify-between h-[68px] px-6 md:px-10">
        <Link to="/" className="font-body text-[13px] font-semibold tracking-[0.1em] uppercase text-warm-white hover:text-sand transition-colors">
          BEACHES & HIKES
        </Link>
        <Link to="/" className="font-body text-[13px] text-warm-white/70 hover:text-warm-white transition-colors">
          &larr; Back to Guide
        </Link>
      </div>

      {/* Video Player - Main Content */}
      <main className="max-w-[1200px] mx-auto px-4 md:px-8 pb-16">
        {/* Video Title */}
        <div className="mb-6">
          <h1 className="font-display text-[28px] md:text-[40px] text-warm-white leading-tight">
            {videoData.name}
          </h1>
          <p className="font-body text-[15px] text-warm-white/60 mt-2">
            A cinematic look at Oahu's trails, beaches, and surf breaks
          </p>
        </div>

        {/* Video Player */}
        <div
          className="relative w-full rounded-xl overflow-hidden bg-black/40"
          style={{ aspectRatio: "16/9" }}
          itemScope
          itemType="https://schema.org/VideoObject"
        >
          <meta itemProp="name" content={videoData.name} />
          <meta itemProp="description" content={videoData.description} />
          <meta itemProp="thumbnailUrl" content={videoData.thumbnailUrl} />
          <meta itemProp="contentUrl" content={videoData.contentUrl} />
          <meta itemProp="uploadDate" content="2026-05-01T00:00:00-10:00" />
          <meta itemProp="duration" content={videoData.duration} />
          <link itemProp="embedUrl" href={videoData.embedUrl} />

          <video
            ref={videoRef}
            controls
            playsInline
            preload="metadata"
            poster="/images/hero-poster.jpg"
            src="/videos/hero-ocean.mp4"
            className="w-full h-full object-cover"
            itemProp="contentUrl"
            aria-label="Oahu Hawaii travel guide video showing trails, beaches, and surf spots"
          >
            <p className="text-warm-white text-center p-8">
              Your browser does not support HTML5 video.
              <a href="/videos/hero-ocean.mp4" className="text-ocean underline" download>Download the video</a> instead.
            </p>
          </video>
        </div>

        {/* Video Info */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display text-[22px] text-warm-white mb-3">About This Video</h2>
            <p className="font-body text-[15px] text-warm-white/70 leading-relaxed">
              {videoData.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-[13px] font-body text-warm-white/50">
              <span>Uploaded: May 2026</span>
              <span>Duration: 5 seconds</span>
            </div>
          </div>

          <div>
            <h2 className="font-display text-[22px] text-warm-white mb-3">Explore Oahu</h2>
            <div className="flex flex-col gap-2">
              <Link
                to="/trails"
                className="flex items-center gap-3 p-3 rounded-lg bg-warm-white/5 border border-warm-white/10 hover:bg-warm-white/10 hover:border-ocean/30 transition-all"
              >
                <span className="text-[24px]">🥾</span>
                <div>
                  <p className="font-body text-[14px] text-warm-white font-medium">35 Hiking Trails</p>
                  <p className="font-body text-[12px] text-warm-white/50">From easy walks to expert ridge climbs</p>
                </div>
              </Link>
              <Link
                to="/beaches"
                className="flex items-center gap-3 p-3 rounded-lg bg-warm-white/5 border border-warm-white/10 hover:bg-warm-white/10 hover:border-ocean/30 transition-all"
              >
                <span className="text-[24px]">🏖️</span>
                <div>
                  <p className="font-body text-[14px] text-warm-white font-medium">27 Beaches</p>
                  <p className="font-body text-[12px] text-warm-white/50">Swimming, snorkeling, surfing & family spots</p>
                </div>
              </Link>
              <Link
                to="/blog"
                className="flex items-center gap-3 p-3 rounded-lg bg-warm-white/5 border border-warm-white/10 hover:bg-warm-white/10 hover:border-ocean/30 transition-all"
              >
                <span className="text-[24px]">📖</span>
                <div>
                  <p className="font-body text-[14px] text-warm-white font-medium">Travel Guides</p>
                  <p className="font-body text-[12px] text-warm-white/50">Detailed blog posts for your Oahu trip</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
