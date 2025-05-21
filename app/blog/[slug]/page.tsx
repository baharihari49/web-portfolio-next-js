// app/blog/[slug]/page.tsx (fixed unused parameter warnings)
'use client'

import { JSX, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import RelatedPostsSection from '@/components/blog/RelatedPostsSection';
import AuthorBio from '@/components/blog/AuthorBio';
import CommentsSection from '@/components/blog/CommentsSection';
import SocialShareButtons from '@/components/blog/SocialShareButtons';
import PostNavigation from '@/components/blog/PostNavigation';
import TableOfContents from '@/components/blog/TableOfContents';
import { BlogPost } from '@/components/blog/types/blog';

// Import the slug-based service
import { fetchBlogPostBySlug } from '@/services/blogService';

export default function BlogDetailPage(): JSX.Element {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tocItems, setTocItems] = useState<{id: string, text: string, level: number}[]>([]);
  
  // URL for sharing
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : `https://yourdomain.com/blog/${params.slug}`;

  // Helper function to get tag name from tag object or string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTagName = (tag: any): string => {
    if (typeof tag === 'string') return tag;
    return tag?.name || tag?.id || '';
  };

  // Helper function to get tag slug
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTagSlug = (tag: any): string => {
    const tagName = getTagName(tag);
    return tagName.toLowerCase().replace(/\s+/g, '-');
  };

  // Create a proper scrollToSection function (not using the parameter)
  const handleScrollToSection = (): void => {
    // Navigate to home page instead
    router.push('/');
  };

  // Fetch blog post data by slug
  useEffect(() => {
    const getPost = async (): Promise<void> => {
      try {
        const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
        setIsLoading(true);
        
        // Use the slug-based fetch function
        const data = await fetchBlogPostBySlug(slug as string);
        
        if (!data) {
          throw new Error('Post not found');
        }
        
        setPost(data);
        
        // Extract TOC from content
        if (data.content) {
          extractTocItems(data.content);
        }
        
        // Set page title dynamically
        if (typeof document !== 'undefined') {
          document.title = `${data.title} | Pixlab - Creative Agency`;
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err instanceof Error ? err.message : 'Failed to load blog post');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (params.slug) {
      getPost();
    }
  }, [params.slug, router]);

  // Extract headings from content for table of contents
  const extractTocItems = (content: string): void => {
    if (typeof document !== 'undefined') {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const headings = Array.from(doc.querySelectorAll('h2, h3, h4'));
      
      const items = headings.map(heading => {
        const id = heading.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';
        return {
          id,
          text: heading.textContent || '',
          level: parseInt(heading.tagName.charAt(1))
        };
      });
      
      setTocItems(items);
    }
  };

  // Format HTML content with heading IDs for TOC
  const formatContentWithIds = (content: string): string => {
    if (typeof document !== 'undefined') {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      
      const headings = doc.querySelectorAll('h2, h3, h4');
      headings.forEach(heading => {
        const id = heading.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';
        heading.setAttribute('id', id);
      });
      
      return doc.body.innerHTML;
    }
    return content;
  };

  // Loading state
  if (isLoading) {
    return (
      <>
        <Header activeSection={''} scrollToSection={handleScrollToSection} />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-20">
          <div className="animate-pulse max-w-3xl w-full mx-auto px-4">
            <div className="h-80 bg-gray-300 rounded-xl mb-8"></div>
            <div className="h-12 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-4/5"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <>
        <Header activeSection={''} scrollToSection={handleScrollToSection} />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-20">
          <div className="text-center max-w-lg mx-auto px-4">
            <svg className="w-20 h-20 text-gray-400 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">{error || "We couldn't find the blog post you're looking for. It may have been removed or doesn't exist."}</p>
            <Link href="/blog">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md">
                Back to Blog
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header activeSection={''} scrollToSection={handleScrollToSection} />
      
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0">
          <Image
            src={post.thumbnail}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>
        </div>
        <div className="relative h-full container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-4 mb-4">
              <Link href={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}>
                <span className="px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors cursor-pointer">
                  {post.category}
                </span>
              </Link>
              <span className="text-white/80 flex items-center">
                <i className="far fa-calendar-alt mr-2"></i> {post.date}
              </span>
              <span className="text-white/80 flex items-center">
                <i className="far fa-comments mr-2"></i> {post.comments} Comments
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src={'https://res.cloudinary.com/du0tz73ma/image/upload/v1747662386/BahariImage_h8ieri.png'}
                  alt={post.author?.name || 'Author'}
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <h4 className="text-white font-medium">{post.author?.name || 'Anonymous'}</h4>
                <p className="text-white/70 text-sm">{post.author?.role || 'Author'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap -mx-4">
            {/* Main Content */}
            <div className="w-full lg:w-2/3 px-4">
              <div className="bg-white rounded-xl shadow-sm p-8 mb-10">
                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: formatContentWithIds(post.content) }} />
                </div>
                
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-10 pt-8 border-t border-gray-100">
                    <div className="flex flex-wrap items-center">
                      <span className="text-gray-700 font-medium mr-4">Tags:</span>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <Link key={index} href={`/blog/tag/${getTagSlug(tag)}`}>
                            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-pointer">
                              {getTagName(tag)}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Social Share */}
                <SocialShareButtons url={currentUrl} title={post.title} />
              </div>
              
              {/* Author Bio */}
              <AuthorBio author={post.author} />
              
              {/* Post Navigation (updated to use slug) */}
              <PostNavigation 
                prevPost={post.prevPost ? {
                  ...post.prevPost,
                  href: `/blog/${post.prevPost.slug}`
                } : undefined} 
                nextPost={post.nextPost ? {
                  ...post.nextPost,
                  href: `/blog/${post.nextPost.slug}`
                } : undefined}
              />
              
              {/* Comments Section */}
              <CommentsSection postId={post.id.toString()} commentCount={post.comments} />
            </div>
            
            {/* Sidebar */}
            <div className="w-full lg:w-1/3 px-4">
              <div className="sticky top-24">
                {/* Table of Contents */}
                <TableOfContents items={tocItems} />
                
                {/* Related Posts Sidebar Widget (with slug links) */}
                {post.relatedPosts && post.relatedPosts.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-8 after:bg-blue-600">You May Also Like</h4>
                    <div className="space-y-4">
                      {post.relatedPosts.slice(0, 3).map((relatedPost) => (
                        <div key={relatedPost.id} className="flex space-x-4 group">
                          <div className="shrink-0 w-20 h-20 rounded-md overflow-hidden relative">
                            <Image 
                              src={relatedPost.thumbnail} 
                              alt={relatedPost.title} 
                              layout="fill" 
                              objectFit="cover"
                              className="transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="flex-1">
                            <h6 className="font-medium mb-1 line-clamp-2">
                              <Link href={`/blog/${relatedPost.slug}`}>
                                <span className="cursor-pointer text-gray-800 hover:text-blue-600 transition-colors">
                                  {relatedPost.title}
                                </span>
                              </Link>
                            </h6>
                            <span className="text-sm text-gray-500">
                              {relatedPost.date}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Tags Cloud */}
                {post.tags && post.tags.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-8 after:bg-blue-600">Popular Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <Link key={index} href={`/blog/tag/${getTagSlug(tag)}`}>
                          <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-pointer">
                            {getTagName(tag)}
                          </span>
                        </Link>
                      ))}
                      <Link href="/blog/tag/javascript">
                        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-pointer">
                          JavaScript
                        </span>
                      </Link>
                      <Link href="/blog/tag/css">
                        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-pointer">
                          CSS
                        </span>
                      </Link>
                      <Link href="/blog/tag/design">
                        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-pointer">
                          Design
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Posts Section - Updated to pass slug-based links */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <RelatedPostsSection 
          posts={post.relatedPosts.map(relatedPost => ({
            ...relatedPost,
            href: `/blog/${relatedPost.slug}`
          }))} 
        />
      )}
      
      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors z-10"
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
      
      <Footer />
    </>
  );
}