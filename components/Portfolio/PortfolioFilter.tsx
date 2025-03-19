import React from 'react';
import { Search } from 'lucide-react';
import { getCategoryIcon } from '@/app/utils/portfolioUtils';
import { FilterType, SearchQueryType } from '@/app/types/portfolio';

interface PortfolioFilterProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  searchQuery: SearchQueryType;
  setSearchQuery: (query: SearchQueryType) => void;
  categories: string[];
}

const PortfolioFilter: React.FC<PortfolioFilterProps> = ({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  categories
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 mb-10 flex flex-col md:flex-row gap-4 items-center">
      {/* Search input */}
      <div className="relative w-full md:w-64">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Category filters */}
      <div className="flex-1 flex flex-wrap justify-center md:justify-start gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            filter === 'all' 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Projects
        </button>
        
        {categories.filter(c => c !== 'all').map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
              filter === category 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {getCategoryIcon(category)}
            <span className="ml-1.5">{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PortfolioFilter;