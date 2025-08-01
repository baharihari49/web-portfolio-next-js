'use client'

import React, { useState, useEffect } from 'react';
import PortfolioFilter from './PortfolioFilter';
import PortfolioGrid from './PortfolioGrid';
import NoResults from './NoResults';
import { FilterType, SearchQueryType } from '@/app/types/portfolio';

// Define the API response type
interface ApiResponse {
  success: boolean;
  data: PortfolioItem[];
}

// Define portfolio item type based on your JSON structure
interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  year: string;
  role: string;
  duration: string;
  highlight: string;
  keyFeatures: string[];
  gallery: string[];
  challenges: string[];
  solutions: string[];
  testimonial: {
    text: string;
    author: string;
    position: string;
  };
  nextProject: string;
  nextProjectSlug: string;
  createdAt: string;
  updatedAt: string;
  link?: string;
}

// Function to filter portfolio items
const filterPortfolioItems = (
  items: PortfolioItem[],
  filter: FilterType,
  searchQuery: SearchQueryType
): PortfolioItem[] => {
  return items.filter((item) => {
    // Filter by category
    const categoryMatch = filter === 'all' || item.category === filter;
    
    // Filter by search query
    const searchMatch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.technologies.some(tech => 
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    return categoryMatch && searchMatch;
  });
};

const Portfolio: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filter, setFilter] = useState<FilterType>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<SearchQueryType>('');
  
  // Pagination state
  const [currentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  // Fetch portfolio items from API
  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/portfolio`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const result: ApiResponse = await response.json();
        
        if (result.success && Array.isArray(result.data)) {
          setPortfolioItems(result.data);
          
          // Extract unique categories
          const uniqueCategories = ['all', ...new Set(result.data.map(item => item.category))];
          setCategories(uniqueCategories);
        } else {
          throw new Error('Invalid data format received from API');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        // Failed to fetch portfolio items - error state will be shown to user
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioItems();
  }, []);

  // Filter and search items
  const filteredItems = filterPortfolioItems(portfolioItems, filter, searchQuery);
  
  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setFilter('all');
  };

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-indigo-200 rounded-full opacity-30 blur-3xl"></div>
        
        {/* Code patterns */}
        <div className="absolute top-10 left-10 text-blue-100 opacity-10 text-9xl font-mono">&lt;/&gt;</div>
        <div className="absolute bottom-10 right-10 text-indigo-100 opacity-10 text-9xl font-mono">{`{ }`}</div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="px-3 w-fit mx-auto py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">My Projects</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 inline-block text-transparent bg-clip-text">
            Featured Work
          </h2>
          <p className="text-gray-600 text-lg">
            Explore my portfolio of projects where I&apos;ve transformed challenges into elegant digital solutions.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-8 bg-red-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Error Loading Projects</h3>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Search and filter bar */}
            <PortfolioFilter 
              filter={filter}
              setFilter={setFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              categories={categories}
            />
            
            {/* No results message */}
            {filteredItems.length === 0 ? (
              <NoResults resetFilters={resetFilters} />
            ) : (
              <>
                {/* Project grid */}
                <PortfolioGrid items={currentItems} currentPage={currentPage} />
                
                {/* See All Projects CTA */}
                <div className="text-center mt-12">
                  <div className="inline-flex flex-col items-center gap-4">
                    <p className="text-gray-600">
                      Showing <span className="font-semibold text-blue-600">{currentItems.length}</span> of{' '}
                      <span className="font-semibold text-blue-600">{portfolioItems.length}</span> projects
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="/portfolio"
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                      >
                        <span>See All Projects</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                      <a
                        href="#contact"
                        className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-300"
                      >
                        Let&apos;s Work Together
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Portfolio;