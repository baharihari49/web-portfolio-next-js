// types/collection.ts
export interface CollectionCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail: string;
  htmlContent: string;
  published: boolean;
  order: number | null;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: CollectionCategory;
}

export interface CollectionApiResponse {
  success: boolean;
  data: CollectionItem[];
}
