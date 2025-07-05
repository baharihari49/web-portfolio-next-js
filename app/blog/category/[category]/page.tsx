'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs, BreadcrumbStructuredData } from '@/components/ui/breadcrumbs';
import { fetchPostsByCategory } from '@/services/blogService';
import { BlogPost } from '@/components/blog/types/blog';

export default function BlogCategoryPage() {
  const params = useParams();
  const category = Array.isArray(params.category) ? params.category[0] : params.category;
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Format category for display
  const categoryDisplay = category ? category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      if (!category) return;
      
      try {
        setLoading(true);
        const categoryPosts = await fetchPostsByCategory(category);
        setPosts(categoryPosts);
      } catch (err) {
        console.error('Error fetching category posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryPosts();
  }, [category]);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: 'Categories', href: '/blog/categories' },
    { label: categoryDisplay, current: true },
  ];

  const handleScrollToSection = () => {
    // Navigate to home page
  };

  if (loading) {
    return (
      <>
        <Header activeSection={''} scrollToSection={handleScrollToSection} />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-20">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header activeSection={''} scrollToSection={handleScrollToSection} />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link href="/blog">
              <span className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                Back to Blog
              </span>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData items={breadcrumbItems} />
      
      <Header activeSection={''} scrollToSection={handleScrollToSection} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {categoryDisplay} Articles
            </h1>
            <p className="text-blue-100 text-lg mb-6">
              Explore {posts.length} article{posts.length !== 1 ? 's' : ''} in the {categoryDisplay.toLowerCase()} category
            </p>
            <Breadcrumbs items={breadcrumbItems} className="justify-center" />
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Posts Found</h3>
              <p className="text-gray-500 mb-6">No articles found in the {categoryDisplay.toLowerCase()} category.</p>
              <Link href="/blog">
                <span className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                  Browse All Posts
                </span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  {post.thumbnail && (
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{post.date}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </>
  );
}