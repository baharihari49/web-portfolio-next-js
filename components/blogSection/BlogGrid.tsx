// BlogGrid.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { BlogPost } from './BlogSection';

interface BlogGridProps {
  posts: BlogPost[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts }) => {
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

  return (
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
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                {post.title}
              </Link>
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex justify-between items-center">
              <Link 
                href={`/blog/${post.slug}`}
                className="inline-flex items-center font-medium text-blue-600 hover:text-indigo-800 transition-colors duration-300"
              >
                Read More
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
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
  );
};

export default BlogGrid;