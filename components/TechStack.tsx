import React, { useState, useEffect, useRef } from 'react';
import { 
  Code, Server, Database, Terminal, LayoutGrid, 
  Boxes, FileCode, Cpu, Box, GitBranch, LineChart, 
  BarChart3, Monitor, FileJson, FileType, PaintBucket, 
  FolderGit, Gamepad2, CloudCog, WifiIcon, Heart, Star, BookMarked,
  Search, ArrowUpRight, Sparkles, Activity, ZoomIn, X,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ListFilter, Layers, Package
} from 'lucide-react';
import { RiNextjsLine, RiTailwindCssFill  } from "react-icons/ri";
import { FaReact, FaPhp, FaLaravel, FaNodeJs, FaDocker, FaUbuntu, FaGithub } from 'react-icons/fa';
import { IoLogoJavascript, IoPieChartOutline  } from "react-icons/io5";
import { SiTypescript, SiShadcnui, SiChartdotjs, SiFilament ,SiNestjs, SiMysql, SiNginx, SiApache, SiOpencv, SiSwiper} from "react-icons/si";
import { LiaHtml5,LiaCss3Alt  } from "react-icons/lia";
import { TbBrandRadixUi } from "react-icons/tb";
import { FiGitlab } from "react-icons/fi";

// Import tech stack data from JSON
import techStackData from "@/app/data/techstack.json";

interface TechStackItem {
  name: string;
  icon: React.ReactNode;
  category: string;
  proficiency: number; // 1-100
  color: string;
  description?: string;
  years?: number;
  projects?: number;
}

// Color mapping object to directly use in inline styles
const colorMap = {
  'yellow-400': '#facc15',
  'blue-500': '#3b82f6',
  'blue-400': '#60a5fa',
  'gray-700': '#374151',
  'orange-500': '#f97316',
  'blue-600': '#2563eb',
  'teal-500': '#14b8a6',
  'violet-600': '#7c3aed',
  'gray-800': '#1f2937',
  'pink-500': '#ec4899',
  'purple-500': '#a855f7',
  'indigo-600': '#4f46e5',
  'red-500': '#ef4444',
  'red-600': '#dc2626',
  'blue-700': '#1d4ed8',
  'green-600': '#16a34a',
  'orange-600': '#ea580c',
  'green-500': '#22c55e',
};

// Create icon mapping object to convert string icon names to React components
const iconMap: Record<string, React.ElementType> = {
  IoLogoJavascript: IoLogoJavascript,
  SiTypescript: SiTypescript,
  FaReact: FaReact,
  LiaHtml5: LiaHtml5,
  LiaCss3Alt: LiaCss3Alt,
  RiTailwindCssFill: RiTailwindCssFill,
  SiShadcnui: SiShadcnui,
  TbBrandRadixUi: TbBrandRadixUi,
  SiChartdotjs: SiChartdotjs,
  IoPieChartOutline: IoPieChartOutline,
  FaPhp: FaPhp,
  FaLaravel: FaLaravel,
  SiFilament: SiFilament,
  FaNodeJs: FaNodeJs,
  SiNestjs: SiNestjs,
  SiMysql: SiMysql,
  FaDocker: FaDocker,
  FaUbuntu: FaUbuntu,
  SiNginx: SiNginx,
  SiApache: SiApache,
  FaGithub: FaGithub,
  FiGitlab: FiGitlab,
  SiOpencv: SiOpencv,
  RiNextjsLine: RiNextjsLine,
  SiSwiper: SiSwiper
};

