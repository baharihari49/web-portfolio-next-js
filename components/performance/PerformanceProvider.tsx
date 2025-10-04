'use client';

import React from 'react';
import { WebVitals, ResourcePreloader, ServiceWorkerRegistration } from './WebVitals';

interface PerformanceProviderProps {
  children: React.ReactNode;
  enableWebVitals?: boolean;
  enableServiceWorker?: boolean;
  criticalResources?: Array<{
    href: string;
    as: 'style' | 'script' | 'font' | 'image';
    type?: string;
    crossOrigin?: boolean;
  }>;
}

export const PerformanceProvider: React.FC<PerformanceProviderProps> = ({
  children,
  enableWebVitals = true,
  enableServiceWorker = true,
  criticalResources = [],
}) => {
  return (
    <>
      {enableWebVitals && <WebVitals />}
      {enableServiceWorker && <ServiceWorkerRegistration />}
      {criticalResources.length > 0 && <ResourcePreloader resources={criticalResources} />}
      {children}
    </>
  );
};

export default PerformanceProvider;