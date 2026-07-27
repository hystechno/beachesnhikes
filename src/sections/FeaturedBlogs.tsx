import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { blogPosts } from "../blogData";
import { analytics } from "../hooks/useAnalytics";

gsap.registerPlugin(ScrollTrigger);

const featuredIds = ["diamond-head-sunrise-guide", "pipeline-world-famous-wave", "lanikai-beach-complete-day"];

export default function FeaturedBlogs() {
  const sectionRef = useRef<HTMLElement>(null);

  const featured = featuredIds.map((id) => blogPosts.find((b) => b.id === id)).filter(Boolean);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".blog-card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 90%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="blog" className="bg-warm-white" style={{ padding: "100px clamp(24px, 4vw, 64px)" }}>
      <div className="max-w-[1400px] mx-auto">
        <span className="font-body text-[12px] tracking-[0.15em] uppercase text-ocean font-medium">Stories & Guides</span>
        <h2 className="font-display text-[42px] md:text-[56px] text-deep-forest leading-[1.05] tracking-[-0.5px] mt-2">From the Blog</h2>
        <p className="font-body text-[17px] text-stone leading-[1.6] mt-2 max-w-[500px]">
          Detailed guides, insider tips, and stories from the trails and shores of Oahu.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {featured.map((post) => (
            <div key={post!.id} className="blog-card">
              <Link
                to={`/blog/${post!.id}`}
                onClick={() => analytics.ctaClick("blog_click", post!.title)}
                className="block bg-sand rounded-xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="overflow-hidden h-[200px]">
                  <img
                    src={post!.image}
                    alt={post!.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="font-body text-[11px] tracking-[0.12em] uppercase text-ocean">{post!.category}</span>
                  <h3 className="font-display text-[20px] text-deep-forest leading-tight mt-1">{post!.title}</h3>
                  <p className="font-body text-[14px] text-deep-forest/65 mt-2 line-clamp-2 leading-relaxed">{post!.excerpt}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="font-body text-[12px] text-stone">{post!.date}</span>
                    <span className="font-body text-[12px] text-stone">{post!.readTime}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-deep-forest/30 text-deep-forest font-body text-[15px] hover:bg-deep-forest hover:text-sand transition-all duration-300"
            onClick={() => analytics.ctaClick("view_all_blogs", "home_blog_section")}
          >
            Read All Stories &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
