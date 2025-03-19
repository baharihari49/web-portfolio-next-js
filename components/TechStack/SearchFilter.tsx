import React from 'react';
import { Search, LayoutGrid, Layers, ListFilter } from 'lucide-react';
import { getCategoryIcon } from '@/app/utils/techStackUtils';
import { ViewMode } from '@/app/types/techStack';

interface SearchFilterProps {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: string[];
  view: ViewMode;
  setView: (view: ViewMode) => void;
  itemsPerPage: number;
  setItemsPerPage: (count: number) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  categories,
  view,
  setView,
  itemsPerPage,
  setItemsPerPage
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
          placeholder="Search technologies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Category filters */}
      <div className="flex-1 flex flex-wrap justify-center md:justify-start gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeCategory === null 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Technologies
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
              activeCategory === category 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {getCategoryIcon(category)}
            <span className="ml-1.5">{category}</span>
          </button>
        ))}
      </div>
      
      {/* View toggle and Items per page */}
      <div className="flex items-center gap-2">
        {/* Items per page dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="itemsPerPage" className="text-sm text-gray-600 whitespace-nowrap">
            <ListFilter className="w-4 h-4 inline-block mr-1" /> 
            Per page:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="bg-gray-100 text-gray-700 rounded-lg text-sm p-1.5 border-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={16}>16</option>
            <option value={24}>24</option>
          </select>
        </div>
        
        {/* View toggle */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-lg ${view === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView('detailed')}
            className={`p-2 rounded-lg ${view === 'detailed' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            aria-label="Detailed view"
          >
            <Layers className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;