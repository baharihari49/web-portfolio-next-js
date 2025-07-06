'use client'

import React, { useState, useEffect } from 'react';
// import { Heart } from 'lucide-react';
import { ExperienceTabType } from '@/app/types/experience';
import { filterExperiences } from '@/app/utils/experienceUtils';
import { ExperienceItem } from '@/app/types/experience';
import useExperienceAnimation from './hooks/useExperienceAnimation';

// Components
import TimelineDots from './TimelineDots';
import FilterTabs from './FilterTabs';
import DesktopTimeline from './DesktopTimeline';
import MobileTimeline from './MobileTimeline';

export const Experience: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<ExperienceTabType>('all');
  const [isMounted, setIsMounted] = useState(false);
  const { visibleItems } = useExperienceAnimation();
  const [experiences, setExperiences] = useState<ExperienceItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Set mounted state for client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch experiences data from API
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/experiences`);

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        setExperiences(data.data.reverse() || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching experience data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  // Function to toggle expanded state of a job item
  const toggleExpand = (index: number) => {
    setExpandedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Get experiences from data
  // const experiences = experincesData.item;

  // Filter experiences based on active tab
  const filteredExperiences = filterExperiences(experiences, activeTab);

  // Handle loading and error states
  if (!isMounted) return null;

  return (
    <section id="experience" className="py-20 md:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-indigo-200 rounded-full opacity-30 blur-3xl"></div>

        {/* Code patterns */}
        <div className="absolute top-10 left-10 text-blue-100 opacity-10 text-9xl font-mono">&lt;/&gt;</div>
        <div className="absolute bottom-10 right-10 text-indigo-100 opacity-10 text-9xl font-mono">{`{ }`}</div>

        {/* Timeline dots - decorative */}
        <TimelineDots isMounted={isMounted} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="w-fit mx-auto px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">Professional Journey</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 inline-block text-transparent bg-clip-text">
            Work Experience
          </h2>
          <p className="text-gray-600 text-lg">
            Explore my professional journey and the impactful solutions I&apos;ve delivered throughout my career.
          </p>
        </div>

        {/* Filter tabs */}
        <FilterTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Loading state */}
        {isLoading && (
          <div className="flex h-64 w-full items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="my-10 rounded-lg bg-red-50 p-4 text-center text-red-800 dark:bg-red-900/30 dark:text-red-400">
            <p>Failed to load experience data: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 rounded bg-red-100 px-3 py-1 text-sm font-medium text-red-800 hover:bg-red-200 dark:bg-red-800 dark:text-red-100 dark:hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Desktop Timeline */}
        <DesktopTimeline
          experiences={filteredExperiences}
          visibleItems={visibleItems}
          expandedItems={expandedItems}
          toggleExpand={toggleExpand}
        />

        {/* Mobile Timeline */}
        <MobileTimeline
          experiences={filteredExperiences}
          visibleItems={visibleItems}
          expandedItems={expandedItems}
          toggleExpand={toggleExpand}
        />

        {/* Additional decorative elements */}
        <div className="absolute -bottom-10 -right-20 w-80 h-80 bg-blue-600 opacity-5 rounded-full"></div>
        <div className="absolute top-1/3 -left-10 w-40 h-40 bg-indigo-600 opacity-5 rounded-full"></div>
      </div>
    </section>
  );
};