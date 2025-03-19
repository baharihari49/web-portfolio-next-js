import React, { useState, useEffect } from 'react';
import PortfolioFilter from './PortfolioFilter';
import PortfolioGrid from './PortfolioGrid';
import Pagination from './Pagination';
import NoResults from './NoResults';
import { PortfolioData, FilterType, SearchQueryType } from '@/app/types/portfolio';
import { filterPortfolioItems } from '@/app/utils/portfolioUtils';

// Import portfolio data
import portfolioData from '@/app/data/portfolio.json';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<SearchQueryType>('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Type-safe way to access the portfolio data
  const portfolioItems = (portfolioData as PortfolioData).items;

  // Extract unique categories
  useEffect(() => {
    const uniqueCategories = ['all', ...new Set(portfolioItems.map(item => item.category))];
    setCategories(uniqueCategories);
  }, [portfolioItems]);

  // Reset to first page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchQuery]);

  // Filter and search items
  const filteredItems = filterPortfolioItems(portfolioItems, filter, searchQuery);
    
  // Pagination calculations
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  
  // Page change handler
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    
    // Scroll to top of portfolio section
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
            
            {/* Pagination */}
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              paginate={paginate} 
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Portfolio;