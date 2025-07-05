// app/blog/layout.tsx
import type { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Bahari - Frontend Developer & Full Stack Developer',
  description:
    'Check out Bahari’s latest articles on frontend & full-stack development, covering Next.js, Laravel, API design, and more.',
  keywords: [
    'Bahari blog',
    'Frontend Developer',
    'Full Stack Developer',
    'Web Development',
    'Next.js',
    'Laravel',
    'API',
    'Tutorials',
  ],
  authors: [{ name: 'Bahari' }],
  viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
  alternates: {
    canonical: 'https://baharihari.com/blog',
  },
  icons: {
    icon:
      'https://res.cloudinary.com/du0tz73ma/image/upload/v1733663814/Group_1_1_z6fjj3.png',
  },
  openGraph: {
    title: 'Blog | Bahari - Frontend Developer & Full Stack Developer',
    description:
      'Dive into Bahari’s blog for in-depth posts on modern web development with Next.js, Laravel, and more.',
    url: 'https://baharihari.com/blog',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/du0tz73ma/image/upload/c_fill,w_2475,h_3420/v1733248656/IMG-20241110-WA0013_jwgzp5.jpg',
        width: 2475,
        height: 3420,
        alt: 'Bahari writing code',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Bahari - Frontend Developer & Full Stack Developer',
    description:
      'Explore tutorials & insights on web development in Bahari’s blog—Next.js, Laravel, and beyond.',
    images: [
      'https://res.cloudinary.com/du0tz73ma/image/upload/c_fill,w_2475,h_3420/v1733248656/IMG-20241110-WA0013_jwgzp5.jpg',
    ],
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
}

interface BlogLayoutProps {
  children: ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <>
      {/* JSON-LD Structured Data for Blog Section */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Bahari Developer Blog',
            description:
              'Frontend and Full Stack Development articles covering Next.js, Laravel, API design, and modern web technologies',
            url: 'https://baharihari.com/blog',
            inLanguage: 'en',
            author: {
              '@type': 'Person',
              name: 'Bahari',
              url: 'https://baharihari.com',
            },
            publisher: {
              '@type': 'Person',
              name: 'Bahari',
              url: 'https://baharihari.com',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://baharihari.com/blog',
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
              ],
            },
          }),
        }}
      />
      <main>{children}</main>
    </>
  )
}
