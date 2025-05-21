// BlogSection.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

const BlogSection: React.FC<BlogSectionProps> = ({
  subtitle = "Articles & News",
  title = "Latest News & Blogs",
  description = "Discover the latest information about technology and web development"
}) => {
  // State to store the blog posts
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/posts`);
        const data: ApiResponse = await response.json();
        
        if (data.success) {
          setPosts(data.data);
        } else {
          setError('Failed to fetch blog posts');
        }
      } catch (err) {
        setError('An error occurred while fetching blog posts');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading articles...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded inline-block">
            <p>{error}</p>
            <button 
              className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
              onClick={() => window.location.reload()}
            >
              Try again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-3 text-sm font-medium text-blue-600 bg-indigo-100 rounded-full">
            {subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {posts.map((post) => (
            <motion.div 
              key={post.id}
              className="group rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="relative h-56 overflow-hidden">
                {post.hasImage && (
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>by {post.author.name}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  <Link href={`/blog/${post.slug}`}>
                    <div>{post.title}</div>
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="inline-flex items-center font-medium text-blue-600 hover:text-indigo-800 transition-colors duration-300">
                      Read More
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </Link>
                  <div className="flex items-center text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link href="/blog">
            <div className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
              View More Articles
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;