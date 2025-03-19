import React from 'react';
import { ArrowUpRight, BookMarked, FolderGit } from 'lucide-react';
import { TechStackItem } from '@/app/types/techStack';
import { colorMap, getProficiencyColor, getProficiencyLabel } from '@/app/utils/techStackUtils';

interface DetailedViewProps {
  items: TechStackItem[];
  isVisible: boolean;
  onItemClick: (techName: string) => void;
}

const DetailedView: React.FC<DetailedViewProps> = ({ items, isVisible, onItemClick }) => {
  return (
    <div className="space-y-4">
      {items.map((tech, index) => (
        <div 
          key={tech.name}
          className={`cursor-pointer relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 
            ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'} 
            hover:shadow-xl`}
          style={{ 
            transitionDelay: isVisible ? `${index * 50}ms` : '0ms'
          }}
          onClick={() => onItemClick(tech.name)}
        >
          <div className="p-4 md:p-5 grid grid-cols-12 gap-4 items-center">
            {/* Left color indicator */}
            <div 
              className="absolute top-0 left-0 w-1 h-full"
              style={{ backgroundColor: getProficiencyColor(tech.proficiency) }}
            ></div>
            
            {/* Tech icon */}
            <div className="col-span-2 sm:col-span-1">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center"
                    style={{ 
                      backgroundColor: `${colorMap[tech.color as keyof typeof colorMap] || '#3b82f6'}15`
                    }}>
                <div style={{ color: colorMap[tech.color as keyof typeof colorMap] || '#3b82f6' }}>
                  {tech.icon}
                </div>
              </div>
            </div>
            
            {/* Tech info */}
            <div className="col-span-6 sm:col-span-5 md:col-span-4">
              <div className="flex items-center">
                <h3 className="font-semibold text-gray-900">{tech.name}</h3>
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                  {tech.category}
                </span>
              </div>
              <p className="text-sm text-gray-500 line-clamp-1 md:line-clamp-2 mt-1">
                {tech.description || `Expertise in ${tech.name} development and implementation.`}
              </p>
            </div>
            
            {/* Progress and metrics */}
            <div className="col-span-4 sm:col-span-6 md:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Proficiency bar */}
              <div className="hidden md:block">
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${tech.proficiency}%`,
                      backgroundColor: getProficiencyColor(tech.proficiency)
                    }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs font-medium" style={{ color: getProficiencyColor(tech.proficiency) }}>
                    {getProficiencyLabel(tech.proficiency)}
                  </span>
                  <span className="text-xs text-gray-500">{tech.proficiency}%</span>
                </div>
              </div>
              
              {/* Experience and projects - mobile optimized */}
              <div className="col-span-4 sm:col-span-6 md:col-span-2 flex flex-wrap gap-2 md:gap-4 justify-end">
                {tech.years && (
                  <div className="flex items-center whitespace-nowrap">
                    <BookMarked className="w-4 h-4 text-blue-600 mr-1" />
                    <span className="text-sm text-gray-700">
                      {tech.years} {tech.years === 1 ? 'year' : 'years'}
                    </span>
                  </div>
                )}
                
                {tech.projects && (
                  <div className="flex items-center whitespace-nowrap">
                    <FolderGit className="w-4 h-4 text-indigo-600 mr-1" />
                    <span className="text-sm text-gray-700">
                      {tech.projects} {tech.projects === 1 ? 'project' : 'projects'}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-end ml-auto">
                  <span className="inline-flex items-center text-blue-600 text-sm">
                    Details
                    <ArrowUpRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailedView;