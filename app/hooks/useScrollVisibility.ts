import { useState, useEffect, useRef, useCallback } from 'react';

export const useScrollVisibility = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const scrollHandlerRef = useRef<boolean>(false);
  
  // Menggunakan useCallback untuk memoize fungsi checkVisibility
  const checkVisibility = useCallback(() => {
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
  }, [visibleItems.length]);
  
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
  }, [checkVisibility]); // Sekarang checkVisibility adalah dependensi
  
  return { visibleItems, checkVisibility };
};

export default useScrollVisibility;