'use client';

import React, { useEffect, useCallback } from 'react';
import { X, Maximize2, Minimize2, ExternalLink } from 'lucide-react';
import { CollectionItem } from '@/app/types/collection';

interface GalleryModalProps {
  item: CollectionItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ item, isOpen, onClose }) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    },
    [onClose, isFullscreen]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !item) return null;

  const openInNewTab = () => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(item.htmlContent);
      newWindow.document.close();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-xl shadow-2xl transition-all duration-300 flex flex-col ${
          isFullscreen
            ? 'w-full h-full rounded-none'
            : 'w-[95vw] h-[90vh] max-w-7xl'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-xl flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <h3 className="font-medium text-gray-800 truncate max-w-[300px] sm:max-w-none">
              {item.title}
            </h3>
            <span className="hidden sm:inline-flex px-2 py-0.5 bg-purple-100 text-purple-600 text-xs font-medium rounded">
              {item.category.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openInNewTab}
              className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5" />
              ) : (
                <Maximize2 className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content - iframe */}
        <div className="flex-1 overflow-hidden bg-white">
          <iframe
            srcDoc={item.htmlContent}
            className="w-full h-full border-0"
            title={item.title}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
