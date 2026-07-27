import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BreadcrumbSchema } from "../components/SchemaMarkup";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-warm-white pt-[68px]">
      <Helmet>
        <title>Privacy Policy | Hawaii Beaches & Hikes</title>
        <meta name="description" content="Beaches & Hikes privacy policy. Learn how we collect, use, and protect your personal information when you visit our Hawaii travel guide website." />
        <meta property="og:title" content="Privacy Policy | Beaches & Hikes" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.beachesnhikes.com/privacy" />
      </Helmet>
      <BreadcrumbSchema items={[{ name: "Home", url: "https://www.beachesnhikes.com/" }, { name: "Privacy Policy", url: "https://www.beachesnhikes.com/privacy" }]} />
      <div className="max-w-[800px] mx-auto px-6 md:px-10 py-16">
        <h1 className="font-display text-[36px] md:text-[48px] text-deep-forest leading-tight mb-4">Privacy Policy</h1>
        <p className="font-body text-[14px] text-stone mb-12">Last updated: May 26, 2026</p>

        <div className="space-y-8 font-body text-[16px] text-deep-forest/80 leading-[1.75]">
          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">1. Introduction</h2>
            <p>Beaches & Hikes (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at beachesnhikes.com (the &ldquo;Site&rdquo;). Please read this policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Site.</p>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">2. Information We Collect</h2>
            <p className="mb-3"><strong>Personal Data:</strong> We may collect personally identifiable information, such as your name and email address, that you voluntarily provide to us when you register on the Site, subscribe to our newsletter, or contact us.</p>
            <p className="mb-3"><strong>Usage Data:</strong> We automatically collect certain information when you visit our Site, including your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Site.</p>
            <p><strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, tracking pixels, and other tracking technologies to help customize the Site and improve your experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect in the following ways:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To operate, maintain, and improve our Site and services</li>
              <li>To send you newsletters, updates, and promotional materials (with your consent)</li>
              <li>To respond to your comments, questions, and requests</li>
              <li>To monitor and analyze usage and trends to improve your experience</li>
              <li>To protect against fraudulent, unauthorized, or illegal activity</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">4. Google AdSense & Advertising</h2>
            <p className="mb-3">We use Google AdSense to display advertisements on our Site. Google, as a third-party vendor, uses cookies to serve ads based on your prior visits to our Site and other websites on the Internet.</p>
            <p className="mb-3">Google&rsquo;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our Site and/or other sites on the Internet.</p>
            <p className="mb-3">Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-ocean hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>. You can also opt out of a third-party vendor&rsquo;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" className="text-ocean hover:underline" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.</p>
            <p>We also use Google Analytics to understand how visitors engage with our Site. Google Analytics uses cookies and similar technologies to collect and analyze information about use of the Site. You can learn about Google&rsquo;s practices by going to <a href="https://www.google.com/policies/privacy/partners/" className="text-ocean hover:underline" target="_blank" rel="noopener noreferrer">www.google.com/policies/privacy/partners/</a>.</p>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">5. Third-Party Disclosure</h2>
            <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except as described in this Privacy Policy. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">6. Data Security</h2>
            <p>We implement appropriate technical and organizational security measures to protect your personal information. However, please be aware that no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">7. Your Rights</h2>
            <p className="mb-3">Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to access personal data we hold about you</li>
              <li>The right to request correction of inaccurate data</li>
              <li>The right to request deletion of your personal data</li>
              <li>The right to opt out of marketing communications</li>
              <li>The right to withdraw consent where processing is based on consent</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">8. Children&rsquo;s Privacy</h2>
            <p>Our Site is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.</p>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date. You are advised to review this Privacy Policy periodically for any changes.</p>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:info@beachesnhikes.com" className="text-ocean hover:underline">info@beachesnhikes.com</a></p>
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
