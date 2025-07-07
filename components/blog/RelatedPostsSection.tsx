// components/blog/RelatedPostsSection.tsx (updated for slug) - continued
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface RelatedPost {
  id: number;
  slug: string;
  title: string;
  thumbnail: string;
  category?: string;
  date?: string;
  href?: string; // Optional custom href
}

interface RelatedPostsSectionProps {
  posts: RelatedPost[];
}

const RelatedPostsSection: React.FC<RelatedPostsSectionProps> = ({ posts }) => {
  // Added state for loading and error handling
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  
  // Simulate loading (in a real app, this would be part of the data fetching)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Check if data is valid
      if (!posts || posts.length === 0) {
        setHasError(true);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [posts]);

  // Render skeleton loader when loading
  if (isLoading) {
    return (
      <section className="py-16 bg-gray-100">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Related Articles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore more articles on similar topics that might interest you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                <div className="h-60 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Display alternative message if no related posts
  if (hasError || !posts || posts.length === 0) {
    return (
      <section className="py-16 bg-gray-100">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Related Articles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore more articles on similar topics that might interest you
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-10 text-center max-w-2xl mx-auto">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Related Articles Found</h3>
            <p className="text-gray-600 mb-6">{`We couldn't find any articles related to this topic. Check out our other articles instead.</`}</p>
            
            <Link href="/blog">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md inline-flex items-center">
                <span>Browse All Articles</span>
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Normal render when data is available
  return (
    <section className="py-16 bg-gray-100">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Related Articles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore more articles on similar topics that might interest you
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden animate-on-scroll group">
              <Link href={post.href || `/blog/${post.slug}`}>
                <div className="cursor-pointer">
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                    {post.category && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                          {typeof post.category === 'string' ? post.category : post.category?.name}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    {post.date && (
                      <div className="text-sm text-gray-500 mb-2">
                        <span className="flex items-center">
                          <svg 
                            className="w-4 h-4 mr-2" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                            />
                          </svg>
                          {post.date}
                        </span>
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-gray-800 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-800 transition-colors">
                      <span>Read Article</span>
                      <svg 
                        className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M14 5l7 7m0 0l-7 7m7-7H3" 
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/blog">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md">
              View All Articles
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedPostsSection;