// components/blog/PostNavigation.tsx (updated for slug)
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import "@/app/globals.css"

interface PostNavigationProps {
    prevPost?: {
        id: number;
        slug: string;
        title: string;
        thumbnail: string;
        href?: string; // Optional custom href
    };
    nextPost?: {
        id: number;
        slug: string;
        title: string;
        thumbnail: string;
        href?: string; // Optional custom href
    };
}



const PostNavigation: React.FC<PostNavigationProps> = ({ prevPost, nextPost }) => {

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
    }, []);
    return (
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-10 animate-on-scroll opacity-0">
            {prevPost ? (
                <Link href={prevPost.href || `/blog/${prevPost.slug}`}>
                    <div className="relative bg-white rounded-xl shadow-sm overflow-hidden group cursor-pointer flex-1">
                        <div className="flex items-center h-32">
                            <div className="w-1/3 h-full relative">
                                <Image
                                    src={prevPost.thumbnail}
                                    alt={prevPost.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/30"></div>
                            </div>
                            <div className="w-2/3 p-4">
                                <div className="flex items-center text-gray-500 text-sm mb-2">
                                    <svg className="w-5 h-5 mr-2 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                    <span>Previous Post</span>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                    {prevPost.title}
                                </h4>
                            </div>
                        </div>
                    </div>
                </Link>
            ) : (
                <div className="flex-1"></div>
            )}

            {nextPost ? (
                <Link href={nextPost.href || `/blog/${nextPost.slug}`}>
                    <div className="relative bg-white rounded-xl shadow-sm overflow-hidden group cursor-pointer flex-1">
                        <div className="flex items-center h-32 flex-row-reverse">
                            <div className="w-1/3 h-full relative">
                                <Image
                                    src={nextPost.thumbnail}
                                    alt={nextPost.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/30"></div>
                            </div>
                            <div className="w-2/3 p-4 text-right">
                                <div className="flex items-center justify-end text-gray-500 text-sm mb-2">
                                    <span>Next Post</span>
                                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                    {nextPost.title}
                                </h4>
                            </div>
                        </div>
                    </div>
                </Link>
            ) : (
                <div className="flex-1"></div>
            )}
        </div>
    );
};

export default PostNavigation;