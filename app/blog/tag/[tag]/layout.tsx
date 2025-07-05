import { Metadata } from 'next';

export async function generateMetadata(
  { params }: { params: Promise<{ tag: string }> }
): Promise<Metadata> {
  const { tag } = await params;
  
  // Format tag for display
  const tagDisplay = tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const tagUrl = `https://baharihari.com/blog/tag/${tag}`;
  
  return {
    title: `#${tagDisplay} Posts | Bahari Developer Blog`,
    description: `Discover posts tagged with ${tagDisplay.toLowerCase()} by Bahari. Explore tutorials, insights, and articles about web development and programming.`,
    keywords: [
      tagDisplay,
      `${tagDisplay} tutorial`,
      `${tagDisplay} guide`,
      'Bahari blog',
      'development articles',
      'programming tutorials',
      'web development',
      'frontend development',
    ],
    authors: [{ name: 'Bahari' }],
    alternates: {
      canonical: tagUrl,
    },
    openGraph: {
      title: `#${tagDisplay} Posts | Bahari Developer Blog`,
      description: `Discover posts tagged with ${tagDisplay.toLowerCase()} by Bahari covering modern web development technologies and best practices.`,
      url: tagUrl,
      siteName: 'Bahari - Frontend Developer',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary',
      title: `#${tagDisplay} Posts | Bahari Developer Blog`,
      description: `Discover posts tagged with ${tagDisplay.toLowerCase()} by Bahari covering modern web development technologies.`,
      creator: '@baharidev',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function BlogTagLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const tagDisplay = tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return (
    <>
      {/* JSON-LD Structured Data for Blog Tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `Posts Tagged: ${tagDisplay}`,
            description: `Collection of posts tagged with ${tagDisplay.toLowerCase()} by Bahari`,
            url: `https://baharihari.com/blog/tag/${tag}`,
            inLanguage: 'en-US',
            isPartOf: {
              '@type': 'Blog',
              name: 'Bahari Developer Blog',
              url: 'https://baharihari.com/blog',
            },
            author: {
              '@type': 'Person',
              name: 'Bahari',
              url: 'https://baharihari.com',
            },
            keywords: [tagDisplay],
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://baharihari.com',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Blog',
                  item: 'https://baharihari.com/blog',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Tags',
                  item: 'https://baharihari.com/blog/tags',
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: `#${tagDisplay}`,
                  item: `https://baharihari.com/blog/tag/${tag}`,
                },
              ],
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://baharihari.com/blog/tag/${tag}`,
            },
          }),
        }}
      />
      {children}
    </>
  );
}