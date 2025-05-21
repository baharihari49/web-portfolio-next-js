// components/blog/SearchBar.tsx
import React, { FormEvent, JSX } from 'react';

export default function SearchBar(): JSX.Element {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Implementasi fungsi pencarian
    console.log('Search submitted');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 animate-on-scroll opacity-0">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search here..." 
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            type="submit" 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}