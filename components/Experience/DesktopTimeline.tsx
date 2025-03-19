import React from 'react';
import { ExperienceItem } from '@/app/types/experience';
import ExperienceCard from './ExperienceCard';

interface DesktopTimelineProps {
  experiences: ExperienceItem[];
  visibleItems: number[];
  expandedItems: number[];
  toggleExpand: (index: number) => void;
}

const DesktopTimeline: React.FC<DesktopTimelineProps> = ({
  experiences,
  visibleItems,
  expandedItems,
  toggleExpand
}) => {
  return (
    <div className="hidden lg:block relative">
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-blue-200 via-indigo-300 to-blue-200 rounded-full"></div>
      
      {experiences.map((experience, index) => (
        <div 
          key={index}
          className={`relative flex items-stretch mb-16 experience-card transition-all duration-700 ${
            visibleItems.includes(index) 
              ? 'opacity-100' 
              : 'opacity-0 ' + (index % 2 === 0 ? '-translate-x-12' : 'translate-x-12')
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          {/* Timeline node */}
          <div className="absolute left-1/2 top-10 transform -translate-x-1/2 flex flex-col items-center">
            <div className={`w-6 h-6 ${experience.current ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gray-400'} rounded-full shadow-lg z-10 relative ${experience.current ? 'animate-pulse' : ''}`}>
              {experience.current && (
                <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-50"></div>
              )}
            </div>
          </div>
          
          {/* Content card - alternating sides */}
          <div className={`w-5/12 ${index % 2 === 0 ? 'mr-auto pr-12' : 'ml-auto pl-12'}`}>
            <ExperienceCard 
              experience={experience}
              index={index}
              isVisible={visibleItems.includes(index)}
              isExpanded={expandedItems.includes(index)}
              toggleExpand={toggleExpand}
              isLeftAligned={index % 2 === 0}
              isCompact={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DesktopTimeline;