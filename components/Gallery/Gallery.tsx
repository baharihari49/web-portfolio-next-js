'use client';

import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { CollectionItem } from '@/app/types/collection';
import { fetchCollections } from '@/services/collectionService';
import GalleryItem from './GalleryItem';
import GalleryModal from './GalleryModal';
import GalleryFilter from './GalleryFilter';

const Gallery: React.FC = () => {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        setLoading(true);
        const data = await fetchCollections();
        setCollections(data);

        // Extract unique categories
        const uniqueCategories = [...new Set(data.map((item) => item.category.name))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load collections');
      } finally {
        setLoading(false);
      }
    };

    loadCollections();
  }, []);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handlePreview = (item: CollectionItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const filteredCollections =
    activeCategory === 'all'
      ? collections
      : collections.filter((item) => item.category.name === activeCategory);

  return (
    <section
      id="gallery"
      className="py-20 md:py-32 bg-gradient-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-purple-200 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-200 rounded-full opacity-30 blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-200 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="px-3 w-fit mx-auto py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4 flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Template Collection
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 inline-block text-transparent bg-clip-text">
            Design Gallery
          </h2>
          <p className="text-gray-600 text-lg">
            Explore my collection of landing page designs and UI templates. Click to preview any
            template in full interactive mode.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-8 bg-red-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Error Loading Gallery</h3>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              Try Again
            </button>
          </div>
        ) : collections.length === 0 ? (
          <div className="text-center text-gray-500 p-12">
            <Palette className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold mb-2">No Templates Yet</h3>
            <p>Check back soon for new designs!</p>
          </div>
        ) : (
          <>
            {/* Category filter */}
            {categories.length > 1 && (
              <GalleryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            )}

            {/* Gallery grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCollections.map((item, index) => (
                <GalleryItem
                  key={item.id}
                  item={item}
                  index={index}
                  isVisible={isVisible}
                  onPreview={handlePreview}
                />
              ))}
            </div>

            {/* Results count */}
            <div className="text-center mt-10">
              <p className="text-gray-500">
                Showing{' '}
                <span className="font-semibold text-purple-600">
                  {filteredCollections.length}
                </span>{' '}
                of <span className="font-semibold text-purple-600">{collections.length}</span>{' '}
                templates
              </p>
            </div>
          </>
        )}
      </div>

      {/* Preview Modal */}
      <GalleryModal item={selectedItem} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default Gallery;
