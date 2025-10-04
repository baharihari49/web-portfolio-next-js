// components/blog/BannerSlider.tsx (updated for API integration)
'use client'
import { useState, useEffect, useRef, useCallback, JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface FeaturedPost {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  category: Category | string; // Support both formats
  excerpt: string;
  author: {
    id: string;
    name: string;
  };
  date: string;
}

interface BlogPostsResponse {
  success: boolean;
  data: FeaturedPost[];
  pagination?: {
    totalPosts: number;
    totalPages: number;
    currentPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export default function BannerSlider(): JSX.Element {
  const [featuredPosts, setFeaturedPosts] = useState<FeaturedPost[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  // Fetch featured posts from API
  useEffect(() => {
    const fetchFeaturedPosts = async (): Promise<void> => {
      try {
        setIsLoading(true);
        // Fetch featured posts with limit of 3-5 posts
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/posts?featured=true&limit=5`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: BlogPostsResponse = await response.json();
        
        if (data.success && data.data && data.data.length > 0) {
          setFeaturedPosts(data.data);
        } else {
          // Fallback: get latest posts if no featured posts
          const fallbackResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/posts?limit=3&recent=true`);
          if (fallbackResponse.ok) {
            const fallbackData: BlogPostsResponse = await fallbackResponse.json();
            if (fallbackData.success && fallbackData.data) {
              setFeaturedPosts(fallbackData.data);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching featured posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to load featured posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

  // Auto-rotation function for slider
  const startSlideTimer = useCallback((): void => {
    if (featuredPosts.length > 1) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide(prevSlide =>
          prevSlide === featuredPosts.length - 1 ? 0 : prevSlide + 1
        );
      }, 5000); // Change slide every 5 seconds
    }
  }, [featuredPosts.length]);

  useEffect(() => {
    if (featuredPosts.length > 0) {
      startSlideTimer();
    }

    // Cleanup timer when component unmounts
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [featuredPosts, startSlideTimer]);

  // Reset timer when slide changes manually
  const goToSlide = (slideIndex: number): void => {
    setCurrentSlide(slideIndex);
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
      startSlideTimer();
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="relative min-h-[550px] overflow-hidden border bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading featured posts...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error || featuredPosts.length === 0) {
    return (
      <section className="relative min-h-[550px] overflow-hidden border bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9 .75h-9m9-9.75h-9m9 6.75h-9" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Featured Posts</h3>
            <p className="text-gray-600 mb-4">
              {error || "There are no featured posts available at the moment."}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[650px] overflow-hidden border">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Floating Triangle */}
        <div className="absolute animate-float-slow" style={{ top: '15%', left: '10%' }}>
          <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-sm">
            <polygon
              points="60,20 95,80 25,80"
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              opacity="0.4"
            />
            <polygon
              points="60,35 80,65 40,65"
              fill="#10B981"
              opacity="0.1"
            />
          </svg>
        </div>

        {/* Floating Circle */}
        <div className="absolute animate-float-medium" style={{ top: '25%', right: '15%' }}>
          <svg width="80" height="80" viewBox="0 0 80 80" className="drop-shadow-sm">
            <circle
              cx="40"
              cy="40"
              r="30"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
              opacity="0.4"
            />
            <circle
              cx="40"
              cy="40"
              r="15"
              fill="#3B82F6"
              opacity="0.15"
            />
          </svg>
        </div>

        {/* Floating Hexagon */}
        <div className="absolute animate-float-fast" style={{ bottom: '15%', left: '20%' }}>
          <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-sm">
            <polygon
              points="50,10 85,30 85,70 50,90 15,70 15,30"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2"
              opacity="0.4"
            />
            <polygon
              points="50,25 70,35 70,65 50,75 30,65 30,35"
              fill="#F59E0B"
              opacity="0.1"
            />
          </svg>
        </div>

        {/* Additional Small Dots for Extra Visual Interest */}
        <div className="absolute animate-pulse" style={{ top: '60%', right: '25%' }}>
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="3" fill="#8B5CF6" opacity="0.3" />
            <circle cx="20" cy="20" r="8" fill="none" stroke="#8B5CF6" strokeWidth="1" opacity="0.2" />
          </svg>
        </div>

        <div className="absolute animate-ping" style={{ top: '40%', left: '85%' }}>
          <svg width="30" height="30" viewBox="0 0 30 30">
            <circle cx="15" cy="15" r="2" fill="#EC4899" opacity="0.4" />
          </svg>
        </div>
      </div>

      {/* Slides */}
      <div className="relative h-[650px]">
        {featuredPosts.map((post, index) => (
          <div
            key={post.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10"></div>

            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={post.thumbnail || '/images/blog/default-featured.jpg'}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                priority={index === 0}
                className="transform scale-110 transition-transform duration-10000 ease-in-out"
                style={{
                  animationName: index === currentSlide ? 'slow-zoom' : 'none',
                  animationDuration: '15s',
                  animationTimingFunction: 'ease-in-out'
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-20 container h-full flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
              <div className="max-w-3xl">
                <span className="inline-block px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full mb-4 transform translate-y-10 transition-transform duration-700 ease-out"
                  style={{ opacity: index === currentSlide ? 1 : 0, transform: index === currentSlide ? 'translateY(0)' : 'translateY(10px)' }}>
                  {typeof post.category === 'string' ? post.category : post.category?.name}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 transform translate-y-10 transition-transform duration-700 delay-100 ease-out"
                  style={{ opacity: index === currentSlide ? 1 : 0, transform: index === currentSlide ? 'translateY(0)' : 'translateY(10px)' }}>
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="text-lg text-white/90 mb-6 max-w-2xl transform translate-y-10 transition-transform duration-700 delay-150 ease-out"
                     style={{ opacity: index === currentSlide ? 1 : 0, transform: index === currentSlide ? 'translateY(0)' : 'translateY(10px)' }}>
                    {post.excerpt.length > 150 ? `${post.excerpt.substring(0, 150)}...` : post.excerpt}
                  </p>
                )}
                <div className="flex items-center space-x-4 mb-6 transform translate-y-10 transition-transform duration-700 delay-175 ease-out"
                     style={{ opacity: index === currentSlide ? 1 : 0, transform: index === currentSlide ? 'translateY(0)' : 'translateY(10px)' }}>
                  <span className="text-white/80 text-sm">By {post.author.name}</span>
                  <span className="text-white/60">•</span>
                  <span className="text-white/80 text-sm">{post.date}</span>
                </div>
                <div className="transform translate-y-10 transition-transform duration-700 delay-200 ease-out"
                  style={{ opacity: index === currentSlide ? 1 : 0, transform: index === currentSlide ? 'translateY(0)' : 'translateY(10px)' }}>
                  <Link href={`/blog/${post.slug}`}>
                    <button className="px-8 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors shadow-lg inline-flex items-center group">
                      Read Article
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Dots - Only show if more than 1 post */}
        {featuredPosts.length > 1 && (
          <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-2">
            {featuredPosts.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                  ? 'bg-white w-6'
                  : 'bg-white/50 hover:bg-white/70'
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Navigation Arrows - Only show if more than 1 post */}
        {featuredPosts.length > 1 && (
          <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-4 md:px-8">
            <button
              onClick={() => goToSlide(currentSlide === 0 ? featuredPosts.length - 1 : currentSlide - 1)}
              className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all duration-300"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => goToSlide(currentSlide === featuredPosts.length - 1 ? 0 : currentSlide + 1)}
              className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all duration-300"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* CSS Keyframes for the zoom effect */}
      <style jsx global>{`
        @keyframes slow-zoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }
        
        /* Enhanced floating animations */
        @keyframes float-slow {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          25% { 
            transform: translateY(-15px) rotate(45deg); 
          }
          50% { 
            transform: translateY(-25px) rotate(90deg); 
          }
          75% { 
            transform: translateY(-10px) rotate(135deg); 
          }
        }

        @keyframes float-medium {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
          }
          33% { 
            transform: translateY(-20px) rotate(-60deg) scale(1.1); 
          }
          66% { 
            transform: translateY(-15px) rotate(-120deg) scale(0.9); 
          }
        }

        @keyframes float-fast {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-30px) rotate(180deg); 
          }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
          animation-delay: 0s;
        }

        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
          animation-delay: 2s;
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .animate-float-slow,
          .animate-float-medium,
          .animate-float-fast {
            animation-duration: 0s;
          }
        }
      `}</style>
    </section>
  );
}