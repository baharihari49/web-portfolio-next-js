import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Calendar, Folder, Tag } from 'lucide-react';

interface RelatedItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  thumbnail?: string;
  category?: string;
  date?: string;
  readingTime?: number;
  type: 'blog' | 'project';
}

interface RelatedContentProps {
  items: RelatedItem[];
  title?: string;
  maxItems?: number;
  className?: string;
}

export const RelatedContent: React.FC<RelatedContentProps> = ({
  items,
  title = "You Might Also Like",
  maxItems = 3,
  className = "",
}) => {
  const displayItems = items.slice(0, maxItems);

  if (displayItems.length === 0) return null;

  return (
    <section className={`bg-white rounded-xl shadow-sm p-6 md:p-8 ${className}`}>
      <div className="flex items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <div className="ml-3 h-1 w-12 bg-blue-600 rounded"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayItems.map((item) => (
          <article
            key={item.id}
            className="group border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
          >
            {item.thumbnail && (
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={item.thumbnail}
                  alt={`${item.title} ${item.type === 'blog' ? 'article' : 'project'}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.type === 'blog' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {item.type === 'blog' ? 'Article' : 'Project'}
                  </span>
                </div>
              </div>
            )}

            <div className="p-4">
              {/* Metadata */}
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                {item.category && (
                  <span className="flex items-center">
                    {item.type === 'blog' ? (
                      <Folder className="w-3 h-3 mr-1" />
                    ) : (
                      <Tag className="w-3 h-3 mr-1" />
                    )}
                    {item.category}
                  </span>
                )}
                {item.date && (
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {item.date}
                  </span>
                )}
                {item.readingTime && (
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {item.readingTime}m read
                  </span>
                )}
              </div>

              {/* Title */}
              <h4 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                <Link 
                  href={item.type === 'blog' ? `/blog/${item.slug}` : `/projects/${item.slug}`}
                  className="after:absolute after:inset-0"
                >
                  {item.title}
                </Link>
              </h4>

              {/* Excerpt */}
              {item.excerpt && (
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {item.excerpt}
                </p>
              )}

              {/* Read More Link */}
              <div className="flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
                <span>{item.type === 'blog' ? 'Read Article' : 'View Project'}</span>
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {items.length > maxItems && (
        <div className="text-center mt-6">
          <Link
            href={items[0].type === 'blog' ? '/blog' : '/#portfolio'}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            View All {items[0].type === 'blog' ? 'Articles' : 'Projects'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      )}
    </section>
  );
};

export default RelatedContent;