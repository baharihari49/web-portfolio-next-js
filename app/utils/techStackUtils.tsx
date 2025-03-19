import React from 'react';
import { 
  Server, Monitor, CloudCog, Sparkles
} from 'lucide-react';
import { 
  RiNextjsLine, RiTailwindCssFill 
} from 'react-icons/ri';
import { 
  FaReact, FaPhp, FaLaravel, FaNodeJs, 
  FaDocker, FaUbuntu, FaGithub 
} from 'react-icons/fa';
import { 
  IoLogoJavascript, IoPieChartOutline 
} from 'react-icons/io5';
import { 
  SiTypescript, SiShadcnui, SiChartdotjs, SiFilament,
  SiNestjs, SiMysql, SiNginx, SiApache, SiOpencv, SiSwiper
} from 'react-icons/si';
import { 
  LiaHtml5, LiaCss3Alt 
} from 'react-icons/lia';
import { 
  TbBrandRadixUi 
} from 'react-icons/tb';
import { 
  FiGitlab 
} from 'react-icons/fi';
import { TechStackItem, RawTechStackItem } from '@/app/types/techStack';
import { Box } from 'lucide-react';

// Create icon mapping object to convert string icon names to React components
export const iconMap: Record<string, React.ElementType> = {
  IoLogoJavascript: IoLogoJavascript,
  SiTypescript: SiTypescript,
  FaReact: FaReact,
  LiaHtml5: LiaHtml5,
  LiaCss3Alt: LiaCss3Alt,
  RiTailwindCssFill: RiTailwindCssFill,
  SiShadcnui: SiShadcnui,
  TbBrandRadixUi: TbBrandRadixUi,
  SiChartdotjs: SiChartdotjs,
  IoPieChartOutline: IoPieChartOutline,
  FaPhp: FaPhp,
  FaLaravel: FaLaravel,
  SiFilament: SiFilament,
  FaNodeJs: FaNodeJs,
  SiNestjs: SiNestjs,
  SiMysql: SiMysql,
  FaDocker: FaDocker,
  FaUbuntu: FaUbuntu,
  SiNginx: SiNginx,
  SiApache: SiApache,
  FaGithub: FaGithub,
  FiGitlab: FiGitlab,
  SiOpencv: SiOpencv,
  RiNextjsLine: RiNextjsLine,
  SiSwiper: SiSwiper
};

// Color mapping object to directly use in inline styles
export const colorMap: Record<string, string> = {
  'yellow-400': '#facc15',
  'blue-500': '#3b82f6',
  'blue-400': '#60a5fa',
  'gray-700': '#374151',
  'orange-500': '#f97316',
  'blue-600': '#2563eb',
  'teal-500': '#14b8a6',
  'violet-600': '#7c3aed',
  'gray-800': '#1f2937',
  'pink-500': '#ec4899',
  'purple-500': '#a855f7',
  'indigo-600': '#4f46e5',
  'red-500': '#ef4444',
  'red-600': '#dc2626',
  'blue-700': '#1d4ed8',
  'green-600': '#16a34a',
  'orange-600': '#ea580c',
  'green-500': '#22c55e',
};

// Get proficiency level label
export const getProficiencyLabel = (proficiency: number): string => {
  if (proficiency >= 90) return 'Expert';
  if (proficiency >= 80) return 'Advanced';
  if (proficiency >= 70) return 'Intermediate';
  return 'Beginner';
};

// Get proficiency level color
export const getProficiencyColor = (proficiency: number): string => {
  if (proficiency >= 90) return '#22c55e'; // green-500
  if (proficiency >= 80) return '#3b82f6'; // blue-500
  if (proficiency >= 70) return '#f59e0b'; // amber-500
  return '#ef4444'; // red-500
};

// Get category icon
export const getCategoryIcon = (category: string): React.ReactNode => {
  switch(category) {
    case 'Frontend': return <Monitor className="w-5 h-5" />;
    case 'Backend': return <Server className="w-5 h-5" />;
    case 'DevOps': return <CloudCog className="w-5 h-5" />;
    default: return <Sparkles className="w-5 h-5" />;
  }
};

// Convert raw tech stack items from JSON to TechStackItem objects
export const convertRawTechItems = (rawItems: RawTechStackItem[]): TechStackItem[] => {
  return rawItems.map(tech => ({
    ...tech,
    // Convert the icon string to a React component
    icon: React.createElement(iconMap[tech.icon as keyof typeof iconMap] || Box)
  }));
};

// Filter tech stacks by category and search query
export const filterTechStacks = (
  items: TechStackItem[], 
  activeCategory: string | null, 
  searchQuery: string
): TechStackItem[] => {
  return items.filter(item => {
    // Category filter
    if (activeCategory && item.category !== activeCategory) return false;
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
};