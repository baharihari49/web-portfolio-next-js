// ====== ABOUT ANIMATION CLIENT COMPONENT ======
// File: components/AboutAnimationClient.tsx

'use client';
import { useEffect } from 'react';

const AboutAnimationClient = () => {
  useEffect(() => {
    // Intersection Observer options
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px', // Trigger animation when element is 10% visible
      threshold: 0.1 // Trigger when 10% of element is visible
    };

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const animationClass = element.getAttribute('data-animation');
          const delay = element.getAttribute('data-delay');
          
          if (animationClass) {
            // Add delay if specified
            if (delay) {
              setTimeout(() => {
                element.classList.add(animationClass);
                element.classList.remove('animate-on-scroll');
              }, parseInt(delay));
            } else {
              element.classList.add(animationClass);
              element.classList.remove('animate-on-scroll');
            }
          }
          
          // Stop observing this element
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    // Find all elements to animate
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Start observing each element
    animatedElements.forEach((element) => {
      observer.observe(element);
    });

    // Cleanup function
    return () => {
      animatedElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default AboutAnimationClient;