'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Layout, Sparkles, ArrowRight } from 'lucide-react';
import { CollectionItem } from '@/app/types/collection';
import { fetchCollections } from '@/services/collectionService';
import GalleryItem from '@/components/Gallery/GalleryItem';
import GalleryModal from '@/components/Gallery/GalleryModal';
import GalleryFilter from '@/components/Gallery/GalleryFilter';
import GalleryBreadcrumb from './GalleryBreadcrumb';
import GalleryHero from './GalleryHero';
import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const ITEMS_PER_PAGE = 12;

export default function GalleryShowcase() {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<CollectionItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
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

      // Extract unique categories
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

    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [selectedCategory, collections]);

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

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header activeSection="gallery" />

        <main>
          <GalleryBreadcrumb />

          <GalleryHero />

          {/* Stats Section */}
          <section className="py-8 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{collections.length}</div>
                  <div className="text-gray-600 text-sm">Total Templates</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">{categories.length}</div>
                  <div className="text-gray-600 text-sm">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">100%</div>
                  <div className="text-gray-600 text-sm">Responsive</div>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
              <div className="absolute -top-20 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
              <div className="absolute bottom-20 left-0 w-96 h-96 bg-indigo-200 rounded-full opacity-30 blur-3xl"></div>

              {/* Code patterns */}
              <div className="absolute top-10 left-10 text-blue-100 opacity-10 text-9xl font-mono">
                &lt;/&gt;
              </div>
              <div className="absolute bottom-10 right-10 text-indigo-100 opacity-10 text-9xl font-mono">
                {`{ }`}
              </div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Section Header */}
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    All Templates
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Browse through the complete collection. Click on any template to see it in
                    action with full interactive preview.
                  </p>
                </div>

                {/* Filter */}
                {categories.length > 0 && (
                  <GalleryFilter
                    categories={categories}
                    activeCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                  />
                )}

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
                  <div className="text-center py-12">
                    <p className="text-red-500">Error: {error}</p>
                    <button
                      onClick={fetchGalleryData}
                      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                ) : filteredItems.length === 0 ? (
                  <div className="text-center py-12">
                    <Layout className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Templates Found</h3>
                    <p className="text-gray-500 mb-4">
                      No templates match your current filter.
                    </p>
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View All Templates
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
                    <div className="text-center mt-8">
                      <p className="text-gray-600">
                        Showing{' '}
                        <span className="font-semibold text-blue-600">{currentItems.length}</span>{' '}
                        of{' '}
                        <span className="font-semibold text-blue-600">{filteredItems.length}</span>{' '}
                        templates
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white">
            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-100 rounded-full opacity-30 blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
            </div>

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgb(99 102 241) 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }}
            ></div>

            <div className="relative max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Badge */}
                <div className="flex justify-center items-center gap-2 mb-6">
                  <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center"
                  >
                    <Sparkles className="w-6 h-6 text-indigo-600" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium"
                  >
                    Need a Custom Design?
                  </motion.div>
                </div>

                <h3 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
                  Let&apos;s Create Something Amazing Together
                </h3>

                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
                  Looking for a unique landing page or UI design? I can create a custom template
                  tailored to your brand and needs.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.a
                    href="/#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span>Get Custom Design</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.a>

                  <motion.a
                    href="/"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300"
                  >
                    Back to Home
                  </motion.a>
                </div>
              </motion.div>
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
