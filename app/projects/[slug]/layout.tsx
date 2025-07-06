import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// We'll need to create a service to fetch portfolio data
async function fetchProjectBySlug(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/portfolio`);
    if (!response.ok) return null;
    
    const data = await response.json();
    const portfolioItems = data.data || [];
    
    return portfolioItems.find((item: { slug: string }) => item.slug === slug);
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  
  if (!project) {
    return {
      title: 'Project Not Found | Bahari - Frontend Developer',
      description: 'The project you are looking for could not be found.',
    };
  }

  const projectUrl = `https://baharihari.com/projects/${slug}`;
  const projectDescription = project.description 
    ? project.description.length > 160 
      ? project.description.substring(0, 157) + '...'
      : project.description
    : `Explore ${project.title}, a ${project.category.toLowerCase()} project built with ${project.technologies?.slice(0, 3).join(', ')} by Bahari.`;

  return {
    title: `${project.title} | Bahari - Frontend Developer Portfolio`,
    description: projectDescription,
    keywords: [
      project.title,
      project.category,
      'Bahari',
      'Frontend Developer',
      'Full Stack Developer',
      'Portfolio',
      'Web Development',
      'Project Showcase',
      ...(project.technologies || []),
      `${project.category} project`,
      'responsive design',
      'modern web app',
    ],
    authors: [{ name: 'Bahari' }],
    creator: 'Bahari',
    publisher: 'Bahari',
    alternates: {
      canonical: projectUrl,
      languages: {
        'en-US': projectUrl,
        'x-default': projectUrl,
      },
    },
    openGraph: {
      title: `${project.title} | Bahari Portfolio`,
      description: projectDescription,
      url: projectUrl,
      siteName: 'Bahari - Frontend Developer',
      locale: 'en_US',
      type: 'article',
      publishedTime: project.year ? `${project.year}-01-01T00:00:00.000Z` : undefined,
      modifiedTime: new Date().toISOString(),
      authors: ['Bahari'],
      section: project.category,
      tags: project.technologies || [],
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.title} - ${project.category} project by Bahari`,
          type: 'image/jpeg',
        },
        {
          url: project.image,
          width: 800,
          height: 600,
          alt: `${project.title} project screenshot`,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Bahari Portfolio`,
      description: projectDescription,
      creator: '@baharidev',
      site: '@baharidev',
      images: [
        {
          url: project.image,
          alt: `${project.title} - ${project.category} project showcase`,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category: project.category,
  };
}

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  
  if (!project) {
    notFound();
  }

  return (
    <>
      {/* JSON-LD Structured Data for Project */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            description: project.description,
            image: project.image,
            url: `https://baharihari.com/projects/${slug}`,
            author: {
              '@type': 'Person',
              name: 'Bahari',
              url: 'https://baharihari.com',
            },
            creator: {
              '@type': 'Person',
              name: 'Bahari',
              url: 'https://baharihari.com',
            },
            datePublished: project.year ? `${project.year}-01-01` : undefined,
            genre: project.category,
            keywords: project.technologies?.join(', '),
            ...(project.link && {
              sameAs: project.link,
            }),
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://baharihari.com/projects/${slug}`,
            },
          }),
        }}
      />
      {children}
    </>
  );
}