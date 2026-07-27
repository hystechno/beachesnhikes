import { useEffect } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-schema";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": items.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer,
        },
      })),
    });
    document.head.appendChild(script);
    return () => {
      const existing = document.getElementById("faq-schema");
      if (existing) existing.remove();
    };
  }, [items]);
  return null;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "breadcrumb-schema";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url,
      })),
    });
    document.head.appendChild(script);
    return () => {
      const existing = document.getElementById("breadcrumb-schema");
      if (existing) existing.remove();
    };
  }, [items]);
  return null;
}

export function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
}) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "article-schema";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline,
      description,
      image,
      author: {
        "@type": "Organization",
        name: "Beaches & Hikes",
      },
      publisher: {
        "@type": "Organization",
        name: "Beaches & Hikes",
        logo: {
          "@type": "ImageObject",
          url: "https://beachesnhikes.com/logo.png",
        },
      },
      datePublished,
      dateModified,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://beachesnhikes.com/",
      },
    });
    document.head.appendChild(script);
    return () => {
      const existing = document.getElementById("article-schema");
      if (existing) existing.remove();
    };
  }, [headline, description, image, datePublished, dateModified]);
  return null;
}

export function HowToSchema({
  name,
  description,
  steps,
  totalTime,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
}) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "howto-schema";
    const howToData: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name,
      description,
      step: steps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.name,
        text: step.text,
      })),
    };
    if (totalTime) howToData.totalTime = totalTime;
    script.text = JSON.stringify(howToData);
    document.head.appendChild(script);
    return () => {
      const existing = document.getElementById("howto-schema");
      if (existing) existing.remove();
    };
  }, [name, description, steps, totalTime]);
  return null;
}

export function VideoSchema({
  name,
  description,
  thumbnailUrl,
  contentUrl,
  uploadDate,
  duration,
  embedUrl,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
  uploadDate: string;
  duration: string;
  embedUrl: string;
}) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "video-schema";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name,
      description,
      thumbnailUrl,
      contentUrl,
      uploadDate,
      duration,
      embedUrl,
      publisher: {
        "@type": "Organization",
        name: "Beaches & Hikes",
        logo: {
          "@type": "ImageObject",
          url: "https://beachesnhikes.com/logo.png",
        },
      },
      author: {
        "@type": "Organization",
        name: "Beaches & Hikes",
      },
    });
    document.head.appendChild(script);
    return () => {
      const existing = document.getElementById("video-schema");
      if (existing) existing.remove();
    };
  }, [name, description, thumbnailUrl, contentUrl, uploadDate, duration, embedUrl]);
  return null;
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Beaches & Hikes",
    url: "https://www.beachesnhikes.com",
    description: "Complete Hawaii travel guide with beaches, hiking trails, and surf spots across Oahu, Maui, Kauai, and the Big Island.",
    publisher: {
      "@type": "Organization",
      name: "Beaches & Hikes",
      logo: {
        "@type": "ImageObject",
        url: "https://www.beachesnhikes.com/images/og-image.jpg",
      },
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function LocalBusinessSchema() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "localbusiness-schema";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: "Beaches & Hikes",
      description: "Comprehensive travel guide for Hawaii beaches, hiking trails, and surf spots across all islands.",
      url: "https://beachesnhikes.com/",
      logo: "https://beachesnhikes.com/logo.png",
      image: "https://beachesnhikes.com/images/og-image.jpg",
      areaServed: {
        "@type": "City",
        name: "Hawaii",
        containedInPlace: {
          "@type": "State",
          name: "Hawaii",
        },
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Oahu Activities",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Hiking Trail Guides",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Beach Guides",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Surf Spot Guides",
            },
          },
        ],
      },
    });
    document.head.appendChild(script);
    return () => {
      const existing = document.getElementById("localbusiness-schema");
      if (existing) existing.remove();
    };
  }, []);
  return null;
}
