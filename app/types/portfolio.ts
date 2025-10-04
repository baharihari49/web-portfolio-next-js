// types/portfolio.ts
export interface PortfolioItem {
  id?: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  description?: string;
  technologies?: string[];
  keyFeatures?: string[];
  link?: string;
  year?: string;
  role?: string;
  duration?: string;
  highlight?: string;
  gallery?: string[];
  challenges?: string[];
  solutions?: string[];
  testimonial?: {
    text: string;
    author: string;
    position: string;
  };
  nextProject?: string;
  nextProjectSlug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PortfolioData {
  items: PortfolioItem[];
}

export type FilterType = string;
export type SearchQueryType = string;