import React from 'react';
import { 
  Globe, Layout, Smartphone, 
  PaintBucket, Code 
} from 'lucide-react';
import { PortfolioItem } from '@/app/types/portfolio';

/**
 * Get technology color based on name
 * @param tech Technology name
 * @returns CSS class names for background and text color
 */
export const getTechColor = (tech: string): string => {
  const techColors: {[key: string]: string} = {
    'React': 'bg-blue-100 text-blue-700',
    'Next.js': 'bg-gray-800 text-white',
    'TypeScript': 'bg-blue-100 text-blue-700',
    'JavaScript': 'bg-yellow-100 text-yellow-700',
    'HTML5': 'bg-orange-100 text-orange-700',
    'CSS3': 'bg-purple-100 text-purple-700',
    'Tailwind': 'bg-teal-100 text-teal-700',
    'Tailwind CSS': 'bg-teal-100 text-teal-700',
    'Node.js': 'bg-green-100 text-green-700',
    'MongoDB': 'bg-green-100 text-green-700',
    'Firebase': 'bg-orange-100 text-orange-700',
    'PostgreSQL': 'bg-blue-100 text-blue-700',
    'Express': 'bg-gray-100 text-gray-700',
    'Redux': 'bg-purple-100 text-purple-700',
    'Bootstrap': 'bg-purple-100 text-purple-700',
    'Angular': 'bg-red-100 text-red-700',
    'GSAP': 'bg-green-100 text-green-700',
    'Chart.js': 'bg-blue-100 text-blue-700',
    'Framer Motion': 'bg-purple-100 text-purple-700',
  };
  
  return techColors[tech] || 'bg-gray-100 text-gray-700';
};

/**
 * Get category icon component based on category name
 * @param category Category name
 * @returns React icon component
 */
export const getCategoryIcon = (category: string): React.ReactNode => {
  switch(category) {
    case 'Web': return <Globe className="w-4 h-4" />;
    case 'Web App': return <Layout className="w-4 h-4" />;
    case 'Mobile App': return <Smartphone className="w-4 h-4" />;
    case 'Design': return <PaintBucket className="w-4 h-4" />;
    default: return <Code className="w-4 h-4" />;
  }
};

/**
 * Filter portfolio items based on category and search query
 * @param items Portfolio items to filter
 * @param filter Category filter
 * @param searchQuery Search query
 * @returns Filtered portfolio items
 */
export const filterPortfolioItems = (
  items: PortfolioItem[],
  filter: string,
  searchQuery: string
): PortfolioItem[] => {
  return items.filter(item => {
    // Category filter
    if (filter !== 'all' && item.category !== filter) return false;
    
    // Search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        (item.technologies && item.technologies.some(tech => tech.toLowerCase().includes(query)))
      );
    }
    
    return true;
  });
};