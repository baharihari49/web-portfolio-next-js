// BlogSection.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BlogGrid from './BlogGrid'; // Client component for animations

// Define TypeScript interfaces based on your API response
interface Author {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

interface BlogPost {
  id: string;
  slug: string;
  thumbnail: string;
  category: string;
  categoryId: string;
  date: string;
  comments: number;
  title: string;
  excerpt: string;
  hasImage: boolean;
  isFeature: boolean;
  published: boolean;
  author: Author;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: BlogPost[];
}

interface BlogSectionProps {
  subtitle?: string;
  title?: string;
  description?: string;
}

// Server-side data fetching function
async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/posts`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
        cache: 'force-cache'
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    
    const data: ApiResponse = await response.json();
    
    if (data.success) {
      return data.data;
    } else {
      throw new Error('API returned unsuccessful response');
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Error Fallback Component
function ErrorFallback({ error }: { error: string }) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded inline-block">
          <p>{error}</p>
          <p className="mt-2 text-sm">Please try refreshing the page.</p>
        </div>
      </div>
    </section>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <div className="bg-gray-100 border border-gray-300 text-gray-600 px-4 py-8 rounded-lg">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="text-lg font-medium">No articles available</p>
          <p className="text-sm mt-1">Check back later for new content.</p>
        </div>
      </div>
    </section>
  );
}

// Main Server Component
const BlogSection: React.FC<BlogSectionProps> = async ({
  subtitle = "Articles & News",
  title = "Latest News & Blogs",
  description = "Discover the latest information about technology and web development"
}) => {
  // Fetch data on the server
  const posts = await fetchBlogPosts();

  // Handle empty state
  if (posts.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-3 text-sm font-medium text-blue-600 bg-indigo-100 rounded-full">
            {subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            {description}
          </p>
        </div>

        {/* Blog Posts Grid - Client Component for Animations */}
        <BlogGrid posts={posts} />

        {/* View More Button */}
        <div className="text-center mt-12">
          <Link 
            href="/blog"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            View More Articles
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
export type { BlogPost, Author, Tag };