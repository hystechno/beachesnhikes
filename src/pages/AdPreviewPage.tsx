import { Link } from "react-router-dom";
import { AdBanner, InlineAd, LeaderboardAd, SidebarAd } from "../components/AdBanner";

export default function AdPreviewPage() {
  return (
    <div className="min-h-screen bg-sand">
      {/* Header */}
      <div className="bg-deep-forest text-warm-white" style={{ padding: "120px clamp(24px, 4vw, 64px) 60px" }}>
        <div className="max-w-[1400px] mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 font-body text-[14px] text-sand/70 hover:text-sand transition-colors mb-6">
            &larr; Back to Home
          </Link>
          <h1 className="font-display text-[48px] md:text-[72px] leading-[1.05] tracking-[-1px]">Ad Placement Preview</h1>
          <p className="font-body text-[18px] text-sand/80 max-w-[700px] mt-4 leading-relaxed">
            All ad units configured with AdSense ID <code className="bg-warm-white/20 px-2 py-1 rounded text-[15px]">ca-pub-8538793806490766</code>.
            Replace placeholder slot IDs with actual AdSense ad unit IDs after approval.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto" style={{ padding: "60px clamp(24px, 4vw, 64px)" }}>

        {/* Section 1: Leaderboard Ads */}
        <section className="mb-16">
          <h2 className="font-display text-[28px] text-deep-forest mb-2">Leaderboard Ads (728x90)</h2>
          <p className="font-body text-[14px] text-stone mb-6">Used at top/bottom of pages. Best for homepage, trails, beaches.</p>
          <div className="bg-warm-white rounded-xl p-8 border border-stone/10">
            <LeaderboardAd slot="homepage_top" position="top" />
          </div>
        </section>

        {/* Section 2: Inline Content Ads */}
        <section className="mb-16">
          <h2 className="font-display text-[28px] text-deep-forest mb-2">Inline Content Ads (336x280)</h2>
          <p className="font-body text-[14px] text-stone mb-6">Inserted between content sections. High visibility, natural flow.</p>
          <div className="bg-warm-white rounded-xl p-8 border border-stone/10">
            <InlineAd slot="content_mid" />
          </div>
        </section>

        {/* Section 3: Sidebar Ads */}
        <section className="mb-16">
          <h2 className="font-display text-[28px] text-deep-forest mb-2">Sidebar Ads (300x600)</h2>
          <p className="font-body text-[14px] text-stone mb-6">Sticky sidebar on blog posts. Largest format, highest CTR.</p>
          <div className="bg-warm-white rounded-xl p-8 border border-stone/10 flex justify-center">
            <SidebarAd slot="sidebar" />
          </div>
        </section>

        {/* Section 4: Medium Rectangle */}
        <section className="mb-16">
          <h2 className="font-display text-[28px] text-deep-forest mb-2">Medium Rectangle (300x250)</h2>
          <p className="font-body text-[14px] text-stone mb-6">Standard inline ad. Used in content and blog posts.</p>
          <div className="bg-warm-white rounded-xl p-8 border border-stone/10 flex justify-center">
            <AdBanner slot="content_inline" size="medium-rectangle" label="Sponsored" />
          </div>
        </section>

        {/* Section 5: Mobile Banner */}
        <section className="mb-16">
          <h2 className="font-display text-[28px] text-deep-forest mb-2">Mobile Banner (320x50)</h2>
          <p className="font-body text-[14px] text-stone mb-6">Compact mobile-only format. Shows below header on small screens.</p>
          <div className="bg-warm-white rounded-xl p-8 border border-stone/10 flex justify-center">
            <AdBanner slot="anchor" size="mobile-banner" label="Sponsored" />
          </div>
        </section>

        {/* Section 6: Fluid/Responsive */}
        <section className="mb-16">
          <h2 className="font-display text-[28px] text-deep-forest mb-2">Fluid Responsive Ad</h2>
          <p className="font-body text-[14px] text-stone mb-6">Full-width responsive unit. Adapts to container width.</p>
          <div className="bg-warm-white rounded-xl p-8 border border-stone/10">
            <AdBanner slot="content_mid" size="fluid" label="Sponsored" />
          </div>
        </section>

        {/* Section 7: Anchor Ad Demo */}
        <section className="mb-16">
          <h2 className="font-display text-[28px] text-deep-forest mb-2">Anchor Ad (Bottom Sticky)</h2>
          <p className="font-body text-[14px] text-stone mb-6">Fixed to bottom of viewport on mobile. Highest viewability.</p>
          <div className="bg-warm-white rounded-xl p-8 border border-stone/10 relative h-[200px] overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-gray-200 backdrop-blur-sm z-50">
              <div className="max-w-[728px] mx-auto px-4 py-2 flex items-center justify-between gap-4">
                <div className="w-[320px] h-[50px] bg-gradient-to-r from-sand to-warm-white border border-stone/10 rounded flex items-center justify-center">
                  <span className="font-body text-[11px] text-stone/40">Anchor Ad - Mobile</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Summary of all placements */}
        <section className="mb-16">
          <h2 className="font-display text-[28px] text-deep-forest mb-4">Ad Placement Map</h2>
          <div className="bg-warm-white rounded-xl p-6 border border-stone/10">
            <table className="w-full font-body text-[14px]">
              <thead>
                <tr className="border-b border-stone/10 text-left">
                  <th className="pb-3 text-deep-forest font-semibold">Page</th>
                  <th className="pb-3 text-deep-forest font-semibold">Ad Type</th>
                  <th className="pb-3 text-deep-forest font-semibold">Location</th>
                  <th className="pb-3 text-deep-forest font-semibold">Slot ID</th>
                </tr>
              </thead>
              <tbody className="text-stone">
                <tr className="border-b border-stone/5"><td className="py-3">Homepage</td><td>Leaderboard</td><td>Below Regions</td><td><code>homepage_top</code></td></tr>
                <tr className="border-b border-stone/5"><td className="py-3">Homepage</td><td>Inline (336x280)</td><td>Between Trails & Beaches</td><td><code>content_inline</code></td></tr>
                <tr className="border-b border-stone/5"><td className="py-3">Homepage</td><td>Inline (336x280)</td><td>Between Blogs & Surf</td><td><code>content_mid</code></td></tr>
                <tr className="border-b border-stone/5"><td className="py-3">Homepage</td><td>Leaderboard</td><td>Above Footer</td><td><code>homepage_bottom</code></td></tr>
                <tr className="border-b border-stone/5"><td className="py-3">Trails</td><td>Leaderboard</td><td>Below Page Header</td><td><code>trails_top</code></td></tr>
                <tr className="border-b border-stone/5"><td className="py-3">Trails</td><td>Inline (336x280)</td><td>Below Trail Grid</td><td><code>trails_mid</code></td></tr>
                <tr className="border-b border-stone/5"><td className="py-3">Beaches</td><td>Leaderboard</td><td>Below Page Header</td><td><code>beaches_top</code></td></tr>
                <tr className="border-b border-stone/5"><td className="py-3">Beaches</td><td>Inline (336x280)</td><td>Below Beach Grid</td><td><code>beaches_mid</code></td></tr>
                <tr className="border-b border-stone/5"><td className="py-3">Blog List</td><td>Leaderboard</td><td>Below Page Header</td><td><code>blog_sidebar</code></td></tr>
                <tr className="border-b border-stone/5"><td className="py-3">Blog List</td><td>Inline (336x280)</td><td>Below Blog Grid</td><td><code>blog_inline</code></td></tr>
                <tr className="border-b border-stone/5"><td className="py-3">Blog Post</td><td>Sidebar (300x600)</td><td>Right sidebar (desktop)</td><td><code>blog_sidebar</code></td></tr>
                <tr className="border-b border-stone/5"><td className="py-3">Blog Post</td><td>Inline (336x280)</td><td>After 3rd paragraph</td><td><code>blog_inline</code></td></tr>
                <tr className="border-b border-stone/5"><td className="py-3">Blog Post</td><td>Inline (336x280)</td><td>Below excerpt (mobile)</td><td><code>blog_inline</code></td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Next Steps */}
        <section className="bg-deep-forest rounded-xl p-8 text-center">
          <h2 className="font-display text-[24px] text-warm-white">Ready to Go Live?</h2>
          <p className="font-body text-[15px] text-warm-white/80 mt-3 max-w-[600px] mx-auto leading-relaxed">
            Once Google AdSense approves your site, create ad units in your dashboard and replace the placeholder slot IDs in <code className="bg-warm-white/20 px-2 py-1 rounded">src/components/AdBanner.tsx</code>.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <Link to="/" className="px-6 py-2.5 bg-ocean text-warm-white rounded-full font-body text-[14px] hover:bg-warm-white hover:text-deep-forest transition-colors">
              Back to Homepage
            </Link>
            <Link to="/trails" className="px-6 py-2.5 border border-warm-white/30 text-warm-white rounded-full font-body text-[14px] hover:bg-warm-white hover:text-deep-forest transition-colors">
              View Trails Page
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
