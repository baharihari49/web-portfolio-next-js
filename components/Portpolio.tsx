import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, ExternalLink, Eye, Code, Layout, Search,
  Calendar, Trophy, Clock, ChevronLeft, ChevronRight, Briefcase
} from 'lucide-react';

// Import types
import { PortfolioData } from '@/app/types/portfolio';

// Import portfolio data
import portfolioData from '@/app/data/portfolio.json';

// Portfolio Component
export const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollHandlerRef = useRef(false);
  
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

  // Filter and search logic
  const filteredItems = portfolioItems
    .filter(item => {
      // Category filter
      if (filter !== 'all' && item.category !== filter) return false;
      
      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          (item.description && item.description.toLowerCase().includes(query)) ||
          (item.technologies && item.technologies.some(tech => tech.toLowerCase().includes(query)))
        );
      }
      
      return true;
    });
    
  // Pagination calculations
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  
  // Initialize visibility for current page items
  useEffect(() => {
    const currentIndexes = Array.from(
      { length: currentItems.length },
      (_, i) => i
    );
    setVisibleItems(currentIndexes);
  }, [currentPage, currentItems.length, filter, searchQuery]);

  // Handle scroll animations with performance optimizations
  useEffect(() => {
    const checkVisibility = () => {
      const elements = document.querySelectorAll('.portfolio-item');
      const newVisibleItems: number[] = [];
      
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.85) {
          newVisibleItems.push(index);
        }
      });
      
      if (newVisibleItems.length > visibleItems.length) {
        setVisibleItems(prev => [...new Set([...prev, ...newVisibleItems])]);
      }
    };
    
    const handleScroll = () => {
      if (!scrollHandlerRef.current) {
        scrollHandlerRef.current = true;
        window.requestAnimationFrame(() => {
          checkVisibility();
          setTimeout(() => {
            scrollHandlerRef.current = false;
          }, 100);
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    setTimeout(checkVisibility, 200);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleItems.length]);
  
  // Page change handler
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Reset visibility to ensure new items are visible
    setVisibleItems([]);
    
    // Scroll to top of portfolio section
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Get technology color based on name (for consistent tech tag colors)
  const getTechColor = (tech: string) => {
    const techColors: {[key: string]: string} = {
      'React': 'bg-blue-100 text-blue-700',
      'Next.js': 'bg-gray-800 text-white',
      'TypeScript': 'bg-blue-100 text-blue-700',
      'JavaScript': 'bg-yellow-100 text-yellow-700',
      'HTML5': 'bg-orange-100 text-orange-700',
      'CSS3': 'bg-purple-100 text-purple-700',
      'Tailwind': 'bg-teal-100 text-teal-700',
      'Tailwind CSS': 'bg-teal-100 text-teal-700',
      'Node.js': 'bg-green-100 text-green-700',
      'MongoDB': 'bg-green-100 text-green-700',
      'Firebase': 'bg-orange-100 text-orange-700',
      'PostgreSQL': 'bg-blue-100 text-blue-700',
      'Express': 'bg-gray-100 text-gray-700',
      'Redux': 'bg-purple-100 text-purple-700',
      'Bootstrap': 'bg-purple-100 text-purple-700',
      'Angular': 'bg-red-100 text-red-700',
      'GSAP': 'bg-green-100 text-green-700',
      'Chart.js': 'bg-blue-100 text-blue-700',
      'Framer Motion': 'bg-purple-100 text-purple-700',
    };
    
    return techColors[tech] || 'bg-gray-100 text-gray-700';
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Web': return <Globe className="w-4 h-4" />;
      case 'Web App': return <Layout className="w-4 h-4" />;
      case 'Mobile App': return <Smartphone className="w-4 h-4" />;
      case 'Design': return <PaintBucket className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
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
        
        {/* Search and filter bar - Styled like TechStack component */}
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
        
        {/* No results message */}
        {filteredItems.length === 0 && (
          <div className="text-center py-10 bg-white rounded-2xl shadow-md">
            <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-50">
              <Search className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-4">Try different search terms or category filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilter('all');
              }}
              className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}
        
        {/* Project grid with iOS compatibility fixes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {currentItems.map((item, index) => (
            <div 
              key={`${currentPage}-${index}`}
              className={`portfolio-item transition-all duration-700 ${
                visibleItems.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${(index % 3) * 150}ms` }}
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 flex flex-col transform hover:-translate-y-1 h-full overflow-hidden">
                {/* Project Image with fixed aspect ratio container */}
                <div className="relative w-full pt-[56.25%]"> {/* 16:9 aspect ratio */}
                  <div className="absolute inset-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={index < 3}
                    />
                  </div>
                  
                  {/* Year badge */}
                  {item.year && (
                    <div className="absolute top-4 left-4 px-2 py-1 bg-black bg-opacity-70 rounded-md text-white text-xs font-medium flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.year}
                    </div>
                  )}
                  
                  {/* Category badge */}
                  <div className="absolute top-4 right-4 px-2 py-1 bg-blue-600 rounded-md text-white text-xs font-medium">
                    {item.category}
                  </div>
                  
                  {/* Quick actions overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-0 hover:opacity-95 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-white truncate">{item.title}</h3>
                        <div className="flex space-x-2">
                          <Link 
                            href={`/projects/${item.slug}`}
                            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-blue-700 hover:bg-blue-50 transition-colors shadow-md"
                            aria-label="View project details"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-blue-700 hover:bg-blue-50 transition-colors shadow-md"
                              aria-label="Visit project website"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Card content */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-800 truncate">{item.title}</h3>
                    {item.duration && (
                      <span className="text-xs text-gray-500 flex items-center whitespace-nowrap ml-2">
                        <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                        {item.duration}
                      </span>
                    )}
                  </div>
                  
                  {/* Role */}
                  {item.role && (
                    <div className="mb-3 flex items-center">
                      <Briefcase className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 truncate">{item.role}</span>
                    </div>
                  )}
                  
                  {/* Highlight */}
                  {item.highlight && (
                    <div className="mb-3 flex items-start">
                      <Trophy className="w-4 h-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600 line-clamp-1">{item.highlight}</span>
                    </div>
                  )}
                  
                  {/* Description */}
                  {item.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                  )}
                  
                  {/* Technologies */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="mt-auto pt-3">
                      <div className="flex flex-wrap gap-1.5">
                        {item.technologies.slice(0, 3).map((tech, idx) => (
                          <span 
                            key={idx} 
                            className={`px-2 py-0.5 rounded-md text-xs font-medium ${getTechColor(tech)}`}
                          >
                            {tech}
                          </span>
                        ))}
                        {item.technologies.length > 3 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                            +{item.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Card footer with view button */}
                <div className="px-5 pb-5 mt-auto">
                  <Link
                    href={`/projects/${item.slug}`}
                    className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    View Details
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        {filteredItems.length > 0 && totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center">
            <div className="inline-flex shadow-md rounded-lg overflow-hidden">
              {/* Previous button */}
              <button 
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 flex items-center ${
                  currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-blue-600 hover:bg-blue-50'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline ml-1">Previous</span>
              </button>
              
              {/* Page numbers */}
              <div className="hidden sm:flex">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => {
                  // Show 5 page numbers at most (current, 2 before, 2 after)
                  if (
                    number === 1 || 
                    number === totalPages || 
                    (number >= currentPage - 1 && number <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`w-10 flex items-center justify-center ${
                          currentPage === number
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium'
                            : 'bg-white text-gray-700 hover:bg-blue-50'
                        }`}
                      >
                        {number}
                      </button>
                    );
                  } else if (
                    (number === currentPage - 2 && currentPage > 3) || 
                    (number === currentPage + 2 && currentPage < totalPages - 2)
                  ) {
                    // Show ellipsis
                    return (
                      <span 
                        key={number} 
                        className="w-10 flex items-center justify-center bg-white text-gray-400"
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
              
              {/* Mobile pagination indicator */}
              <div className="sm:hidden px-4 py-2 bg-white text-gray-700 font-medium">
                {currentPage} of {totalPages}
              </div>
              
              {/* Next button */}
              <button 
                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 flex items-center ${
                  currentPage === totalPages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span className="hidden sm:inline mr-1">Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Need to add this import for the icons
import { PaintBucket, Globe, Smartphone } from 'lucide-react';