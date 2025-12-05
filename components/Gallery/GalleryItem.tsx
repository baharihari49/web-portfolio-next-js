'use client';

import React from 'react';
import Image from 'next/image';
import { Eye, Folder } from 'lucide-react';
import { CollectionItem } from '@/app/types/collection';

interface GalleryItemProps {
  item: CollectionItem;
  index: number;
  isVisible: boolean;
  onPreview: (item: CollectionItem) => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item, index, isVisible, onPreview }) => {
  return (
    <div
      className={`gallery-item transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${(index % 4) * 100}ms` }}
    >
      <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative w-full pt-[60%]">
          <div className="absolute inset-0">
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority={index < 4}
              loading={index < 4 ? 'eager' : 'lazy'}
            />
          </div>

          {/* Category badge */}
          <div className="absolute top-3 left-3 px-2 py-1 bg-purple-600 rounded-md text-white text-xs font-medium flex items-center gap-1">
            <Folder className="w-3 h-3" />
            {item.category.name}
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={() => onPreview(item)}
              className="transform scale-90 group-hover:scale-100 transition-transform duration-300 w-14 h-14 rounded-full bg-white flex items-center justify-center text-purple-600 hover:bg-purple-50 shadow-lg"
              aria-label="Preview template"
            >
              <Eye className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4" onClick={() => onPreview(item)}>
          <h3 className="text-base font-semibold text-gray-800 truncate group-hover:text-purple-600 transition-colors">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-1">{item.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
