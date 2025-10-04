import React from 'react';
import { getSkillColor } from '@/app/utils/experienceUtils';

interface SkillTagProps {
  skill: string;
}

const SkillTag: React.FC<SkillTagProps> = ({ skill }) => {
  return (
    <span 
      className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillColor(skill)}`}
    >
      {skill}
    </span>
  );
};

export default SkillTag;