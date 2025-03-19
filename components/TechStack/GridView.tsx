import React from 'react';
import { Activity, ZoomIn } from 'lucide-react';
import { TechStackItem } from '@/app/types/techStack';
import { colorMap, getProficiencyColor } from '@/app/utils/techStackUtils';

interface GridViewProps {
  items: TechStackItem[];
  isVisible: boolean;
  onItemClick: (techName: string) => void;
}

const GridView: React.FC<GridViewProps> = ({ items, isVisible, onItemClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {items.map((tech, index) => (
        <div 
          key={tech.name}
          className={`cursor-pointer group relative bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-500 
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} 
            hover:shadow-xl hover:-translate-y-1`}
          style={{ 
            transitionDelay: isVisible ? `${index * 50}ms` : '0ms'
          }}
          onClick={() => onItemClick(tech.name)}
        >
          {/* Progress indicator as a side bar */}
          <div 
            className="absolute top-0 left-0 w-1 h-full"
            style={{ 
              backgroundColor: getProficiencyColor(tech.proficiency)
            }}
          ></div>
          
          <div className="p-5 pl-6">
            {/* Tech icon */}
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                  style={{ 
                    backgroundColor: `${colorMap[tech.color as keyof typeof colorMap] || '#3b82f6'}15`
                  }}>
              <div style={{ color: colorMap[tech.color as keyof typeof colorMap] || '#3b82f6' }}>
                {tech.icon}
              </div>
            </div>
            
            {/* Tech name and category */}
            <h3 className="text-center font-semibold text-gray-900 mb-1 line-clamp-1">{tech.name}</h3>
            <p className="text-xs text-center text-gray-500 mb-3">{tech.category}</p>
            
            {/* Experience badge */}
            {tech.years && (
              <div className="flex items-center justify-center">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700">
                  <Activity className="w-3 h-3 mr-1" />
                  {tech.years} {tech.years === 1 ? 'year' : 'years'} exp
                </span>
              </div>
            )}
            
            {/* View details prompt on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-0 group-hover:opacity-90 transition-all duration-300 flex items-center justify-center">
              <div className="text-white font-medium flex items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <ZoomIn className="w-4 h-4 mr-1.5" />
                View Details
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridView;