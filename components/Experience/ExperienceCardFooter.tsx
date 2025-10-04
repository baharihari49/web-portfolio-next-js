import React from 'react';
import { ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';
import { ExperienceItem } from '@/app/types/experience';

interface ExperienceCardFooterProps {
  experience: ExperienceItem;
  isExpanded: boolean;
  toggleExpand: () => void;
  isCompact?: boolean;
}

const ExperienceCardFooter: React.FC<ExperienceCardFooterProps> = ({ 
  experience, 
  isExpanded, 
  toggleExpand,
  isCompact = false
}) => {
  return (
    <div className={`${isCompact ? 'px-4' : 'px-6'} pb-5 pt-1 border-t border-gray-100 flex ${isCompact ? 'flex-wrap' : ''} justify-between`}>
      <button
        onClick={toggleExpand}
        className={`text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors ${isCompact ? 'mb-2' : ''}`}
      >
        {isExpanded ? (
          <>
            <ChevronUp className="w-4 h-4 mr-1" />
            Show Less
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4 mr-1" />
            Show More
          </>
        )}
      </button>
      
      <div>
        {experience.link && (
          <a 
            href={experience.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 ${!isCompact ? 'ml-4' : ''}`}
          >
            Visit Website
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ExperienceCardFooter;