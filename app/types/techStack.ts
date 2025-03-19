import { ReactNode } from 'react';

export interface TechStackItem {
  name: string;
  icon: ReactNode;
  category: string;
  proficiency: number; // 1-100
  color: string;
  description?: string;
  years?: number;
  projects?: number;
}

export interface RawTechStackItem {
  name: string;
  icon: string; // Icon name as string from JSON
  category: string;
  proficiency: number;
  color: string;
  description?: string;
  years?: number;
  projects?: number;
}

export type ViewMode = 'grid' | 'detailed';