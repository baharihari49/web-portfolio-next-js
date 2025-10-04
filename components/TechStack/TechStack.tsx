'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import { ViewMode, TechStackItem } from '@/app/types/techStack';
import { convertRawTechItems, filterTechStacks } from '@/app/utils/techStackUtils';

// Components
import SearchFilter from './SearchFilter';
import GridView from './GridView';
import DetailedView from './DetailedView';
import Pagination from './Pagination';
import NoResults from './NoResults';
import TechDetailsModal from './TechDetailsModal';
import SkillsSummary from './SkillsSummary';

// Import tech stack data from JSON
import techStackData from '@/app/data/techstack.json';

const TechStack: React.FC = () => {
  // State
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<ViewMode>('grid');
  const scrollRef = useRef(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(18);
  
  // Convert the JSON data to the format needed by the component
  const techStacks: TechStackItem[] = convertRawTechItems(techStackData.techStacks);
  
  // Handle scroll animation with throttling
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) {
        scrollRef.current = true;
        
        window.requestAnimationFrame(() => {
          const element = document.getElementById('tech-stack');
          if (element) {
            const position = element.getBoundingClientRect();
            // If section is in viewport
            if (position.top < window.innerHeight * 0.75 && position.bottom >= 0) {
              setIsVisible(true);
            }
          }
          
          setTimeout(() => {
            scrollRef.current = false;
          }, 100); // Throttle to 100ms
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);
  
  const categories = Array.from(new Set(techStacks.map(item => item.category)));
  
  // Filter tech stacks by category and search query
  const filteredTechStacks = filterTechStacks(techStacks, activeCategory, searchQuery);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredTechStacks.length / itemsPerPage);
  
  // Get current page items
  const currentItems = filteredTechStacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Pagination controls
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  
  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory(null);
  };

  return (
    <section id="tech-stack" className="py-20 md:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-indigo-200 rounded-full opacity-30 blur-3xl"></div>
        
        {/* Code patterns */}
        <div className="absolute top-10 left-10 text-blue-100 opacity-10 text-9xl font-mono">&lt;/&gt;</div>
        <div className="absolute bottom-10 right-10 text-indigo-100 opacity-10 text-9xl font-mono">{`{ }`}</div>
        
        {/* Additional decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="mx-auto w-fit px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-medium mb-4">
            Technical Expertise
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 inline-block text-transparent bg-clip-text">
            My Technology Stack
          </h2>
          <p className="text-gray-600 text-lg">
            A comprehensive collection of technologies and tools I use to create powerful, 
            efficient, and beautiful digital solutions.
          </p>
        </div>
        
        {/* Search and filter bar */}
        <SearchFilter 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categories={categories}
          view={view}
          setView={setView}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={(count) => {
            setItemsPerPage(count);
            setCurrentPage(1); // Reset to first page when changing items per page
          }}
        />
        
        {/* Results count indicator */}
        <div className="text-gray-600 mb-4 flex justify-between items-center">
          <div>
            <span className="font-medium">{filteredTechStacks.length}</span> technologies found
            {activeCategory && <span> in <span className="font-medium">{activeCategory}</span></span>}
            {searchQuery && <span> matching &ldquo;<span className="font-medium">{searchQuery}</span>&rdquo;</span>}
          </div>
          
          {totalPages > 1 && (
            <div className="text-sm">
              Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
            </div>
          )}
        </div>
        
        {/* No results message */}
        {filteredTechStacks.length === 0 ? (
          <NoResults resetFilters={resetFilters} />
        ) : (
          <>
            {/* Tech stack views */}
            {view === 'grid' ? (
              <GridView 
                items={currentItems} 
                isVisible={isVisible} 
                onItemClick={(techName) => setSelectedTech(techName)} 
              />
            ) : (
              <DetailedView 
                items={currentItems} 
                isVisible={isVisible} 
                onItemClick={(techName) => setSelectedTech(techName)} 
              />
            )}
            
            {/* Pagination */}
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              goToPage={goToPage}
            />
          </>
        )}
        
        {/* Tech skill summary */}
        <SkillsSummary 
          techStacks={techStacks}
          categories={categories}
        />
        
        {/* Learning continuously message */}
        <div className="mt-10 text-center">
          <p className="text-gray-600 flex items-center justify-center flex-wrap">
            <span>Continuously expanding my knowledge</span>
            <Heart className="w-5 h-5 text-red-500 mx-2 animate-pulse" />
            <span>Always learning new technologies</span>
          </p>
        </div>
      </div>
      
      {/* Technology details modal */}
      <TechDetailsModal 
        selectedTech={selectedTech} 
        onClose={() => setSelectedTech(null)}
        techStacks={techStacks}
      />
    </section>
  );
};

export default TechStack;