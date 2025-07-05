import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Bahari - Frontend Developer',
  description:
    'Privacy Policy for Bahari\'s portfolio website. Learn about data collection, usage, and your privacy rights when visiting baharihari.com.',
  keywords: [
    'privacy policy',
    'data protection',
    'user privacy',
    'cookies policy',
    'baharihari.com',
    'Bahari developer',
    'GDPR compliance',
  ],
  authors: [{ name: 'Bahari' }],
  alternates: {
    canonical: 'https://baharihari.com/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Bahari - Frontend Developer',
    description:
      'Privacy Policy for Bahari\'s portfolio website. Learn about data collection, usage, and your privacy rights.',
    url: 'https://baharihari.com/privacy-policy',
    siteName: 'Bahari - Frontend Developer',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Bahari - Frontend Developer',
    description:
      'Privacy Policy for Bahari\'s portfolio website. Learn about data collection, usage, and your privacy rights.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyLayout({
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
            name: 'Privacy Policy',
            description:
              'Privacy Policy for Bahari\'s portfolio website covering data collection, usage, and user rights.',
            url: 'https://baharihari.com/privacy-policy',
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
                  name: 'Privacy Policy',
                  item: 'https://baharihari.com/privacy-policy',
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