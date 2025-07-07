'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Import BannerSlider component
import BannerSlider from '@/components/blog/BannerSlider';

// Import widget components
import SearchBar from '@/components/blog/SearchBar';
import CategoryWidget from '@/components/blog/CategoryWidget';
import ContactWidget from '@/components/blog/ContactWidget';
import RecentPostWidget from '@/components/blog/RecentPostWidget';
import TagWidget from '@/components/blog/TagWidget';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

// Define interface for blog post
interface BlogPost {
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
}

export default function BlogPage() {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch blog posts from API
    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/posts`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setBlogPosts(data.data);
            } catch (err) {
                console.error('Error fetching blog posts:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogPosts();
    }, []);

    // Animation on scroll effect
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => observer.observe(el));

        return () => {
            animatedElements.forEach(el => observer.unobserve(el));
        };
    }, [blogPosts]); // Re-run when blogPosts change

    // Back to top functionality
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Loading component
    const LoadingBlogPost = () => (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
            <div className="h-64 md:h-80 bg-gray-300"></div>
            <div className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="h-6 bg-gray-300 rounded w-20"></div>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
                <div className="h-8 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-6 w-3/4"></div>
                <div className="h-10 bg-gray-300 rounded w-32"></div>
            </div>
        </div>
    );

    // Error component
    const ErrorMessage = () => (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0l-8.568 9.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Blog Posts</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
                Try Again
            </button>
        </div>
    );

    return (
        <>
            <Header activeSection={''} scrollToSection={function (): void {
                throw new Error('Function not implemented.');
            }} />
            
            {/* Replace the old Page Banner with our new BannerSlider */}
            <BannerSlider />

            {/* Blog Section */}
            <section className="py-20 bg-gray-50">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                    <div className="flex flex-wrap -mx-4">
                        {/* Blog Posts Column */}
                        <div className="w-full lg:w-2/3 px-4">
                            <div className="space-y-16">
                                {/* Show loading skeleton */}
                                {loading && (
                                    <>
                                        {[1, 2, 3].map(index => (
                                            <LoadingBlogPost key={index} />
                                        ))}
                                    </>
                                )}

                                {/* Show error message */}
                                {error && !loading && <ErrorMessage />}

                                {/* Show blog posts */}
                                {!loading && !error && blogPosts.length === 0 && (
                                    <div className="text-center py-12">
                                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Blog Posts Found</h3>
                                        <p className="text-gray-500">Check back later for new content!</p>
                                    </div>
                                )}

                                {!loading && !error && blogPosts.map(post => (
                                    <article
                                        key={post.id}
                                        className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md animate-on-scroll opacity-0 ${!post.hasImage ? 'p-8' : ''} ${post.isFeature ? 'relative group' : ''}`}
                                    >
                                        {post.hasImage && !post.isFeature && (
                                            <div className="post-thumbnail relative h-64 md:h-80 overflow-hidden">
                                                <Image
                                                    src={post.thumbnail || '/images/placeholder.jpg'}
                                                    alt={post.title}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                    className="transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                        )}

                                        {post.isFeature ? (
                                            <div className="relative h-96 w-full">
                                                <Image
                                                    src={post.thumbnail}
                                                    alt={post.title}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                    className="transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                                                    <div className="p-8 text-white">
                                                        <div className="mb-4 flex items-center space-x-6 text-sm">
                                                            <span className="bg-blue-600 px-3 py-1 rounded-full">{typeof post.category === 'string' ? post.category : post.category?.name}</span>
                                                            <span className="flex items-center"><i className="far fa-calendar-alt mr-2"></i>{post.date}</span>
                                                            <span className="flex items-center"><i className="far fa-comments mr-2"></i>Comment ({post.comments})</span>
                                                        </div>
                                                        <h3 className="text-2xl font-bold mb-4">
                                                            <Link href={`/blog/${post.slug}`}>
                                                                <span className="cursor-pointer hover:text-blue-400 transition-colors">{post.title}</span>
                                                            </Link>
                                                        </h3>
                                                        <Link href={`/blog/${post.slug}`}>
                                                            <span className="text-blue-400 inline-flex items-center space-x-2 cursor-pointer group-hover:text-blue-300 transition-colors">
                                                                <span>Read More</span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                                </svg>
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={`${post.hasImage ? 'p-8' : ''}`}>
                                                <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">{typeof post.category === 'string' ? post.category : post.category?.name}</span>
                                                    <span className="flex items-center"><i className="far fa-calendar-alt mr-2"></i>{post.date}</span>
                                                    <span className="flex items-center"><i className="far fa-comments mr-2"></i>Comment ({post.comments})</span>
                                                </div>
                                                <h3 className="text-2xl font-bold mb-4 text-gray-800 hover:text-blue-600 transition-colors">
                                                    <Link href={`/blog/${post.slug}`}>
                                                        <span className="cursor-pointer">{post.title}</span>
                                                    </Link>
                                                </h3>
                                                <p className="text-gray-600 mb-6">{post.excerpt}</p>
                                                <Link href={`/blog/${post.slug}`}>
                                                    <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full inline-flex items-center space-x-2 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                                        <span>Read More</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </button>
                                                </Link>
                                            </div>
                                        )}
                                    </article>
                                ))}

                                {/* Pagination - Only show if there are posts */}
                                {!loading && !error && blogPosts.length > 0 && (
                                    <div className="flex justify-center mt-12">
                                        <div className="inline-flex rounded-md shadow">
                                            <Link href="#">
                                                <span className="py-2 px-4 border border-transparent text-sm font-medium rounded-l-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">Previous</span>
                                            </Link>
                                            <Link href="#">
                                                <span className="py-2 px-4 border border-transparent text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">1</span>
                                            </Link>
                                            <Link href="#">
                                                <span className="py-2 px-4 border border-transparent text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">2</span>
                                            </Link>
                                            <Link href="#">
                                                <span className="py-2 px-4 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">Next</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="w-full lg:w-1/3 px-4 mt-12 lg:mt-0">
                            <div className="space-y-8">
                                {/* Search Widget */}
                                <SearchBar />

                                {/* Category Widget */}
                                <CategoryWidget />

                                {/* Contact Widget */}
                                <ContactWidget />

                                {/* Recent Posts Widget */}
                                <RecentPostWidget />

                                {/* Tags Widget */}
                                <TagWidget />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
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