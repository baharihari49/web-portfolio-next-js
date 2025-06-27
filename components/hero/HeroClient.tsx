// ====== STEP 2: UPDATE HEROCLIENT ======
// File: components/hero/HeroClient.tsx

'use client'
import React, { useEffect, useState } from 'react';

interface HeroClientProps {
  children: React.ReactNode;
}

const HeroClient: React.FC<HeroClientProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Animation on mount dan smooth scroll setup
  useEffect(() => {
    setIsVisible(true);
    
    // Add smooth scroll behavior untuk semua links dengan hash
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      
      // Check if it's a link with hash
      if (target.href && target.href.includes('#')) {
        // Skip external links
        if (target.href.startsWith('http') && !target.href.includes(window.location.origin)) {
          return;
        }
        
        e.preventDefault();
        const id = target.href.split('#')[1];
        const element = document.getElementById(id);
        
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Add event listeners ke semua links dengan hash di dalam hero section
    const heroSection = document.getElementById('home');
    if (heroSection) {
      const links = heroSection.querySelectorAll('a[href*="#"]');
      links.forEach(link => {
        link.addEventListener('click', handleLinkClick);
      });

      // Cleanup
      return () => {
        links.forEach(link => {
          link.removeEventListener('click', handleLinkClick);
        });
      };
    }
  }, []);

  return (
    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {children}
    </div>
  );
};

export default HeroClient;