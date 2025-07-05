import { Metadata } from 'next';

export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category } = await params;
  
  // Format category for display
  const categoryDisplay = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const categoryUrl = `https://baharihari.com/blog/category/${category}`;
  
  return {
    title: `${categoryDisplay} Articles | Bahari Developer Blog`,
    description: `Explore ${categoryDisplay.toLowerCase()} articles and tutorials by Bahari. Learn about frontend development, full-stack programming, and modern web technologies.`,
    keywords: [
      categoryDisplay,
      'Bahari blog',
      'development articles',
      'programming tutorials',
      'web development',
      'frontend development',
      'full stack development',
    ],
    authors: [{ name: 'Bahari' }],
    alternates: {
      canonical: categoryUrl,
    },
    openGraph: {
      title: `${categoryDisplay} Articles | Bahari Developer Blog`,
      description: `Explore ${categoryDisplay.toLowerCase()} articles and tutorials by Bahari covering modern web development technologies.`,
      url: categoryUrl,
      siteName: 'Bahari - Frontend Developer',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary',
      title: `${categoryDisplay} Articles | Bahari Developer Blog`,
      description: `Explore ${categoryDisplay.toLowerCase()} articles and tutorials by Bahari covering modern web development technologies.`,
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

export default async function BlogCategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryDisplay = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return (
    <>
      {/* JSON-LD Structured Data for Blog Category */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${categoryDisplay} Articles`,
            description: `Collection of ${categoryDisplay.toLowerCase()} articles and tutorials by Bahari`,
            url: `https://baharihari.com/blog/category/${category}`,
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
                  name: 'Categories',
                  item: 'https://baharihari.com/blog/categories',
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: categoryDisplay,
                  item: `https://baharihari.com/blog/category/${category}`,
                },
              ],
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://baharihari.com/blog/category/${category}`,
            },
          }),
        }}
      />
      {children}
    </>
  );
}