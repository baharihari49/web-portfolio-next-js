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
  },
}

interface BlogLayoutProps {
  children: ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <>
      <main>{children}</main>
    </>
  )
}
