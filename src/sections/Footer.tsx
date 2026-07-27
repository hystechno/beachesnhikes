import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-deep-forest text-warm-white/70">
      <div className="max-w-[1400px] mx-auto" style={{ padding: "60px clamp(24px, 4vw, 64px) 40px" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-body text-[14px] font-semibold tracking-[0.1em] uppercase text-warm-white hover:text-sand transition-colors">
              BEACHES & HIKES
            </Link>
            <p className="font-body text-[13px] mt-3 leading-relaxed text-warm-white/50">
              A complete guide to beaches, hiking trails, and surf breaks across the Hawaiian Islands.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-body text-[12px] font-semibold tracking-[0.15em] uppercase text-warm-white/50 mb-4">Explore</h4>
            <ul className="space-y-2.5">
              <li><Link to="/trails" className="font-body text-[14px] hover:text-sand transition-colors">Hiking Trails</Link></li>
              <li><Link to="/beaches" className="font-body text-[14px] hover:text-sand transition-colors">Beaches</Link></li>
              <li><Link to="/blog" className="font-body text-[14px] hover:text-sand transition-colors">Travel Blog</Link></li>
              <li><a href="/#surf" className="font-body text-[14px] hover:text-sand transition-colors">Surf Spots</a></li>
              <li><a href="/#family" className="font-body text-[14px] hover:text-sand transition-colors">Family Activities</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-body text-[12px] font-semibold tracking-[0.15em] uppercase text-warm-white/50 mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="font-body text-[14px] hover:text-sand transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="font-body text-[14px] hover:text-sand transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="font-body text-[14px] hover:text-sand transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="font-body text-[14px] hover:text-sand transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-body text-[12px] font-semibold tracking-[0.15em] uppercase text-warm-white/50 mb-4">Connect</h4>
            <ul className="space-y-2.5">
              <li><a href="https://www.pinterest.com/beachesnhikes" target="_blank" rel="noopener noreferrer" className="font-body text-[14px] hover:text-sand transition-colors">Pinterest</a></li>
              <li><a href="mailto:info@beachesnhikes.com" className="font-body text-[14px] hover:text-sand transition-colors">Email Us</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-warm-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-[12px] text-warm-white/40">
            &copy; 2026 Beaches & Hikes. All rights reserved.
          </p>
          <p className="font-body text-[12px] text-warm-white/40">
            Hawaii, USA
          </p>
        </div>
      </div>
    </footer>
  );
}
