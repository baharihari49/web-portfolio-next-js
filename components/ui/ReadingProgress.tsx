'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Eye, Share2 } from 'lucide-react';
import { calculateReadingTime, formatRelativeTime } from '@/lib/contentUtils';

interface ReadingProgressProps {
  content: string;
  publishedDate?: string;
  className?: string;
  showStats?: boolean;
  onShareClick?: () => void;
}

export const ReadingProgress: React.FC<ReadingProgressProps> = ({
  content,
  publishedDate,
  className = "",
  showStats = true,
  onShareClick,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Calculate reading time
  useEffect(() => {
    const time = calculateReadingTime(content);
    setReadingTime(time);
  }, [content]);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      
      // Show progress bar after scrolling 10%
      setIsVisible(progress > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track time spent reading
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeSpent = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const progressPercentage = Math.round(scrollProgress);
  const estimatedTimeLeft = Math.max(0, readingTime - Math.ceil(timeSpent / 60));

  return (
    <>
      {/* Fixed Progress Bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="h-1 bg-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        
        {/* Progress Stats */}
        {showStats && isVisible && (
          <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-2">
            <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
              <div className="flex items-center gap-4 text-gray-600">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {progressPercentage}% read
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {estimatedTimeLeft > 0 ? `${estimatedTimeLeft}m left` : 'Complete'}
                </span>
                {timeSpent > 0 && (
                  <span className="text-gray-500">
                    Reading for {formatTimeSpent(timeSpent)}
                  </span>
                )}
              </div>
              
              {onShareClick && (
                <button
                  onClick={onShareClick}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Article Stats (for article header) */}
      {showStats && (
        <div className={`flex items-center gap-4 text-sm text-gray-600 ${className}`}>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {readingTime} min read
          </span>
          {publishedDate && (
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatRelativeTime(publishedDate)}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {Math.ceil(content.split(' ').length / 200)} min reading time
          </span>
        </div>
      )}
    </>
  );
};

// Calendar import for the component
const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export default ReadingProgress;