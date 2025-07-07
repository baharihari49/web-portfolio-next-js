import { MetadataRoute } from 'next';

// Base URL for the site
const baseUrl = 'https://baharihari.com';

// Function to fetch blog posts for sitemap (if API is available)
async function getBlogPosts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/posts`);
    if (!response.ok) return [];
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    return [];
  }
}

// Function to fetch blog categories for sitemap
async function getBlogCategories() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/categories`);
    if (!response.ok) return [];
    
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching blog categories for sitemap:', error);
    return [];
  }
}

// Function to fetch blog tags for sitemap
async function getBlogTags() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/tags`);
    if (!response.ok) return [];
    
    const data = await response.json();
    return data.tags || [];
  } catch (error) {
    console.error('Error fetching blog tags for sitemap:', error);
    return [];
  }
}

// Function to fetch portfolio projects for sitemap (if API is available)
async function getPortfolioProjects() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/portfolio`);
    if (!response.ok) return [];
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching portfolio projects for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date('2025-01-07'),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date('2025-01-07'),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Fetch dynamic content
  const [blogPosts, portfolioProjects, blogCategories, blogTags] = await Promise.all([
    getBlogPosts(),
    getPortfolioProjects(),
    getBlogCategories(),
    getBlogTags(),
  ]);

  // Blog post pages
  const blogPages = blogPosts.map((post: { slug: string; updatedAt?: string; date?: string }) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.date || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Portfolio project pages
  const projectPages = portfolioProjects.map((project: { slug: string; updatedAt?: string }) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Blog category pages
  const categoryPages = blogCategories.map((category: { name: string }) => ({
    url: `${baseUrl}/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Blog tag pages
  const tagPages = blogTags.slice(0, 20).map((tag: { name: string }) => ({
    url: `${baseUrl}/blog/tag/${tag.name.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  // Combine all pages
  return [
    ...staticPages,
    ...blogPages,
    ...projectPages,
    ...categoryPages,
    ...tagPages,
  ];
}