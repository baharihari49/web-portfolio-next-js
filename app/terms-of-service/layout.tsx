import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Bahari - Frontend Developer',
  description:
    'Terms of Service for Bahari\'s portfolio website. Read the rules, guidelines, and conditions for using baharihari.com and its services.',
  keywords: [
    'terms of service',
    'terms and conditions',
    'user agreement',
    'website rules',
    'legal terms',
    'baharihari.com',
    'Bahari developer',
    'usage guidelines',
  ],
  authors: [{ name: 'Bahari' }],
  alternates: {
    canonical: 'https://baharihari.com/terms-of-service',
  },
  openGraph: {
    title: 'Terms of Service | Bahari - Frontend Developer',
    description:
      'Terms of Service for Bahari\'s portfolio website. Read the rules, guidelines, and conditions for using the website.',
    url: 'https://baharihari.com/terms-of-service',
    siteName: 'Bahari - Frontend Developer',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service | Bahari - Frontend Developer',
    description:
      'Terms of Service for Bahari\'s portfolio website. Read the rules, guidelines, and conditions for using the website.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD Structured Data for WebPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Terms of Service',
            description:
              'Terms of Service for Bahari\'s portfolio website covering usage rules, content guidelines, and legal conditions.',
            url: 'https://baharihari.com/terms-of-service',
            inLanguage: 'en',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Bahari - Frontend Developer',
              url: 'https://baharihari.com',
            },
            author: {
              '@type': 'Person',
              name: 'Bahari',
            },
            dateModified: '2025-01-07',
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
                  name: 'Terms of Service',
                  item: 'https://baharihari.com/terms-of-service',
                },
              ],
            },
          }),
        }}
      />
      {children}
    </>
  );
}