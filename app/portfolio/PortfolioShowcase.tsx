'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import PortfolioFilter from '@/components/Portfolio/PortfolioFilter';
import PortfolioGrid from '@/components/Portfolio/PortfolioGrid';
import Pagination from '@/components/Portfolio/Pagination';
import NoResults from '@/components/Portfolio/NoResults';
import { PortfolioItem } from '@/app/types/portfolio';
import PortfolioBreadcrumb from './PortfolioBreadcrumb';
import PortfolioStructuredData from './PortfolioStructuredData';
import PortfolioHero from './PortfolioHero';
import PortfolioStats from './PortfolioStats';
import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Rocket, Star, Briefcase } from 'lucide-react';

const ITEMS_PER_PAGE = 9;

export default function PortfolioShowcase() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/portfolio`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio data');
      }
      
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setPortfolioItems(data.data);
        setFilteredItems(data.data);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching portfolio:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = portfolioItems;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, portfolioItems]);

  const categories = ['all', ...Array.from(new Set(portfolioItems.map(item => item.category)))];
  
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <PortfolioStructuredData items={portfolioItems} />
      
      <div className="min-h-screen bg-background">
        <Header activeSection="portfolio" />
        
        <main>
          <PortfolioBreadcrumb />
          
          <PortfolioHero />
          
          <PortfolioStats items={portfolioItems} />
          
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Section Header */}
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    My Projects
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover the complete collection of my work - from web applications to innovative digital solutions. 
                    Each project showcases different technologies and creative approaches.
                  </p>
                </div>
                
                <PortfolioFilter
                  categories={categories}
                  filter={selectedCategory}
                  setFilter={setSelectedCategory}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />

                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="space-y-4">
                        <Skeleton className="h-48 w-full rounded-xl" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-500">Error: {error}</p>
                    <button
                      onClick={fetchPortfolioData}
                      className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                ) : filteredItems.length === 0 ? (
                  <NoResults />
                ) : (
                  <>
                    <Suspense fallback={<div className="h-96" />}>
                      <PortfolioGrid items={currentItems} />
                    </Suspense>

                    {totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        paginate={setCurrentPage}
                      />
                    )}
                  </>
                )}
              </motion.div>
            </div>
          </section>
          
          {/* Call to Action Section */}
          <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white">
            {/* Subtle decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-100 rounded-full opacity-30 blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
            </div>
            
            {/* Decorative grid pattern */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(99 102 241) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
            
            <div className="relative max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Icon and badge */}
                <div className="flex justify-center items-center gap-2 mb-6">
                  <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium"
                  >
                    Ready to Create Something Amazing?
                  </motion.div>
                </div>
                
                <h3 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
                  Let's Bring Your Vision to Life
                </h3>
                
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
                  From concept to deployment, I craft digital experiences that not only look stunning 
                  but deliver real results for your business.
                </p>
                
                {/* Feature highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                      </svg>
                    </div>
                    <h4 className="text-gray-800 font-semibold mb-1">Custom Solutions</h4>
                    <p className="text-gray-600 text-sm">Tailored to your unique needs</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h4 className="text-gray-800 font-semibold mb-1">Results Driven</h4>
                    <p className="text-gray-600 text-sm">Performance that matters</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-gray-800 font-semibold mb-1">Fast Delivery</h4>
                    <p className="text-gray-600 text-sm">Quality work, on time</p>
                  </motion.div>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span>Start Your Project</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.a>
                  
                  <motion.a
                    href="/"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-all duration-300"
                  >
                    Learn More About Me
                  </motion.a>
                </div>
                
                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="pt-8 border-t border-gray-200 mt-12"
                >
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-indigo-600" />
                      <span>Total Projects: <strong className="text-gray-800">{portfolioItems.length}</strong></span>
                    </div>
                    <div className="hidden sm:block w-px h-6 bg-gray-200"></div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span>Currently Showing: <strong className="text-gray-800">{filteredItems.length}</strong></span>
                    </div>
                    <div className="hidden sm:block w-px h-6 bg-gray-200"></div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-green-600" />
                      <span>Available for new projects</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}