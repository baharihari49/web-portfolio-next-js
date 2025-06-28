// app/utils/experienceUtils.ts
import { ExperienceItem, ExperienceTabType } from '@/app/types/experience';

export const filterExperiences = (
  experiences: ExperienceItem[],
  tab: ExperienceTabType
): ExperienceItem[] => {
  switch (tab) {
    case 'current':
      return experiences.filter(exp => exp.current === true);
    case 'previous':
      return experiences.filter(exp => exp.current !== true);
    case 'all':
    default:
      return experiences;
  }
};

export const sortExperiencesByDate = (experiences: ExperienceItem[]): ExperienceItem[] => {
  // Sort by current first, then by duration (latest first)
  return experiences.sort((a, b) => {
    // Current positions first
    if (a.current && !b.current) return -1;
    if (!a.current && b.current) return 1;
    
    // If both current or both not current, maintain original order
    return 0;
  });
};

export const getExperienceStats = (experiences: ExperienceItem[]) => {
  return {
    total: experiences.length,
    current: experiences.filter(exp => exp.current).length,
    previous: experiences.filter(exp => !exp.current).length,
    technologies: Array.from(
      new Set(experiences.flatMap(exp => exp.skills || []))
    ).length,
    companies: Array.from(
      new Set(experiences.map(exp => exp.company).filter(Boolean))
    ).length
  };
};