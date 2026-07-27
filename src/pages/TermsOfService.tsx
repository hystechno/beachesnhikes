import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BreadcrumbSchema } from "../components/SchemaMarkup";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-warm-white pt-[68px]">
      <Helmet>
        <title>Terms of Service | Hawaii Beaches & Hikes</title>
        <meta name="description" content="Beaches & Hikes terms of service. Read the terms and conditions for using our Hawaii travel guide website." />
        <meta property="og:title" content="Terms of Service | Beaches & Hikes" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.beachesnhikes.com/terms" />
      </Helmet>
      <BreadcrumbSchema items={[{ name: "Home", url: "https://www.beachesnhikes.com/" }, { name: "Terms of Service", url: "https://www.beachesnhikes.com/terms" }]} />
      <div className="max-w-[800px] mx-auto px-6 md:px-10 py-16">
        <h1 className="font-display text-[36px] md:text-[48px] text-deep-forest leading-tight mb-4">Terms of Service</h1>
        <p className="font-body text-[14px] text-stone mb-12">Last updated: May 26, 2026</p>

        <div className="space-y-8 font-body text-[16px] text-deep-forest/80 leading-[1.75]">
          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">1. Agreement to Terms</h2>
            <p>By accessing and using beachesnhikes.com (the &ldquo;Site&rdquo;), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, you should not use our Site. We reserve the right to modify these terms at any time, and such modifications shall be effective immediately upon posting.</p>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">2. Use of the Site</h2>
            <p className="mb-3">You may use our Site for lawful purposes only. You agree not to use the Site:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
              <li>To impersonate or attempt to impersonate Beaches & Hikes, a Beaches & Hikes employee, another user, or any other person or entity</li>
              <li>To engage in any other conduct that restricts or inhibits anyone&rsquo;s use or enjoyment of the Site</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">3. Intellectual Property</h2>
            <p className="mb-3">The Site and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Beaches & Hikes, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
            <p>You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Site without our prior written consent.</p>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">4. User Content</h2>
            <p>Any content you submit to the Site (including comments, reviews, or suggestions) will be considered non-confidential and non-proprietary. By submitting content, you grant us a perpetual, irrevocable, royalty-free, worldwide license to use, reproduce, modify, adapt, publish, translate, and distribute such content in any media.</p>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">5. Disclaimer of Warranties</h2>
            <p className="mb-3">The information provided on this Site is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the Site or the information, products, services, or related graphics contained on the Site for any purpose.</p>
            <p className="mb-3"><strong>Hiking and outdoor activities involve inherent risks.</strong> Trail conditions, access, and regulations change frequently. Always verify current conditions before hiking. Follow all posted signs and warnings. Your use of any information on this Site is solely at your own risk.</p>
            <p>Reliance on any information provided by this Site is solely at your own risk. We are not liable for any injury, loss, or damage arising from your use of the Site or participation in activities described.</p>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">6. Affiliate Disclosure</h2>
            <p>Beaches & Hikes participates in affiliate marketing programs. This means we may earn commissions on purchases made through our affiliate links, at no additional cost to you. We only recommend products and services we believe will add value to our readers. Our editorial content is not influenced by affiliate partnerships.</p>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">7. Limitation of Liability</h2>
            <p>In no event shall Beaches & Hikes, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Site.</p>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">8. External Links</h2>
            <p>Our Site may contain links to third-party websites or services that are not owned or controlled by Beaches & Hikes. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.</p>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">9. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of the State of Hawaii, United States, without regard to its conflict of law provisions.</p>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">10. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Site after those revisions become effective, you agree to be bound by the revised terms.</p>
          </section>

          <section>
            <h2 className="font-display text-[24px] text-deep-forest mb-3">11. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at: <a href="mailto:info@beachesnhikes.com" className="text-ocean hover:underline">info@beachesnhikes.com</a></p>
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
