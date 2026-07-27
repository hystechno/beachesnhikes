import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogPosts } from "../blogData";
import { analytics } from "../hooks/useAnalytics";
import { ArticleSchema, BreadcrumbSchema } from "../components/SchemaMarkup";
import { ArrowLeft, ArrowRight, Share2 } from "lucide-react";

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((b) => b.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-[48px] text-deep-forest">Post Not Found</h1>
          <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-deep-forest/30 text-deep-forest font-body text-[15px] hover:bg-deep-forest hover:text-sand transition-all duration-300 mt-4">
            <ArrowLeft size={15} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Related posts: same category, excluding current
  const relatedPosts = blogPosts
    .filter((b) => b.category === post.category && b.id !== post.id)
    .slice(0, 3);

  // If not enough same-category, fill with other recent posts
  const fillPosts = blogPosts
    .filter((b) => b.id !== post.id && !relatedPosts.find((r) => r.id === b.id))
    .slice(0, 3 - relatedPosts.length);

  const allRelated = [...relatedPosts, ...fillPosts];

  const idx = blogPosts.findIndex((b) => b.id === post.id);
  const prev = idx > 0 ? blogPosts[idx - 1] : null;
  const next = idx < blogPosts.length - 1 ? blogPosts[idx + 1] : null;

  const breadcrumbItems = [
    { name: "Home", url: "https://www.beachesnhikes.com/" },
    { name: "Blog", url: "https://www.beachesnhikes.com/blog" },
    { name: post.title, url: `https://www.beachesnhikes.com/blog/${post.id}` },
  ];

  // Convert date to ISO format for schema
  const isoDate = new Date(post.date).toISOString();

  const handlePinterestShare = () => {
    const url = encodeURIComponent(`https://www.beachesnhikes.com/blog/${post.id}`);
    const description = encodeURIComponent(post.title);
    const image = encodeURIComponent(`https://www.beachesnhikes.com${post.image}`);
    window.open(
      `https://pinterest.com/pin/create/button/?url=${url}&media=${image}&description=${description}`,
      "_blank",
      "width=750,height=550"
    );
    analytics.ctaClick("pinterest_share", post.title);
  };

  return (
    <div className="min-h-screen bg-warm-white">
      <Helmet>
        <title>{post.title} | Beaches & Hikes</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | Beaches & Hikes`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={`https://www.beachesnhikes.com${post.image}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.beachesnhikes.com/blog/${post.id}`} />
        <meta property="article:published_time" content={isoDate} />
        <meta property="article:modified_time" content={isoDate} />
        <meta property="article:author" content="Beaches & Hikes" />
        <meta property="article:section" content={post.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | Beaches & Hikes`} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={`https://www.beachesnhikes.com${post.image}`} />
      </Helmet>

      <ArticleSchema
        headline={post.title}
        description={post.excerpt}
        image={`https://www.beachesnhikes.com${post.image}`}
        datePublished={isoDate}
        dateModified={isoDate}
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] bg-deep-forest">
        <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)" }} />
        <div className="absolute top-0 left-0 right-0 z-10" style={{ padding: "0 clamp(24px, 4vw, 64px)" }}>
          <div className="max-w-[1400px] mx-auto pt-24">
            <Link to="/blog" className="inline-flex items-center gap-2 font-body text-[14px] text-warm-white/70 hover:text-warm-white transition-colors">
              <ArrowLeft size={14} /> Back to Blog
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10" style={{ padding: "0 clamp(24px, 4vw, 64px) 40px" }}>
          <div className="max-w-[800px] mx-auto md:mx-0">
            <span className="font-body text-[12px] tracking-[0.15em] uppercase text-warm-white/80">{post.category}</span>
            <h1 className="font-display text-[36px] md:text-[52px] text-warm-white leading-[1.05] tracking-[-0.5px] mt-2">{post.title}</h1>
            <div className="flex items-center gap-4 mt-4">
              <span className="font-body text-[14px] text-warm-white/70">{post.author}</span>
              <span className="font-body text-[14px] text-warm-white/70">{post.date}</span>
              <span className="font-body text-[14px] text-warm-white/70">{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-[720px] mx-auto" style={{ padding: "60px clamp(24px, 4vw, 64px) 80px" }}>
        <p className="font-display text-[22px] md:text-[26px] text-deep-forest leading-[1.5] italic mb-10">{post.excerpt}</p>

        {post.content.map((paragraph, index) => {
          if (paragraph.startsWith("**") && paragraph.includes("**\n\n")) {
            const title = paragraph.split("**")[1];
            const body = paragraph.split("**\n\n")[1];
            return (
              <div key={index} className="mt-10">
                <h2 className="font-display text-[28px] text-deep-forest leading-tight mb-4">{title}</h2>
                <div className="blog-body" dangerouslySetInnerHTML={{ __html: formatBody(body) }} />
              </div>
            );
          }
          return (
            <div key={index} className="blog-body mt-6" dangerouslySetInnerHTML={{ __html: formatBody(paragraph) }} />
          );
        })}

        {/* Tags */}
        <div className="mt-12 pt-6 border-t border-deep-forest/10">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full border border-stone/25 text-stone font-body text-[12px] tracking-wider uppercase">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Share Buttons */}
        <div className="mt-8 flex items-center gap-3">
          <span className="font-body text-[13px] text-stone">Share:</span>
          <button
            onClick={handlePinterestShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E60023] text-white font-body text-[13px] hover:bg-[#c4001a] transition-all"
          >
            <Share2 size={13} /> Pinterest
          </button>
        </div>

        {/* Post Navigation */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-deep-forest/10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-deep-forest/30 text-deep-forest font-body text-[14px] hover:bg-deep-forest hover:text-sand transition-all duration-300"
          >
            <ArrowLeft size={14} /> All Stories
          </Link>
          <div className="flex items-center gap-3">
            {prev && (
              <Link
                to={`/blog/${prev.id}`}
                onClick={() => analytics.ctaClick("blog_nav_prev", prev.title)}
                className="font-body text-[14px] text-stone hover:text-deep-forest transition-colors"
              >
                <ArrowLeft size={12} className="inline mr-1" />
                {prev.title.length > 25 ? prev.title.slice(0, 25) + "..." : prev.title}
              </Link>
            )}
            {next && (
              <Link
                to={`/blog/${next.id}`}
                onClick={() => analytics.ctaClick("blog_nav_next", next.title)}
                className="font-body text-[14px] text-stone hover:text-deep-forest transition-colors ml-auto"
              >
                {next.title.length > 25 ? next.title.slice(0, 25) + "..." : next.title} <ArrowRight size={12} className="inline ml-1" />
              </Link>
            )}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {allRelated.length > 0 && (
        <section className="bg-sand/30 border-t border-deep-forest/5">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
            <h2 className="font-display text-[28px] text-deep-forest mb-8">Related Stories</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {allRelated.map((related) => (
                <Link
                  key={related.id}
                  to={`/blog/${related.id}`}
                  onClick={() => analytics.ctaClick("blog_related", related.title)}
                  className="group bg-white rounded-2xl overflow-hidden border border-deep-forest/5 hover:shadow-lg hover:shadow-deep-forest/5 transition-all duration-300"
                >
                  <div className="relative h-[160px] overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute bottom-3 left-3 font-body text-[11px] text-warm-white/80 tracking-wider uppercase">{related.category}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-[17px] text-deep-forest leading-tight group-hover:text-ocean transition-colors">{related.title}</h3>
                    <p className="font-body text-[12px] text-stone mt-2 line-clamp-2">{related.excerpt}</p>
                    <span className="inline-flex items-center gap-1 mt-3 font-body text-[12px] text-ocean">
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function formatBody(text: string): string {
  if (!text) return "";
  let html = text
    .replace(/\n\n/g, "</p><p className='mt-4'>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/• (.*)/g, '<li className="flex items-start gap-2 mt-1"><span className="text-ocean flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-ocean"/>$1</li>');

  if (html.includes("<li")) {
    html = `<ul className="mt-3 space-y-1">${html}</ul>`;
  } else {
    html = `<p className="font-body text-[17px] text-deep-forest/80 leading-[1.75]">${html}</p>`;
  }

  return html;
}
