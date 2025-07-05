// Mock blog data for development
export const mockBlogPosts = [
  {
    id: "1",
    slug: "building-modern-web-applications-2025",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    category: "Web Development",
    categoryId: "web-dev",
    date: "May 15, 2025",
    comments: 24,
    title: "Building Modern Web Applications with Next.js 15",
    excerpt: "Explore the latest features and best practices for developing high-performance web applications using Next.js 15, including App Router, Server Components, and advanced optimization techniques.",
    hasImage: true,
    isFeature: true,
    published: true,
    author: {
      id: "bahari",
      name: "Bahari"
    },
    tags: [
      { id: "nextjs", name: "Next.js" },
      { id: "react", name: "React" },
      { id: "webdev", name: "Web Development" }
    ],
    createdAt: "2025-05-15T10:00:00Z",
    updatedAt: "2025-05-15T10:00:00Z"
  },
  {
    id: "2",
    slug: "mastering-typescript-advanced-patterns",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    category: "TypeScript",
    categoryId: "typescript",
    date: "May 10, 2025",
    comments: 18,
    title: "Mastering TypeScript: Advanced Patterns and Best Practices",
    excerpt: "Deep dive into advanced TypeScript concepts including generics, conditional types, and utility types to write more robust and maintainable code.",
    hasImage: true,
    isFeature: false,
    published: true,
    author: {
      id: "bahari",
      name: "Bahari"
    },
    tags: [
      { id: "typescript", name: "TypeScript" },
      { id: "javascript", name: "JavaScript" },
      { id: "programming", name: "Programming" }
    ],
    createdAt: "2025-05-10T14:30:00Z",
    updatedAt: "2025-05-10T14:30:00Z"
  },
  {
    id: "3",
    slug: "responsive-design-css-grid-flexbox",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    category: "CSS",
    categoryId: "css",
    date: "May 5, 2025",
    comments: 31,
    title: "Responsive Design Mastery: CSS Grid vs Flexbox",
    excerpt: "Learn when and how to use CSS Grid and Flexbox for creating responsive layouts. Complete guide with practical examples and real-world use cases.",
    hasImage: true,
    isFeature: false,
    published: true,
    author: {
      id: "bahari",
      name: "Bahari"
    },
    tags: [
      { id: "css", name: "CSS" },
      { id: "responsive", name: "Responsive Design" },
      { id: "frontend", name: "Frontend" }
    ],
    createdAt: "2025-05-05T09:15:00Z",
    updatedAt: "2025-05-05T09:15:00Z"
  },
  {
    id: "4",
    slug: "laravel-api-development-best-practices",
    thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe5c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    category: "Backend",
    categoryId: "backend",
    date: "April 28, 2025",
    comments: 15,
    title: "Laravel API Development: Best Practices and Security",
    excerpt: "Build secure and scalable APIs with Laravel. Cover authentication, rate limiting, caching, and API versioning strategies.",
    hasImage: true,
    isFeature: false,
    published: true,
    author: {
      id: "bahari",
      name: "Bahari"
    },
    tags: [
      { id: "laravel", name: "Laravel" },
      { id: "api", name: "API" },
      { id: "php", name: "PHP" }
    ],
    createdAt: "2025-04-28T16:45:00Z",
    updatedAt: "2025-04-28T16:45:00Z"
  },
  {
    id: "5",
    slug: "javascript-performance-optimization-2025",
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    category: "JavaScript",
    categoryId: "javascript",
    date: "April 20, 2025",
    comments: 42,
    title: "JavaScript Performance Optimization in 2025",
    excerpt: "Comprehensive guide to optimizing JavaScript performance including Core Web Vitals, bundle optimization, and runtime performance improvements.",
    hasImage: true,
    isFeature: true,
    published: true,
    author: {
      id: "bahari",
      name: "Bahari"
    },
    tags: [
      { id: "javascript", name: "JavaScript" },
      { id: "performance", name: "Performance" },
      { id: "optimization", name: "Optimization" }
    ],
    createdAt: "2025-04-20T11:20:00Z",
    updatedAt: "2025-04-20T11:20:00Z"
  },
  {
    id: "6",
    slug: "react-server-components-complete-guide",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    category: "React",
    categoryId: "react",
    date: "April 15, 2025",
    comments: 28,
    title: "React Server Components: Complete Guide",
    excerpt: "Understanding React Server Components, their benefits, and how to implement them effectively in your Next.js applications.",
    hasImage: true,
    isFeature: false,
    published: true,
    author: {
      id: "bahari",
      name: "Bahari"
    },
    tags: [
      { id: "react", name: "React" },
      { id: "nextjs", name: "Next.js" },
      { id: "server-components", name: "Server Components" }
    ],
    createdAt: "2025-04-15T13:10:00Z",
    updatedAt: "2025-04-15T13:10:00Z"
  }
];

export const mockApiResponse = {
  success: true,
  data: mockBlogPosts
};