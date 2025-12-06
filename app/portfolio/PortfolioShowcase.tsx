'use client';

import { useState, useEffect, Suspense } from 'react';
import { Search, Briefcase, X } from 'lucide-react';
import PortfolioGrid from '@/components/Portfolio/PortfolioGrid';
import Pagination from '@/components/Portfolio/Pagination';
import NoResults from '@/components/Portfolio/NoResults';
import { PortfolioItem } from '@/app/types/portfolio';
import PortfolioStructuredData from './PortfolioStructuredData';
import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        (item.technologies && item.technologies.some(tech => tech.toLowerCase().includes(query)))
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

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <>
      <PortfolioStructuredData items={portfolioItems} />

      <div className="min-h-screen bg-white">
        <Header activeSection="portfolio" />

        <main>
          {/* Hero Section - Simple & Clean */}
          <section className="pt-24 pb-8">
            <div className="max-w-7xl mx-auto px-6">
              {/* Title & Stats */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    My Portfolio
                  </h1>
                  <p className="text-gray-600">
                    Explore {portfolioItems.length} projects across {categories.length - 1} categories
                  </p>
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All Projects' : category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Portfolio Grid */}
          <section className="pb-16">
            <div className="max-w-7xl mx-auto px-6">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="h-48 w-full rounded-xl" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-16">
                  <p className="text-red-500 mb-4">Error: {error}</p>
                  <button
                    onClick={fetchPortfolioData}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="text-center py-16">
                  <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Projects Found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchQuery
                      ? `No results for "${searchQuery}"`
                      : 'No projects match your current filter.'}
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <>
                  <Suspense fallback={<div className="h-96" />}>
                    <PortfolioGrid items={currentItems} currentPage={currentPage} />
                  </Suspense>

                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      paginate={setCurrentPage}
                    />
                  )}

                  {/* Results count */}
                  <div className="text-center mt-6">
                    <p className="text-gray-500 text-sm">
                      Showing {currentItems.length} of {filteredItems.length} projects
                    </p>
                  </div>
                </>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
