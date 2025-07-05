import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Roboto } from "next/font/google";
import PerformanceProvider from "@/components/performance/PerformanceProvider";

// Font config
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

// ✅ Metadata with favicon
export const metadata: Metadata = {
  title: "Bahari - Frontend Developer & Full Stack Developer",
  description:
    "Experienced Frontend Developer and Full Stack Developer specializing in React, Next.js, Laravel, and modern web technologies. Building innovative, responsive web applications with 2.5+ years of professional experience.",
  keywords: [
    "Frontend Developer",
    "Full Stack Developer", 
    "Web Development",
    "React Developer",
    "Next.js Developer",
    "Laravel Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "API Developer",
    "Portfolio Developer",
    "Responsive Design",
    "Web Applications",
    "Bahari Developer",
  ],
  authors: [{ name: "Bahari" }],
  creator: "Bahari",
  publisher: "Bahari",
  viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
  alternates: {
    canonical: "https://baharihari.com",
    languages: {
      'en-US': 'https://baharihari.com',
      'x-default': 'https://baharihari.com',
    },
  },
  icons: {
    icon: "https://res.cloudinary.com/du0tz73ma/image/upload/v1733663814/Group_1_1_z6fjj3.png",
    apple: "https://res.cloudinary.com/du0tz73ma/image/upload/v1733663814/Group_1_1_z6fjj3.png",
  },
  openGraph: {
    title: "Bahari - Frontend Developer & Full Stack Developer",
    description:
      "Experienced developer specializing in building innovative web applications using React, Next.js, Laravel, and modern web technologies.",
    url: "https://baharihari.com",
    siteName: "Bahari - Frontend Developer",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://res.cloudinary.com/du0tz73ma/image/upload/c_fill,w_2475,h_3420/v1733248656/IMG-20241110-WA0013_jwgzp5.jpg",
        width: 1200,
        height: 630,
        alt: "Bahari - Frontend Developer and Full Stack Developer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bahari - Frontend Developer & Full Stack Developer",
    description:
      "Building responsive and modern web applications with React, Next.js, and Laravel. 2.5+ years of professional experience in web development.",
    images: [
      "https://res.cloudinary.com/du0tz73ma/image/upload/c_fill,w_1200,h_630/v1733248656/IMG-20241110-WA0013_jwgzp5.jpg",
    ],
    creator: "@baharidev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-placeholder",
    yandex: "yandex-verification-placeholder",
    yahoo: "yahoo-site-verification-placeholder",
    other: {
      'msvalidate.01': 'bing-verification-placeholder',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data for Person/Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Bahari',
              url: 'https://baharihari.com',
              image: 'https://res.cloudinary.com/du0tz73ma/image/upload/c_fill,w_2475,h_3420/v1733248656/IMG-20241110-WA0013_jwgzp5.jpg',
              description: 'Frontend Developer and Full Stack Developer experienced in building innovative and responsive web applications',
              jobTitle: 'Frontend Developer & Full Stack Developer',
              worksFor: {
                '@type': 'Organization',
                name: 'Freelance',
              },
              knowsAbout: [
                'Frontend Development',
                'Full Stack Development',
                'React.js',
                'Next.js',
                'Laravel',
                'TypeScript',
                'JavaScript',
                'Web Development',
                'API Development',
                'Responsive Design',
              ],
              hasOccupation: {
                '@type': 'Occupation',
                name: 'Web Developer',
                occupationalCategory: 'Software Developer',
                description: 'Develops web applications and digital solutions',
                skills: [
                  'React.js',
                  'Next.js',
                  'Laravel',
                  'TypeScript',
                  'JavaScript',
                  'Node.js',
                  'PHP',
                  'MySQL',
                  'Tailwind CSS',
                ],
              },
              sameAs: [
                'https://github.com/baharidev',
                'https://linkedin.com/in/baharidev',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'hello@baharihari.com',
                contactType: 'Professional',
                availableLanguage: ['English', 'Indonesian'],
              },
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'ID',
              },
              alumniOf: {
                '@type': 'EducationalOrganization',
                name: 'Computer Science Education',
              },
              award: [
                'Certified Web Developer',
                '2.5+ Years of Professional Experience',
                '10+ Completed Projects',
              ],
            }),
          }}
        />
        
        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Bahari - Frontend Developer Portfolio',
              url: 'https://baharihari.com',
              description: 'Professional portfolio of Bahari, showcasing frontend and full-stack development projects',
              author: {
                '@type': 'Person',
                name: 'Bahari',
              },
              inLanguage: 'en',
              copyrightYear: 2024,
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://baharihari.com/blog?search={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />

        {/* Professional Service Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Bahari Web Development Services',
              url: 'https://baharihari.com',
              description: 'Professional web development services specializing in frontend and full-stack solutions',
              provider: {
                '@type': 'Person',
                name: 'Bahari',
              },
              areaServed: 'Worldwide',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Web Development Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Frontend Development',
                      description: 'Custom frontend solutions using React, Next.js, and modern frameworks',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Full Stack Development',
                      description: 'Complete web applications with backend API development using Laravel and Node.js',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'API Development',
                      description: 'RESTful API development and integration services',
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}
        style={{ 
          fontFamily: "Roboto",
        } as React.CSSProperties}
        suppressHydrationWarning
      >
        <PerformanceProvider
          enableWebVitals={process.env.NODE_ENV === 'production'}
          enableServiceWorker={process.env.NODE_ENV === 'production'}
          criticalResources={[
            {
              href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap',
              as: 'style',
              crossOrigin: true,
            },
          ]}
        >
          {children}
        </PerformanceProvider>
      </body>
    </html>
  );
}