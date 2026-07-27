import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogPosts } from "../blogData";
import { analytics } from "../hooks/useAnalytics";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-sand">
      <Helmet>
        <title>Oahu Travel Blog | Trails, Beaches & Surf Guides | Beaches & Hikes</title>
        <meta name="description" content="Detailed travel guides for Oahu, Hawaii — hiking trails, beaches, surf spots, and family activities. Plan your perfect island adventure." />
        <meta property="og:title" content="Oahu Travel Blog | Beaches & Hikes" />
        <meta property="og:description" content="Detailed guides for hiking, beaches, and surf on Oahu. Plan your perfect Hawaii adventure." />
        <meta property="og:image" content="https://www.beachesnhikes.com/images/hero-poster.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.beachesnhikes.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Header */}
      <div className="bg-deep-forest text-warm-white" style={{ padding: "120px clamp(24px, 4vw, 64px) 60px" }}>
        <div className="max-w-[1400px] mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 font-body text-[14px] text-sand/70 hover:text-sand transition-colors mb-6">
            &larr; Back to Home
          </Link>
          <h1 className="font-display text-[48px] md:text-[72px] leading-[1.05] tracking-[-1px]">Blog</h1>
          <p className="font-body text-[18px] text-sand/80 max-w-[600px] mt-4 leading-relaxed">
            Detailed guides, insider tips, and stories from the trails and shores of Oahu.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div style={{ padding: "60px clamp(24px, 4vw, 64px)" }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              onClick={() => analytics.ctaClick("blog_click", post.title)}
              className="block bg-warm-white rounded-xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <div className="overflow-hidden h-[220px]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="font-body text-[11px] tracking-[0.12em] uppercase text-ocean">{post.category}</span>
                <h2 className="font-display text-[22px] text-deep-forest leading-tight mt-1">{post.title}</h2>
                <p className="font-body text-[15px] text-deep-forest/65 mt-2 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="font-body text-[12px] text-stone">{post.date}</span>
                  <span className="font-body text-[12px] text-stone">{post.readTime}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full border border-stone/25 text-stone font-body text-[10px] tracking-wider uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
