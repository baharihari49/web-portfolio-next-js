// HeroClient.tsx
'use client'
import React, { useEffect, useState } from 'react';

interface HeroClientProps {
  children: React.ReactNode;
  scrollToSection?: (sectionId: string) => void;
}

const HeroClient: React.FC<HeroClientProps> = ({ children, scrollToSection }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Pass scrollToSection to children if needed */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Clone child and pass scrollToSection if the child contains interactive elements
          return React.cloneElement(child, { scrollToSection } as any);
        }
        return child;
      })}
    </div>
  );
};

export default HeroClient;