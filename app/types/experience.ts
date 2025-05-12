export interface ExperienceItem {
    title: string;
    list: string[];
    company?: string;
    companyLogo?: string; // URL to company logo
    duration?: string;
    location?: string;
    skills?: string[]; // Skills/technologies used
    achievements?: string[]; // Key achievements
    current?: boolean; // Whether this is the current position
    type?: string // Type of employment
    link?: string; // Link to company website
  }
  
  export interface ExperiencesData {
    data: ExperienceItem[];
  }
  
  export type ExperienceTabType = 'all' | 'current' | 'previous';