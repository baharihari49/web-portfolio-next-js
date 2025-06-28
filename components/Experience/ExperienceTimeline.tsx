// components/Experience/ExperienceTimeline.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { ExperienceItem } from '@/app/types/experience';
import { Calendar, MapPin, ExternalLink, ChevronDown, ChevronUp, Building2, Code, Award } from 'lucide-react';

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
  expandedItems: number[];
  toggleExpand: (index: number) => void;
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experiences,
  expandedItems,
  toggleExpand
}) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [experiences]);

  if (experiences.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Building2 className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No experiences found</h3>
        <p className="text-gray-500">Try selecting a different filter to see experiences.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Timeline */}
      <DesktopTimeline
        experiences={experiences}
        visibleItems={visibleItems}
        expandedItems={expandedItems}
        toggleExpand={toggleExpand}
      />

      {/* Mobile Timeline */}
      <MobileTimeline
        experiences={experiences}
        visibleItems={visibleItems}
        expandedItems={expandedItems}
        toggleExpand={toggleExpand}
      />
    </>
  );
};

// Desktop Timeline Component
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
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 bg-gradient-to-b from-blue-200 via-indigo-300 to-purple-200 rounded-full"></div>
      
      {experiences.map((experience, index) => (
        <div 
          key={index}
          data-index={index}
          className={`timeline-item relative flex items-stretch mb-16 transition-all duration-700 ${
            visibleItems.includes(index) 
              ? 'opacity-100' 
              : 'opacity-0 ' + (index % 2 === 0 ? '-translate-x-12' : 'translate-x-12')
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          {/* Timeline node */}
          <div className="absolute left-1/2 top-10 transform -translate-x-1/2 flex flex-col items-center z-10">
            <div className={`w-5 h-5 rounded-full border-2 border-white shadow-sm transition-all duration-500 ${
              experience.current 
                ? 'bg-emerald-500' 
                : 'bg-gray-400'
            }`}>
              {/* Small circle node */}
            </div>
          </div>
          
          {/* Content card - alternating sides */}
          <div className={`w-5/12 ${index % 2 === 0 ? 'mr-auto pr-12' : 'ml-auto pl-12'}`}>
            <ExperienceCard 
              experience={experience}
              index={index}
              isExpanded={expandedItems.includes(index)}
              toggleExpand={toggleExpand}
              position={index % 2 === 0 ? 'left' : 'right'}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// Mobile Timeline Component
interface MobileTimelineProps {
  experiences: ExperienceItem[];
  visibleItems: number[];
  expandedItems: number[];
  toggleExpand: (index: number) => void;
}

const MobileTimeline: React.FC<MobileTimelineProps> = ({
  experiences,
  visibleItems,
  expandedItems,
  toggleExpand
}) => {
  return (
    <div className="lg:hidden relative">
      {/* Timeline Line */}
      <div className="absolute left-6 top-0 h-full w-1 bg-gradient-to-b from-blue-200 via-indigo-300 to-purple-200 rounded-full"></div>
      
      {experiences.map((experience, index) => (
        <div 
          key={index}
          data-index={index}
          className={`timeline-item relative pl-16 mb-12 transition-all duration-700 ${
            visibleItems.includes(index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          {/* Timeline node */}
          <div className="absolute left-6 top-10 transform -translate-x-1/2 flex flex-col items-center z-10">
            <div className={`w-4 h-4 rounded-full border-2 border-white shadow-sm ${
              experience.current 
                ? 'bg-emerald-500' 
                : 'bg-gray-400'
            }`}>
              {/* Small circle node */}
            </div>
          </div>
          
          <ExperienceCard 
            experience={experience}
            index={index}
            isExpanded={expandedItems.includes(index)}
            toggleExpand={toggleExpand}
            position="mobile"
          />
        </div>
      ))}
    </div>
  );
};

// Experience Card Component
interface ExperienceCardProps {
  experience: ExperienceItem;
  index: number;
  isExpanded: boolean;
  toggleExpand: (index: number) => void;
  position: 'left' | 'right' | 'mobile';
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  index,
  isExpanded,
  toggleExpand,
  position
}) => {
  const getJobTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'full-time':
      case 'fulltime':
        return 'bg-blue-500';
      case 'part-time':
      case 'parttime':
        return 'bg-blue-500';
      case 'contract':
        return 'bg-purple-500';
      case 'freelance':
        return 'bg-orange-500';
      case 'internship':
        return 'bg-cyan-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={`
      relative group
      ${position === 'mobile' ? 'p-3' : 'p-4'}
    `}>
      {/* Main Card */}
      <div className={`
        relative bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md 
        transition-all duration-300 group-hover:-translate-y-0.5
        ${experience.current ? 'ring-1 ring-blue-200' : ''}
        overflow-hidden
      `}>
        
        {/* Header Section - Horizontal Layout */}
        <div className="p-4">
          <div className="flex gap-3">
            {/* Company Logo */}
            {experience.companyLogo && (
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img 
                    src={experience.companyLogo} 
                    alt={`${experience.company} logo`}
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Job Title */}
              <h3 className={`
                font-semibold text-gray-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors duration-300
                ${position === 'mobile' ? 'text-base' : 'text-lg'}
              `}>
                {experience.title}
              </h3>
              
              {/* Company Info */}
              {experience.company && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-blue-600 font-medium text-sm hover:underline cursor-pointer">
                    {experience.company}
                  </span>
                  {experience.link && (
                    <a
                      href={experience.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}

              {/* Meta Information - Single Row Layout */}
              <div className="flex items-center justify-between w-full">
                {/* Left side - Date and Location */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  {experience.duration && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{experience.duration}</span>
                    </div>
                  )}
                  {experience.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{experience.location}</span>
                    </div>
                  )}
                </div>
                
                {/* Right side - Badge */}
                {experience.current && (
                  <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded">
                    Fulltime
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Key Responsibilities - Collapsible */}
        <div className="px-4 pb-4">
          <div className="border-t border-gray-100 pt-3">
            <h4 className="font-medium text-gray-900 mb-2 text-sm">Key Responsibilities</h4>
            
            <ul className="space-y-1.5">
              {experience.list.slice(0, isExpanded ? experience.list.length : 2).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            {experience.list.length > 2 && (
              <button
                onClick={() => toggleExpand(index)}
                className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 transition-colors"
              >
                {isExpanded ? (
                  <>Show less <ChevronUp className="w-3.5 h-3.5" /></>
                ) : (
                  <>Show {experience.list.length - 2} more <ChevronDown className="w-3.5 h-3.5" /></>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Technologies - When expanded */}
        {isExpanded && experience.skills && experience.skills.length > 0 && (
          <div className="px-4 pb-4">
            <div className="border-t border-gray-100 pt-3">
              <h4 className="font-medium text-gray-900 mb-2 text-sm">Technologies</h4>
              
              <div className="flex flex-wrap gap-1.5">
                {experience.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded 
                               hover:bg-gray-200 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Achievements - When expanded */}
        {isExpanded && experience.achievements && experience.achievements.length > 0 && (
          <div className="px-4 pb-4">
            <div className="border-t border-gray-100 pt-3">
              <h4 className="font-medium text-gray-900 mb-2 text-sm">Key Achievements</h4>
              
              <ul className="space-y-1.5">
                {experience.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                    <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;