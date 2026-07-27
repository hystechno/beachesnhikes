import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Mountain, Umbrella, Waves, BookOpen, Mail, ArrowLeft } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-warm-white pt-[68px]">
      <Helmet>
        <title>About Us | Hawaii Beaches & Hikes - Trail & Beach Guides</title>
        <meta name="description" content="Beaches & Hikes is your complete guide to beaches, hiking trails, and surf breaks across Oahu, Maui, Kauai, and the Big Island. Discover Hawaii responsibly." />
        <meta property="og:title" content="About Beaches & Hikes | Hawaii Travel Guide" />
        <meta property="og:description" content="Your complete guide to beaches, hiking trails, and surf breaks across all Hawaiian Islands." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.beachesnhikes.com/about" />
      </Helmet>

      <div className="max-w-[800px] mx-auto px-6 md:px-10 py-16">
        <h1 className="font-display text-[36px] md:text-[48px] text-deep-forest leading-tight mb-4">About Beaches & Hikes</h1>
        <p className="font-body text-[16px] text-stone mb-12">Your complete guide to exploring Hawaii&apos;s beaches, trails, and surf across Oahu, Maui, Kauai, and the Big Island.</p>

        <div className="space-y-8 font-body text-[16px] text-deep-forest/80 leading-[1.75]">
          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">Our Story</h2>
            <p className="mb-4">Beaches & Hikes was created with a simple mission: to help travelers and locals alike discover the incredible natural beauty of Hawaii. Born from a deep love for the islands&apos; outdoors, our site is the result of countless hours spent hiking trails, swimming at beaches, and chasing waves across the Hawaiian Islands.</p>
            <p>What started as personal notes and recommendations for friends quickly grew into a comprehensive resource covering every major trail, beach, and surf break on Oahu, Maui, Kauai, and the Big Island. Today, we&apos;re proud to offer detailed guides, insider tips, and practical advice to help you make the most of your time in paradise.</p>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">What We Cover</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-sand/30 border border-deep-forest/5">
                <Mountain className="w-7 h-7 text-ocean mb-2" strokeWidth={1.5} />
                <h3 className="font-display text-[18px] text-deep-forest mb-2">Hiking Trails</h3>
                <p className="text-[15px]">Detailed guides to 60+ trails across all islands, with difficulty ratings, duration estimates, and insider tips for the best experience.</p>
              </div>
              <div className="p-6 rounded-xl bg-sand/30 border border-deep-forest/5">
                <Umbrella className="w-7 h-7 text-ocean mb-2" strokeWidth={1.5} />
                <h3 className="font-display text-[18px] text-deep-forest mb-2">Beaches</h3>
                <p className="text-[15px]">Comprehensive beach guides covering swimming, snorkeling, surfing, and family-friendly spots across all four major islands.</p>
              </div>
              <div className="p-6 rounded-xl bg-sand/30 border border-deep-forest/5">
                <Waves className="w-7 h-7 text-ocean mb-2" strokeWidth={1.5} />
                <h3 className="font-display text-[18px] text-deep-forest mb-2">Surf Breaks</h3>
                <p className="text-[15px]">From beginner-friendly Waikiki to world-famous Pipeline, we cover Hawaii&apos;s best surf spots with conditions and safety info.</p>
              </div>
              <div className="p-6 rounded-xl bg-sand/30 border border-deep-forest/5">
                <BookOpen className="w-7 h-7 text-ocean mb-2" strokeWidth={1.5} />
                <h3 className="font-display text-[18px] text-deep-forest mb-2">Travel Guides</h3>
                <p className="text-[15px]">In-depth blog posts with practical advice, seasonal recommendations, and local knowledge you won&apos;t find elsewhere.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">Our Approach</h2>
            <p className="mb-4">We believe in responsible travel. Every guide on our site emphasizes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Respect for nature</strong> — Stay on marked trails, don&apos;t touch coral, and follow Leave No Trace principles</li>
              <li><strong>Safety first</strong> — Current conditions, hazard warnings, and practical safety advice for every activity</li>
              <li><strong>Supporting local communities</strong> — Recommending local businesses, respecting cultural sites, and giving back</li>
              <li><strong>Accurate, up-to-date information</strong> — Regularly reviewing and updating our guides to ensure reliability</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">Affiliate Disclosure</h2>
            <p>Beaches & Hikes participates in affiliate marketing programs, including the Amazon Associates Program and travel affiliate networks. This means we may earn a small commission when you make purchases through links on our site, at no additional cost to you. These commissions help support the ongoing creation of free, high-quality content. Our recommendations are always based on genuine belief in the product or service&apos;s value.</p>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">Get in Touch</h2>
            <p className="mb-4">Have a question, suggestion, or correction? We&apos;d love to hear from you.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:info@beachesnhikes.com" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-deep-forest text-sand font-body text-[14px] hover:bg-deep-forest/80 transition-all">
                <Mail size={15} /> Email Us
              </a>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-deep-forest/30 text-deep-forest font-body text-[14px] hover:bg-deep-forest hover:text-sand transition-all">
                Contact Form
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-deep-forest/10">
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-deep-forest/30 text-deep-forest font-body text-[14px] hover:bg-deep-forest hover:text-sand transition-all duration-300">
            <ArrowLeft size={15} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
