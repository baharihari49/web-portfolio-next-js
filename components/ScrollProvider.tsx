// ScrollProvider.tsx
'use client'
import React, { useState, useEffect, createContext, useContext } from 'react';
import { ChevronDown } from 'lucide-react';
import { useEmailJsInit } from '../lib/emailJs';

// Create scroll context
interface ScrollContextType {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

// Hook to use scroll context
export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within ScrollProvider');
  }
  return context;
};

interface ScrollProviderProps {
  children: React.ReactNode;
}

// BackToTop Component
const BackToTop = () => {
  const { scrollToSection } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => scrollToSection('#home')}
      className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all duration-300 z-40 opacity-90 hover:opacity-100"
      aria-label="Back to top"
    >
      <ChevronDown className="transform rotate-180" size={24} />
    </button>
  );
};

const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 300;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Initialize EmailJS
  useEmailJsInit();

  const contextValue: ScrollContextType = {
    activeSection,
    scrollToSection,
  };

  return (
    <ScrollContext.Provider value={contextValue}>
      {/* Pass scroll props to children components that need them */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Get the component name/type more reliably
          const Component = child.type;
          const displayName = Component?.displayName || Component?.name;
          
          // Pass props to Header component
          if (displayName === 'Header') {
            return React.cloneElement(child as React.ReactElement<any>, {
              activeSection,
              scrollToSection,
            });
          }
          
          // Pass props to Hero component
          if (displayName === 'Hero') {
            return React.cloneElement(child as React.ReactElement<any>, {
              scrollToSection,
            });
          }
        }
        return child;
      })}
      <BackToTop />
    </ScrollContext.Provider>
  );
};

export default ScrollProvider;