export const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'grid' | 'detailed'>('grid');
  const scrollRef = useRef(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(18);
  
  // Convert the JSON data to the format needed by the component
  const techStacks: TechStackItem[] = techStackData.techStacks.map(tech => ({
    ...tech,
    // Convert the icon string to a React component
    icon: React.createElement(iconMap[tech.icon as keyof typeof iconMap] || Box)
  }));
  
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
  
  // Handle click outside of modal
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setSelectedTech(null);
      }
    };
    
    if (selectedTech) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [selectedTech]);
  
  const categories = Array.from(new Set(techStacks.map(item => item.category)));
  
  // Filter tech stacks by category and search query
  const filteredTechStacks = techStacks
    .filter(item => {
      // Category filter
      if (activeCategory && item.category !== activeCategory) return false;
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          (item.description && item.description.toLowerCase().includes(query))
        );
      }
      
      return true;
    });
  
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
  
  const goToFirstPage = () => goToPage(1);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);
  const goToLastPage = () => goToPage(totalPages);
  
  // Get proficiency level label
  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency >= 90) return 'Expert';
    if (proficiency >= 80) return 'Advanced';
    if (proficiency >= 70) return 'Intermediate';
    return 'Beginner';
  };
  
  // Get proficiency level color
  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return '#22c55e'; // green-500
    if (proficiency >= 80) return '#3b82f6'; // blue-500
    if (proficiency >= 70) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  };
  
  // Find selected tech details
  const selectedTechDetails = selectedTech 
    ? techStacks.find(tech => tech.name === selectedTech)
    : null;
  
  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Frontend': return <Monitor className="w-5 h-5" />;
      case 'Backend': return <Server className="w-5 h-5" />;
      case 'DevOps': return <CloudCog className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
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
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page when changing items per page
                }}
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
        {filteredTechStacks.length === 0 && (
          <div className="text-center py-10 bg-white rounded-2xl shadow-md">
            <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-50">
              <Search className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No technologies found</h3>
            <p className="text-gray-600 mb-4">Try different search terms or category filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory(null);
              }}
              className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}
        
        {/* Tech stack grid view */}
        {view === 'grid' && currentItems.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {currentItems.map((tech, index) => (
              <div 
                key={tech.name}
                className={`cursor-pointer group relative bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-500 
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} 
                  hover:shadow-xl hover:-translate-y-1`}
                style={{ 
                  transitionDelay: isVisible ? `${index * 50}ms` : '0ms'
                }}
                onClick={() => setSelectedTech(tech.name)}
              >
                {/* Progress indicator as a side bar */}
                <div 
                  className="absolute top-0 left-0 w-1 h-full"
                  style={{ 
                    backgroundColor: getProficiencyColor(tech.proficiency)
                  }}
                ></div>
                
                <div className="p-5 pl-6">
                  {/* Tech icon */}
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                       style={{ 
                         backgroundColor: `${colorMap[tech.color as keyof typeof colorMap] || '#3b82f6'}15`
                       }}>
                    <div style={{ color: colorMap[tech.color as keyof typeof colorMap] || '#3b82f6' }}>
                      {tech.icon}
                    </div>
                  </div>
                  
                  {/* Tech name and category */}
                  <h3 className="text-center font-semibold text-gray-900 mb-1 line-clamp-1">{tech.name}</h3>
                  <p className="text-xs text-center text-gray-500 mb-3">{tech.category}</p>
                  
                  {/* Experience badge */}
                  {tech.years && (
                    <div className="flex items-center justify-center">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700">
                        <Activity className="w-3 h-3 mr-1" />
                        {tech.years} {tech.years === 1 ? 'year' : 'years'} exp
                      </span>
                    </div>
                  )}
                  
                  {/* View details prompt on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-0 group-hover:opacity-90 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white font-medium flex items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <ZoomIn className="w-4 h-4 mr-1.5" />
                      View Details
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Tech stack detailed view */}
        {view === 'detailed' && currentItems.length > 0 && (
          <div className="space-y-4">
            {currentItems.map((tech, index) => (
              <div 
                key={tech.name}
                className={`cursor-pointer relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 
                  ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'} 
                  hover:shadow-xl`}
                style={{ 
                  transitionDelay: isVisible ? `${index * 50}ms` : '0ms'
                }}
                onClick={() => setSelectedTech(tech.name)}
              >
                <div className="p-4 md:p-5 grid grid-cols-12 gap-4 items-center">
                  {/* Left color indicator */}
                  <div 
                    className="absolute top-0 left-0 w-1 h-full"
                    style={{ backgroundColor: getProficiencyColor(tech.proficiency) }}
                  ></div>
                  
                  {/* Tech icon */}
                  <div className="col-span-2 sm:col-span-1">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center"
                         style={{ 
                           backgroundColor: `${colorMap[tech.color as keyof typeof colorMap] || '#3b82f6'}15`
                         }}>
                      <div style={{ color: colorMap[tech.color as keyof typeof colorMap] || '#3b82f6' }}>
                        {tech.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Tech info */}
                  <div className="col-span-6 sm:col-span-5 md:col-span-4">
                    <div className="flex items-center">
                      <h3 className="font-semibold text-gray-900">{tech.name}</h3>
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                        {tech.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-1 md:line-clamp-2 mt-1">
                      {tech.description || `Expertise in ${tech.name} development and implementation.`}
                    </p>
                  </div>
                  
                  {/* Progress and metrics */}
                  <div className="col-span-4 sm:col-span-6 md:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Proficiency bar */}
                    <div className="hidden md:block">
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            width: `${tech.proficiency}%`,
                            backgroundColor: getProficiencyColor(tech.proficiency)
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs font-medium" style={{ color: getProficiencyColor(tech.proficiency) }}>
                          {getProficiencyLabel(tech.proficiency)}
                        </span>
                        <span className="text-xs text-gray-500">{tech.proficiency}%</span>
                      </div>
                    </div>
                    
                    {/* Experience and projects - mobile optimized */}
                    <div className="col-span-4 sm:col-span-6 md:col-span-2 flex flex-wrap gap-2 md:gap-4 justify-end">
                      {tech.years && (
                        <div className="flex items-center whitespace-nowrap">
                          <BookMarked className="w-4 h-4 text-blue-600 mr-1" />
                          <span className="text-sm text-gray-700">
                            {tech.years} {tech.years === 1 ? 'year' : 'years'}
                          </span>
                        </div>
                      )}
                      
                      {tech.projects && (
                        <div className="flex items-center whitespace-nowrap">
                          <FolderGit className="w-4 h-4 text-indigo-600 mr-1" />
                          <span className="text-sm text-gray-700">
                            {tech.projects} {tech.projects === 1 ? 'project' : 'projects'}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex justify-end ml-auto">
                        <span className="inline-flex items-center text-blue-600 text-sm">
                          Details
                          <ArrowUpRight className="w-3 h-3 ml-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="inline-flex items-center bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={goToFirstPage}
                disabled={currentPage === 1}
                className={`p-2 sm:px-3 sm:py-2 text-sm border-r border-gray-200 ${
                  currentPage === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span className="sr-only">First page</span>
                <ChevronsLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`p-2 sm:px-3 sm:py-2 text-sm border-r border-gray-200 ${
                  currentPage === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span className="sr-only">Previous page</span>
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {/* Page numbers */}
              <div className="hidden sm:flex">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Create a simple pagination view with at most 5 buttons
                  let pageNum;
                  
                  if (totalPages <= 5) {
                    // If we have 5 or fewer pages, show all page numbers
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    // If we're near the start, show pages 1-5
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    // If we're near the end, show the last 5 pages
                    pageNum = totalPages - 4 + i;
                  } else {
                    // Otherwise show current page and 2 pages on each side
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`w-10 text-center py-2 border-r border-gray-200 ${
                        currentPage === pageNum
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              {/* Mobile page indicator */}
              <div className="sm:hidden px-4 py-2 text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </div>
              
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 sm:px-3 sm:py-2 text-sm border-r border-gray-200 ${
                  currentPage === totalPages 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span className="sr-only">Next page</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
                className={`p-2 sm:px-3 sm:py-2 text-sm ${
                  currentPage === totalPages 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span className="sr-only">Last page</span>
                <ChevronsRight className="w-5 h-5" />
              </button>
            </nav>
          </div>
        )}
        
        {/* Tech skill summary */}
        <div className="mt-12 bg-white p-6 md:p-8 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
            Skills Proficiency Overview
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Expertise levels */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-gray-500 mb-2">PROFICIENCY LEVELS</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#22c55e' }}></div>
                  <span className="text-sm text-gray-700">Expert (90-100%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#3b82f6' }}></div>
                  <span className="text-sm text-gray-700">Advanced (80-89%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#f59e0b' }}></div>
                  <span className="text-sm text-gray-700">Intermediate (70-79%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#ef4444' }}></div>
                  <span className="text-sm text-gray-700">Beginner ({`< 70%`})</span>
                </div>
              </div>
            </div>
            
            {/* Category breakdown */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-gray-500 mb-2">CATEGORY BREAKDOWN</h4>
              <div className="space-y-2">
                {categories.map(category => {
                  const count = techStacks.filter(tech => tech.category === category).length;
                  return (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getCategoryIcon(category)}
                        <span className="text-sm text-gray-700 ml-2">{category}</span>
                      </div>
                      <span className="text-sm font-medium text-blue-600">{count} {count === 1 ? 'tech' : 'techs'}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Top proficiency */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-gray-500 mb-2">TOP EXPERTISE</h4>
              <div className="space-y-2">
                {techStacks
                  .sort((a, b) => b.proficiency - a.proficiency)
                  .slice(0, 4)
                  .map(tech => (
                    <div key={tech.name} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{tech.name}</span>
                      <span className="text-sm font-medium text-blue-600">{tech.proficiency}%</span>
                    </div>
                  ))
                }
              </div>
            </div>
            
            {/* Years of experience */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-gray-500 mb-2">EXPERIENCE YEARS</h4>
              <div className="space-y-2">
                {techStacks
                  .filter(tech => tech.years)
                  .sort((a, b) => (b.years || 0) - (a.years || 0))
                  .slice(0, 4)
                  .map(tech => (
                    <div key={tech.name} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{tech.name}</span>
                      <span className="text-sm font-medium text-blue-600">{tech.years} {tech.years === 1 ? 'year' : 'years'}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        
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
      {selectedTech && selectedTechDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
          <div 
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-start">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                     style={{ 
                       backgroundColor: `${colorMap[selectedTechDetails.color as keyof typeof colorMap] || '#3b82f6'}15`
                     }}>
                  <div style={{ color: colorMap[selectedTechDetails.color as keyof typeof colorMap] || '#3b82f6' }}>
                    {selectedTechDetails.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedTechDetails.name}</h3>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500">{selectedTechDetails.category}</span>
                    <span 
                      className="ml-2 px-2 py-0.5 text-xs rounded-full text-white"
                      style={{ backgroundColor: getProficiencyColor(selectedTechDetails.proficiency) }}
                    >
                      {getProficiencyLabel(selectedTechDetails.proficiency)}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTech(null)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {/* Description */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 mb-2">DESCRIPTION</h4>
                <p className="text-gray-700">
                  {selectedTechDetails.description || `Expertise in ${selectedTechDetails.name} development and implementation.`}
                </p>
              </div>
              
              {/* Proficiency details */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 mb-2">PROFICIENCY</h4>
                <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full relative"
                    style={{ 
                      width: `${selectedTechDetails.proficiency}%`,
                      backgroundColor: getProficiencyColor(selectedTechDetails.proficiency)
                    }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                      {selectedTechDetails.proficiency}%
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <span 
                    className="text-sm font-medium"
                    style={{ color: getProficiencyColor(selectedTechDetails.proficiency) }}
                  >
                    {getProficiencyLabel(selectedTechDetails.proficiency)} Level
                  </span>
                </div>
              </div>
              
              {/* Experience and projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedTechDetails.years && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">EXPERIENCE</h4>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                        <BookMarked className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <span className="text-2xl font-bold text-gray-800">{selectedTechDetails.years}</span>
                        <span className="text-gray-600 ml-1">{selectedTechDetails.years === 1 ? 'year' : 'years'}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedTechDetails.projects && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">PROJECTS</h4>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mr-3">
                        <FolderGit className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <span className="text-2xl font-bold text-gray-800">{selectedTechDetails.projects}</span>
                        <span className="text-gray-600 ml-1">{selectedTechDetails.projects === 1 ? 'project' : 'projects'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedTech(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};