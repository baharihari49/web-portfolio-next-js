'use client';

import { PortfolioItem } from '@/app/types/portfolio';

interface PortfolioStructuredDataProps {
  items: PortfolioItem[];
}

export default function PortfolioStructuredData({ items }: PortfolioStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Portfolio - Bahari Web Developer',
    description: 'A collection of web development projects showcasing modern web applications, responsive designs, and innovative digital solutions.',
    url: 'https://bahari.dev/portfolio',
    author: {
      '@type': 'Person',
      name: 'Bahari',
      jobTitle: 'Full Stack Web Developer',
      url: 'https://bahari.dev',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          '@id': `https://bahari.dev/projects/${item.slug}`,
          name: item.title,
          description: item.description,
          image: item.image,
          dateCreated: item.createdAt,
          dateModified: item.updatedAt,
          creator: {
            '@type': 'Person',
            name: 'Bahari',
          },
          keywords: item.technologies.join(', '),
          url: `https://bahari.dev/projects/${item.slug}`,
          ...(item.link && { sameAs: item.link }),
        },
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://bahari.dev',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Portfolio',
          item: 'https://bahari.dev/portfolio',
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}