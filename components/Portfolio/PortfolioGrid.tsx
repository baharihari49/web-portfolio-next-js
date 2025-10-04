import React from 'react';
import PortfolioItem from './PortfolioItem';
import { PortfolioItem as PortfolioItemType } from '@/app/types/portfolio';
import useScrollVisibility from '@/app/hooks/useScrollVisibility';

interface PortfolioGridProps {
  items: PortfolioItemType[];
  currentPage: number;
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ items, currentPage }) => {
  // Use custom hook for scroll-based visibility
  const { visibleItems } = useScrollVisibility();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
      {items.map((item, index) => (
        <PortfolioItem 
          key={`${currentPage}-${index}`}
          item={item}
          index={index}
          isVisible={visibleItems.includes(index)}
        />
      ))}
    </div>
  );
};

export default PortfolioGrid;