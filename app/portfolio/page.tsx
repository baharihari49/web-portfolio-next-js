import { Metadata } from 'next';
import PortfolioShowcase from './PortfolioShowcase';

export const metadata: Metadata = {
  title: 'Portfolio | Bahari - Web Developer & Designer',
  description: 'Explore my portfolio of web development projects, including modern web applications, responsive designs, and innovative digital solutions built with React, Next.js, and more.',
  keywords: 'portfolio, web development projects, React projects, Next.js applications, responsive design, frontend development, full-stack projects',
  openGraph: {
    title: 'Portfolio | Bahari - Web Developer & Designer',
    description: 'Explore my portfolio of web development projects and digital solutions',
    url: 'https://bahari.dev/portfolio',
    siteName: 'Bahari Portfolio',
    images: [
      {
        url: 'https://bahari.dev/og-portfolio.jpg',
        width: 1200,
        height: 630,
        alt: 'Bahari Portfolio Projects',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Bahari - Web Developer & Designer',
    description: 'Explore my portfolio of web development projects and digital solutions',
    creator: '@bahari',
    images: ['https://bahari.dev/og-portfolio.jpg'],
  },
  alternates: {
    canonical: 'https://bahari.dev/portfolio',
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

export default function PortfolioPage() {
  return <PortfolioShowcase />;
}