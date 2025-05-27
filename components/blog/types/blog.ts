// types/blog.ts (updated with proper definitions)
export interface BlogPost {
  updatedAt: string;
  id: number;
  slug: string;
  thumbnail: string;
  category: string;
  date: string;
  comments: number;
  title: string;
  excerpt: string;
  hasImage: boolean;
  isFeature?: boolean;
  author: Author;
  content: string;
  tags: Tag[];
  nextPost?: RelatedPost;
  prevPost?: RelatedPost;
  relatedPosts: RelatedPost[];
}

export interface Author {
  id?: string;
  name: string;
  avatar?: string;
  bio?: string;
  role?: string;
}

export interface Tag {
  id?: string;
  name: string;
  count?: number;
}

export interface RelatedPost {
  id: number;
  slug: string;
  title: string;
  thumbnail: string;
  category?: string;
  date?: string;
  href?: string;
}

export interface FeaturedPost {
  id: number;
  slug: string;
  title: string;
  image: string;
  category: string;
}

export interface RecentPost {
  id: number;
  slug: string;
  title: string;
  author: string;
  image: string;
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export interface CommentType {
  id: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
  replies?: CommentType[];
}

export interface ApiResponse {
  success: boolean;
  data: BlogPost[] | BlogPost;
}
