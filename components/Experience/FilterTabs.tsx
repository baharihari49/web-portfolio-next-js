// components/Experience/FilterTabs.tsx
'use client';
import React from 'react';
import { ExperienceTabType } from '@/app/types/experience';

interface FilterTabsProps {
  activeTab: ExperienceTabType;
  setActiveTab: (tab: ExperienceTabType) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      key: 'all' as ExperienceTabType,
      label: 'All Experience'
    },
    {
      key: 'current' as ExperienceTabType,
      label: 'Current Position'
    },
    {
      key: 'previous' as ExperienceTabType,
      label: 'Previous Roles'
    }
  ];

  return (
    <div className="flex items-center bg-gray-100 rounded-full p-1">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`
            relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap
            ${activeTab === tab.key
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;