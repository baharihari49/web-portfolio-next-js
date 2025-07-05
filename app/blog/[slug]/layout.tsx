// app/blog/[slug]/layout.tsx
import { notFound } from 'next/navigation';
import { fetchBlogPostBySlug } from '@/services/blogService';
import { Metadata } from 'next';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);
  if (!post) {
    return { title: 'Post Not Found | Bahari - Frontend Developer' };
  }

  const url = `https://baharihari.com/blog/${slug}`;
  return {
    title: `${post.title} | Bahari - Frontend Developer`,
    description: post.excerpt || post.content.slice(0, 150),
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: 'Bahari - Frontend Developer',
      images: [{ url: post.thumbnail, width: 1200, height: 630 }],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author?.name || 'Bahari'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.thumbnail],
    },
  };
}

export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            image: [post.thumbnail],
            author: { '@type': 'Person', name: post.author?.name },
            datePublished: post.date,
            dateModified: post.updatedAt || post.date,
            description: post.excerpt || post.content.slice(0, 150),
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://baharihari.com/blog/${slug}`,
            },
          }),
        }}
      />

      {/* Render the client-side page component here */}
      {children}
    </>
  );
}
