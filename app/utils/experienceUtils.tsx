import React from 'react';
import { Code, Users, Settings, Zap, Briefcase } from 'lucide-react';
import { ExperienceItem } from '@/app/types/experience';

/**
 * Get job icon based on job title or type
 */
export const getJobIcon = (experience: ExperienceItem): React.ReactNode => {
  const title = experience.title.toLowerCase();
  
  if (title.includes('developer') || title.includes('engineer')) return <Code />;
  if (title.includes('manager') || title.includes('lead')) return <Users />;
  if (title.includes('designer')) return <Settings />;
  if (experience.type === 'freelance') return <Zap />;
  
  return <Briefcase />;
};

/**
 * Get color class for job type
 */
export const getJobTypeColor = (type?: string): string => {
  switch(type) {
    case 'fulltime': return 'bg-blue-600';
    case 'parttime': return 'bg-purple-600';
    case 'freelance': return 'bg-amber-600';
    case 'remote': return 'bg-emerald-600';
    default: return 'bg-blue-600';
  }
};

/**
 * Get color class for skill tags
 */
export const getSkillColor = (skill: string): string => {
  // Map common technologies/skills to colors
  const skillMap: Record<string, string> = {
    'React': 'bg-blue-100 text-blue-700',
    'JavaScript': 'bg-yellow-100 text-yellow-700',
    'TypeScript': 'bg-blue-100 text-blue-800',
    'Node.js': 'bg-green-100 text-green-700',
    'PHP': 'bg-indigo-100 text-indigo-700',
    'Laravel': 'bg-red-100 text-red-700',
    'UI/UX': 'bg-purple-100 text-purple-700',
    'HTML': 'bg-orange-100 text-orange-700',
    'CSS': 'bg-blue-100 text-blue-600',
    'Management': 'bg-gray-100 text-gray-700',
    'Leadership': 'bg-blue-100 text-blue-800',
    'Design': 'bg-pink-100 text-pink-700',
  };
  
  // Look for partial matches
  for (const [key, value] of Object.entries(skillMap)) {
    if (skill.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  
  // Default color
  return 'bg-gray-100 text-gray-700';
};

/**
 * Filter experiences based on active tab
 */
export const filterExperiences = (
  experiences: ExperienceItem[], 
  activeTab: 'all' | 'current' | 'previous'
): ExperienceItem[] => {
  return experiences.filter(exp => {
    if (activeTab === 'all') return true;
    if (activeTab === 'current') return exp.current;
    if (activeTab === 'previous') return !exp.current;
    return true;
  });
};