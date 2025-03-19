import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to handle scroll-based visibility of elements with performance optimizations
 * @returns Visible item indices and function to check visibility
 */
export const useScrollVisibility = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const scrollHandlerRef = useRef<boolean>(false);
  
  // Check visibility of elements based on scroll position
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
  
  // Set up scroll listener with performance optimization
  useEffect(() => {
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
  
  return { visibleItems, checkVisibility };
};

export default useScrollVisibility;