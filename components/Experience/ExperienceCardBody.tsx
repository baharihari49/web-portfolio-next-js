import React from 'react';
import { ChevronRight, Code, Award, Star } from 'lucide-react';
import { ExperienceItem } from '@/app/types/experience';
import SkillTag from './SkillTag';

interface ExperienceCardBodyProps {
  experience: ExperienceItem;
  isExpanded: boolean;
  isCompact?: boolean;
}

const ExperienceCardBody: React.FC<ExperienceCardBodyProps> = ({ 
  experience, 
  isExpanded, 
  isCompact = false 
}) => {
  return (
    <div className={`${isCompact ? 'px-4' : 'px-6'} pt-4 pb-2`}>
      {/* Responsibilities */}
      <div className={`${isExpanded ? '' : 'max-h-[150px] overflow-hidden relative'}`}>
        <ul className="space-y-3 mb-6">
          {experience.list.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <ChevronRight className="w-4 h-4 text-blue-600 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
        
        {/* Skills */}
        {experience.skills && experience.skills.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center">
              <Code className="w-4 h-4 mr-1" /> SKILLS & TECHNOLOGIES
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skill, idx) => (
                <SkillTag key={idx} skill={skill} />
              ))}
            </div>
          </div>
        )}
        
        {/* Key achievements */}
        {experience.achievements && experience.achievements.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center">
              <Award className="w-4 h-4 mr-1" /> KEY ACHIEVEMENTS
            </h4>
            <div className="space-y-2">
              {experience.achievements.map((achievement, idx) => (
                <div key={idx} className="flex items-start p-2 bg-amber-50 border-l-2 border-amber-500 rounded-r-md">
                  <Star className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
                  <p className="text-sm text-amber-700">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Fade overlay when collapsed */}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
        )}
      </div>
    </div>
  );
};

export default ExperienceCardBody;