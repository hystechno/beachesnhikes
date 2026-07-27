declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * GA4 Event Tracking Helper
 * Measurement ID: G-L0T9V6D8WQ
 */

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

// Pre-defined event trackers for common interactions
export const analytics = {
  /** Track when a user clicks on a trail card */
  trailClick: (trailName: string, difficulty: string, region: string) => {
    trackEvent("trail_click", {
      trail_name: trailName,
      trail_difficulty: difficulty,
      trail_region: region,
      event_category: "engagement",
      event_label: trailName,
    });
  },

  /** Track when a user clicks on a beach card */
  beachClick: (beachName: string, crowdLevel: string, region: string) => {
    trackEvent("beach_click", {
      beach_name: beachName,
      beach_crowd: crowdLevel,
      beach_region: region,
      event_category: "engagement",
      event_label: beachName,
    });
  },

  /** Track when a user opens a region modal */
  regionView: (regionName: string) => {
    trackEvent("region_view", {
      region_name: regionName,
      event_category: "engagement",
      event_label: regionName,
    });
  },

  /** Track filter usage */
  filterUse: (filterType: string, filterValue: string, section: string) => {
    trackEvent("filter_used", {
      filter_type: filterType,
      filter_value: filterValue,
      filter_section: section,
      event_category: "interaction",
      event_label: `${section}:${filterValue}`,
    });
  },

  /** Track surf season toggle */
  surfSeasonToggle: (season: string) => {
    trackEvent("surf_season_toggle", {
      season,
      event_category: "interaction",
      event_label: season,
    });
  },

  /** Track scroll depth milestones */
  scrollDepth: (percentage: number) => {
    trackEvent("scroll_depth", {
      depth_percent: percentage,
      event_category: "engagement",
      event_label: `${percentage}%`,
    });
  },

  /** Track outbound link clicks */
  outboundClick: (url: string, label: string) => {
    trackEvent("outbound_click", {
      url,
      label,
      event_category: "outbound",
      event_label: `${label} → ${url}`,
    });
  },

  /** Track CTA button clicks */
  ctaClick: (ctaName: string, location: string) => {
    trackEvent("cta_click", {
      cta_name: ctaName,
      cta_location: location,
      event_category: "conversion",
      event_label: ctaName,
    });
  },

  /** Track FAQ accordion opens */
  faqOpen: (question: string) => {
    trackEvent("faq_open", {
      question,
      event_category: "engagement",
      event_label: question,
    });
  },

  /** Track map interactions */
  mapInteraction: (action: string, locationName?: string) => {
    trackEvent("map_interaction", {
      map_action: action,
      location_name: locationName || "none",
      event_category: "interaction",
      event_label: action,
    });
  },

  /** Track back-to-top button usage */
  backToTop: () => {
    trackEvent("back_to_top", {
      event_category: "navigation",
    });
  },
};
