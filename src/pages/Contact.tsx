import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BreadcrumbSchema } from "../components/SchemaMarkup";
import { Mail, MapPin, Clock, Send, ArrowLeft } from "lucide-react";

const breadcrumbItems = [
  { name: "Home", url: "https://www.beachesnhikes.com/" },
  { name: "Contact", url: "https://www.beachesnhikes.com/contact" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-warm-white pt-[68px]">
      <Helmet>
        <title>Contact Us | Hawaii Beaches & Hikes</title>
        <meta name="description" content="Get in touch with Beaches & Hikes. Questions about Hawaii beaches, trails, or travel tips? We'd love to hear from you." />
        <meta property="og:title" content="Contact Beaches & Hikes" />
        <meta property="og:description" content="Questions about Hawaii beaches and trails? Contact us." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.beachesnhikes.com/contact" />
      </Helmet>
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="max-w-[800px] mx-auto px-6 md:px-10 py-16">
        <h1 className="font-display text-[36px] md:text-[48px] text-deep-forest leading-tight mb-4">Contact Us</h1>
        <p className="font-body text-[16px] text-stone mb-12">Have a question, suggestion, or correction? We&apos;d love to hear from you.</p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-ocean flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display text-[16px] text-deep-forest mb-1">Email</h3>
              <p className="font-body text-[14px] text-deep-forest/60">info@beachesnhikes.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-ocean flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display text-[16px] text-deep-forest mb-1">Location</h3>
              <p className="font-body text-[14px] text-deep-forest/60">Honolulu, Hawaii</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-ocean flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display text-[16px] text-deep-forest mb-1">Response Time</h3>
              <p className="font-body text-[14px] text-deep-forest/60">Within 48 hours</p>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <h2 className="font-display text-[24px] text-green-800 mb-2">Message Sent!</h2>
            <p className="font-body text-[15px] text-green-700">Thank you for reaching out. We&apos;ll get back to you within 48 hours.</p>
            <Link to="/" className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-full border border-deep-forest/30 text-deep-forest font-body text-[14px] hover:bg-deep-forest hover:text-sand transition-all">
              <ArrowLeft size={14} /> Back to Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-body text-[14px] text-deep-forest mb-2">Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-deep-forest/15 bg-white font-body text-[15px] text-deep-forest focus:outline-none focus:border-ocean/50 transition-colors" placeholder="Your name" />
              </div>
              <div>
                <label className="block font-body text-[14px] text-deep-forest mb-2">Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-deep-forest/15 bg-white font-body text-[15px] text-deep-forest focus:outline-none focus:border-ocean/50 transition-colors" placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label className="block font-body text-[14px] text-deep-forest mb-2">Subject</label>
              <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-deep-forest/15 bg-white font-body text-[15px] text-deep-forest focus:outline-none focus:border-ocean/50 transition-colors appearance-none">
                <option value="">Select a topic</option>
                <option value="general">General Question</option>
                <option value="beach">Beach Information</option>
                <option value="trail">Trail Information</option>
                <option value="correction">Correction / Update</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-body text-[14px] text-deep-forest mb-2">Message</label>
              <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-deep-forest/15 bg-white font-body text-[15px] text-deep-forest focus:outline-none focus:border-ocean/50 transition-colors resize-none" placeholder="Tell us what's on your mind..." />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-deep-forest text-sand font-body text-[15px] hover:bg-deep-forest/80 transition-all">
              <Send size={15} /> Send Message
            </button>
          </form>
        )}

        <div className="mt-12 pt-6 border-t border-deep-forest/10">
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-deep-forest/30 text-deep-forest font-body text-[14px] hover:bg-deep-forest hover:text-sand transition-all duration-300">
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
