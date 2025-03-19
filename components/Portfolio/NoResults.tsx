import React from 'react';
import { Search } from 'lucide-react';

interface NoResultsProps {
  resetFilters: () => void;
}

const NoResults: React.FC<NoResultsProps> = ({ resetFilters }) => {
  return (
    <div className="text-center py-10 bg-white rounded-2xl shadow-md">
      <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-50">
        <Search className="w-8 h-8 text-blue-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">No projects found</h3>
      <p className="text-gray-600 mb-4">Try different search terms or category filters</p>
      <button
        onClick={resetFilters}
        className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
      >
        Reset filters
      </button>
    </div>
  );
};

export default NoResults;