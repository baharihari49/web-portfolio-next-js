import React from 'react';
import { ExperienceItem } from '@/app/types/experience';
import ExperienceCardHeader from './ExperienceCardHeader';
import ExperienceCardBody from './ExperienceCardBody';
import ExperienceCardFooter from './ExperienceCardFooter';

interface ExperienceCardProps {
  experience: ExperienceItem;
  index: number;
  isVisible: boolean;
  isExpanded: boolean;
  toggleExpand: (index: number) => void;
  isLeftAligned?: boolean;
  isCompact?: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ 
  experience, 
  index,
//   isVisible,
  isExpanded,
  toggleExpand,
//   isLeftAligned = true,
  isCompact = false
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 ${
      isExpanded ? 'shadow-xl' : 'hover:shadow-xl'
    }`}>
      <ExperienceCardHeader experience={experience} isCompact={isCompact} />
      
      <ExperienceCardBody 
        experience={experience} 
        isExpanded={isExpanded}
        isCompact={isCompact}
      />
      
      <ExperienceCardFooter 
        experience={experience} 
        isExpanded={isExpanded} 
        toggleExpand={() => toggleExpand(index)}
        isCompact={isCompact}
      />
    </div>
  );
};

export default ExperienceCard;