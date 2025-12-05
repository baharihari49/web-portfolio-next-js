'use client';

import React from 'react';

interface GalleryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const GalleryFilter: React.FC<GalleryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          activeCategory === 'all'
            ? 'bg-purple-600 text-white shadow-md'
            : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600 border border-gray-200'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === category
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600 border border-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default GalleryFilter;
