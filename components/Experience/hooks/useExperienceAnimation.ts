'use client';
import { useState, useEffect, useRef } from 'react';

export const useExperienceAnimation = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const scrollHandlerRef = useRef<boolean>(false);
  
  // Handle scroll animations with throttling to improve performance
  useEffect(() => {
    const checkVisibility = () => {
      const elements = document.querySelectorAll('.experience-card');
      const newVisibleItems: number[] = [];
      
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.85) {
          newVisibleItems.push(index);
        }
      });
      
      if (newVisibleItems.length > visibleItems.length) {
        setVisibleItems(newVisibleItems);
      }
    };

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
  
  return { visibleItems };
};

export default useExperienceAnimation;