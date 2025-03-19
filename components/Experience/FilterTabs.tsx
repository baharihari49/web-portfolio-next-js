import React from 'react';
import { ExperienceTabType } from '@/app/types/experience';

interface FilterTabsProps {
  activeTab: ExperienceTabType;
  setActiveTab: (tab: ExperienceTabType) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="bg-white p-1 rounded-xl shadow-md inline-flex">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeTab === 'all' 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All Experience
        </button>
        <button
          onClick={() => setActiveTab('current')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeTab === 'current' 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Current Position
        </button>
        <button
          onClick={() => setActiveTab('previous')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeTab === 'previous' 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Previous Roles
        </button>
      </div>
    </div>
  );
};

export default FilterTabs;