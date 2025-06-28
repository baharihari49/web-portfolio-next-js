// components/Experience/ExperienceClient.tsx (Client Component)
'use client';
import React, { useState, useEffect } from 'react';
import { ExperienceTabType, ExperienceItem } from '@/app/types/experience';
import { filterExperiences } from '@/app/utils/experienceUtils';
import FilterTabs from './FilterTabs';
import ExperienceTimeline from './ExperienceTimeline';

interface ExperienceClientProps {
  experiences: ExperienceItem[];
}

const ExperienceClient: React.FC<ExperienceClientProps> = ({ experiences }) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<ExperienceTabType>('all');
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state for client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Function to toggle expanded state of a job item
  const toggleExpand = (index: number) => {
    setExpandedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Filter experiences based on active tab
  const filteredExperiences = filterExperiences(experiences, activeTab);

  // Handle loading and error states
  if (!isMounted) return null;

  return (
    <div className="space-y-12">
      {/* Modern Filter Tabs - matching Hero/About card style */}
      <div className="flex justify-center">
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300">
          <FilterTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>

      {/* Experience Timeline */}
      <ExperienceTimeline
        experiences={filteredExperiences}
        expandedItems={expandedItems}
        toggleExpand={toggleExpand}
      />
    </div>
  );
};

export default ExperienceClient;