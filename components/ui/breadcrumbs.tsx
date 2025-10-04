import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav className={`flex items-center space-x-1 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {/* Home icon as first item */}
        <li>
          <Link 
            href="/"
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100"
            aria-label="Go to homepage"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400 mx-1 flex-shrink-0" />
            {item.href && !item.current ? (
              <Link
                href={item.href}
                className="text-gray-500 hover:text-gray-700 transition-colors px-2 py-1 rounded-md hover:bg-gray-100 truncate max-w-[200px]"
                title={item.label}
              >
                {item.label}
              </Link>
            ) : (
              <span 
                className={`px-2 py-1 rounded-md truncate max-w-[200px] ${
                  item.current 
                    ? 'text-blue-600 font-medium bg-blue-50' 
                    : 'text-gray-900'
                }`}
                aria-current={item.current ? 'page' : undefined}
                title={item.label}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Structured data for breadcrumbs (JSON-LD)
export const BreadcrumbStructuredData: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://baharihari.com',
      },
      ...items
        .filter(item => item.href) // Only include items with URLs
        .map((item, index) => ({
          '@type': 'ListItem',
          position: index + 2,
          name: item.label,
          item: `https://baharihari.com${item.href}`,
        })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
};

export default Breadcrumbs;