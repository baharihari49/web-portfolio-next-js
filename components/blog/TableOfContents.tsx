// components/blog/TableOfContents.tsx
import React, { useState, useEffect } from 'react';
import { TableOfContentsItem } from './types/blog';

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = (): void => {
      const headings = items.map(item => document.getElementById(item.id));
      
      const visibleHeadings = headings.filter(heading => {
        if (!heading) return false;
        
        const rect = heading.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight / 2;
      });
      
      if (visibleHeadings.length > 0) {
        const topHeading = visibleHeadings[0];
        if (topHeading && topHeading.id) {
          setActiveId(topHeading.id);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Call once on mount to set initial active item
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items]);
  
  const handleClick = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  // Only render if we have items
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8 animate-on-scroll opacity-0">
      <h4 className="text-lg font-semibold text-gray-800 mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-8 after:bg-blue-600">
        Table of Contents
      </h4>
      <nav>
        <ul className="space-y-2">
          {items.map((item) => (
            <li 
              key={item.id}
              className={`pl-${(item.level - 2) * 4} transition-all duration-200`}
            >
              <button
                onClick={() => handleClick(item.id)}
                className={`text-left w-full py-1 px-2 rounded-md hover:bg-gray-100 transition-colors ${
                  activeId === item.id 
                    ? 'text-blue-600 font-medium bg-blue-50' 
                    : 'text-gray-700'
                }`}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TableOfContents;