import { Metadata } from 'next';
import GalleryShowcase from './GalleryShowcase';

export const metadata: Metadata = {
  title: 'Design Gallery | Bahari - Web Developer & Designer',
  description: 'Explore my collection of landing page designs and UI templates. Modern, responsive templates crafted with attention to detail and aesthetic excellence.',
  keywords: 'landing page templates, UI templates, web design, landing page design, responsive templates, modern web templates, UI/UX design',
  openGraph: {
    title: 'Design Gallery | Bahari - Web Developer & Designer',
    description: 'Explore my collection of landing page designs and UI templates',
    url: 'https://bahari.dev/gallery',
    siteName: 'Bahari Portfolio',
    images: [
      {
        url: 'https://bahari.dev/og-gallery.jpg',
        width: 1200,
        height: 630,
        alt: 'Bahari Design Gallery',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Design Gallery | Bahari - Web Developer & Designer',
    description: 'Explore my collection of landing page designs and UI templates',
    creator: '@bahari',
    images: ['https://bahari.dev/og-gallery.jpg'],
  },
  alternates: {
    canonical: 'https://bahari.dev/gallery',
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

export default function GalleryPage() {
  return <GalleryShowcase />;
}
