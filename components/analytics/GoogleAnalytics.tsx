'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface GoogleAnalyticsProps {
  measurementId: string;
}

// Google Analytics tracking component
export const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ measurementId }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views when route changes
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('config', measurementId, {
        page_path: pathname + searchParams.toString(),
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [pathname, searchParams, measurementId]);

  // This component doesn't render anything
  return null;
};

// Event tracking functions
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', eventName, parameters);
  }
};

// Conversion tracking
export const trackConversion = (conversionId: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'conversion', {
      send_to: conversionId,
      value: value,
      currency: 'USD',
    });
  }
};

// Custom event types for portfolio website
export const trackPortfolioEvents = {
  // Contact form events
  contactFormSubmit: () => trackEvent('contact_form_submit', {
    event_category: 'engagement',
    event_label: 'contact_form',
  }),

  contactFormError: (error: string) => trackEvent('contact_form_error', {
    event_category: 'error',
    event_label: 'contact_form',
    error_message: error,
  }),

  // Portfolio interactions
  projectView: (projectName: string) => trackEvent('project_view', {
    event_category: 'portfolio',
    event_label: projectName,
  }),

  projectLinkClick: (projectName: string, linkType: 'demo' | 'github') => trackEvent('project_link_click', {
    event_category: 'portfolio',
    event_label: projectName,
    link_type: linkType,
  }),

  // Blog interactions
  blogPostView: (postTitle: string, category: string) => trackEvent('blog_post_view', {
    event_category: 'blog',
    event_label: postTitle,
    blog_category: category,
  }),

  blogPostShare: (postTitle: string, platform: string) => trackEvent('blog_post_share', {
    event_category: 'blog',
    event_label: postTitle,
    share_platform: platform,
  }),

  // Search events
  siteSearch: (searchTerm: string, resultsCount: number) => trackEvent('search', {
    search_term: searchTerm,
    event_category: 'search',
    event_label: 'site_search',
    results_count: resultsCount,
  }),

  // Engagement events
  scrollDepth: (depth: number) => trackEvent('scroll', {
    event_category: 'engagement',
    event_label: 'scroll_depth',
    value: depth,
  }),

  timeOnPage: (seconds: number, page: string) => trackEvent('timing_complete', {
    name: 'page_read_time',
    value: seconds,
    event_category: 'engagement',
    page_path: page,
  }),

  // Download events
  resumeDownload: () => trackEvent('file_download', {
    event_category: 'download',
    event_label: 'resume',
    file_type: 'pdf',
  }),

  // Social media clicks
  socialClick: (platform: string, location: string) => trackEvent('social_click', {
    event_category: 'social',
    event_label: platform,
    click_location: location,
  }),

  // Newsletter/subscription events
  newsletterSignup: () => trackEvent('newsletter_signup', {
    event_category: 'engagement',
    event_label: 'newsletter',
  }),

  // Error tracking
  jsError: (error: string, page: string) => trackEvent('exception', {
    description: error,
    fatal: false,
    page_path: page,
  }),

  // Performance tracking (supplements Web Vitals)
  performanceMetric: (metricName: string, value: number, rating: string) => trackEvent('web_vitals', {
    event_category: 'performance',
    event_label: metricName,
    value: Math.round(value),
    metric_rating: rating,
  }),
};

// Hook for easy event tracking in components
export const useAnalytics = () => {
  return {
    trackEvent,
    trackConversion,
    ...trackPortfolioEvents,
  };
};

export default GoogleAnalytics;