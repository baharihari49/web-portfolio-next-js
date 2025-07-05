'use client';

import { useEffect } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  navigationType: string;
}

// Web Vitals tracking component
export const WebVitals: React.FC = () => {
  useEffect(() => {
    // Function to send metrics to analytics
    const sendToAnalytics = (metric: WebVitalsMetric) => {
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('[Web Vitals]', metric);
      }

      // Send to Google Analytics if available
      if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', metric.name, {
          custom_parameter_1: metric.value,
          custom_parameter_2: metric.rating,
          custom_parameter_3: metric.id,
        });
      }

      // Send to other analytics services here
      // Example: Vercel Analytics, Mixpanel, etc.
    };

    // Track all Core Web Vitals
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics); // Replaced FID with INP
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  }, []);

  // This component doesn't render anything
  return null;
};

// Performance monitoring hook
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn('[Performance] Long task detected:', {
              duration: entry.duration,
              startTime: entry.startTime,
              name: entry.name,
            });
          }
        }
      });

      observer.observe({ entryTypes: ['longtask'] });

      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    // Monitor layout shifts
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as PerformanceEntry & {
            hadRecentInput?: boolean;
            value?: number;
            sources?: unknown[];
          };
          
          if (layoutShiftEntry.hadRecentInput) continue;
          
          console.warn('[Performance] Layout shift detected:', {
            value: layoutShiftEntry.value,
            startTime: entry.startTime,
            sources: layoutShiftEntry.sources,
          });
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });

      return () => observer.disconnect();
    }
  }, []);
};

// Component to preload critical resources
interface ResourcePreloaderProps {
  resources: Array<{
    href: string;
    as: 'style' | 'script' | 'font' | 'image';
    type?: string;
    crossOrigin?: boolean;
  }>;
}

export const ResourcePreloader: React.FC<ResourcePreloaderProps> = ({ resources }) => {
  useEffect(() => {
    resources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      
      if (resource.type) {
        link.type = resource.type;
      }
      
      if (resource.crossOrigin) {
        link.crossOrigin = 'anonymous';
      }
      
      document.head.appendChild(link);
    });

    // Cleanup function to remove preload links
    return () => {
      resources.forEach((resource) => {
        const existingLink = document.querySelector(
          `link[rel="preload"][href="${resource.href}"]`
        );
        if (existingLink) {
          document.head.removeChild(existingLink);
        }
      });
    };
  }, [resources]);

  return null;
};

// Component to optimize third-party scripts
interface OptimizedScriptProps {
  src: string;
  strategy?: 'defer' | 'async' | 'lazy';
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedScript: React.FC<OptimizedScriptProps> = ({
  src,
  strategy = 'defer',
  onLoad,
  onError,
}) => {
  useEffect(() => {
    let script: HTMLScriptElement | null = null;

    const loadScript = () => {
      script = document.createElement('script');
      script.src = src;
      script.onload = () => onLoad?.();
      script.onerror = () => onError?.();

      if (strategy === 'defer') {
        script.defer = true;
      } else if (strategy === 'async') {
        script.async = true;
      }

      document.head.appendChild(script);
    };

    if (strategy === 'lazy') {
      // Load script on user interaction
      const handleInteraction = () => {
        loadScript();
        document.removeEventListener('mouseover', handleInteraction);
        document.removeEventListener('touchstart', handleInteraction);
        document.removeEventListener('keydown', handleInteraction);
      };

      document.addEventListener('mouseover', handleInteraction, { once: true });
      document.addEventListener('touchstart', handleInteraction, { once: true });
      document.addEventListener('keydown', handleInteraction, { once: true });

      return () => {
        document.removeEventListener('mouseover', handleInteraction);
        document.removeEventListener('touchstart', handleInteraction);
        document.removeEventListener('keydown', handleInteraction);
      };
    } else {
      loadScript();
    }

    return () => {
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [src, strategy, onLoad, onError]);

  return null;
};

// Critical CSS inliner component
interface CriticalCSSProps {
  css: string;
}

export const CriticalCSS: React.FC<CriticalCSSProps> = ({ css }) => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = css;
    style.setAttribute('data-critical', 'true');
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [css]);

  return null;
};

// Service worker registration component
export const ServiceWorkerRegistration: React.FC = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[SW] Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('[SW] Service Worker registration failed:', error);
        });
    }
  }, []);

  return null;
};

export default WebVitals;