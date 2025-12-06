'use client';

import { useState, useEffect, Suspense } from 'react';
import { Search, Layout, X } from 'lucide-react';
import { CollectionItem } from '@/app/types/collection';
import { fetchCollections } from '@/services/collectionService';
import GalleryItem from '@/components/Gallery/GalleryItem';
import GalleryModal from '@/components/Gallery/GalleryModal';
import GalleryFilter from '@/components/Gallery/GalleryFilter';
import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const ITEMS_PER_PAGE = 12;

export default function GalleryShowcase() {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<CollectionItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchGalleryData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const fetchGalleryData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchCollections();
      setCollections(data);
      setFilteredItems(data);

      const uniqueCategories = [...new Set(data.map((item) => item.category.name))];
      setCategories(uniqueCategories);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching gallery:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = collections;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((item) => item.category.name === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.category.name.toLowerCase().includes(query)
      );
    }

    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, collections]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePreview = (item: CollectionItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        <Header activeSection="gallery" />

        <main>
          {/* Hero Section - Simple & Clean */}
          <section className="pt-24 pb-8">
            <div className="max-w-7xl mx-auto px-6">
              {/* Title & Stats */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Design Gallery
                  </h1>
                  <p className="text-gray-600">
                    Explore {collections.length} templates across {categories.length} categories
                  </p>
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search templates..."
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

              {/* Filter */}
              {categories.length > 0 && (
                <GalleryFilter
                  categories={categories}
                  activeCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              )}
            </div>
          </section>

          {/* Gallery Grid */}
          <section className="pb-16">
            <div className="max-w-7xl mx-auto px-6">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
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
                    onClick={fetchGalleryData}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="text-center py-16">
                  <Layout className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Templates Found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchQuery
                      ? `No results for "${searchQuery}"`
                      : 'No templates match your current filter.'}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <>
                  <Suspense fallback={<div className="h-96" />}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {currentItems.map((item, index) => (
                        <GalleryItem
                          key={item.id}
                          item={item}
                          index={index}
                          isVisible={isVisible}
                          onPreview={handlePreview}
                        />
                      ))}
                    </div>
                  </Suspense>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>
                      <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                              currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {/* Results count */}
                  <div className="text-center mt-6">
                    <p className="text-gray-500 text-sm">
                      Showing {currentItems.length} of {filteredItems.length} templates
                    </p>
                  </div>
                </>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>

      {/* Preview Modal */}
      <GalleryModal item={selectedItem} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
