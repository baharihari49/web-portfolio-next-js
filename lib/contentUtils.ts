// Content utilities for SEO and UX enhancements

/**
 * Calculate estimated reading time for content
 * @param content - The content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
  // Remove HTML tags and get plain text
  const plainText = content.replace(/<[^>]*>/g, '');
  
  // Count words (split by whitespace and filter empty strings)
  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
  
  // Calculate reading time and round up to nearest minute
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  // Minimum 1 minute
  return Math.max(1, readingTime);
}

/**
 * Extract table of contents from HTML content
 * @param content - HTML content
 * @returns Array of TOC items with id, text, and level
 */
export function extractTableOfContents(content: string): Array<{id: string, text: string, level: number}> {
  if (typeof window === 'undefined') return [];
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  
  return headings.map(heading => {
    const text = heading.textContent || '';
    const level = parseInt(heading.tagName.charAt(1));
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    return { id, text, level };
  });
}

/**
 * Add IDs to headings in HTML content for anchor links
 * @param content - HTML content
 * @returns HTML content with IDs added to headings
 */
export function addHeadingIds(content: string): string {
  if (typeof window === 'undefined') return content;
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  headings.forEach(heading => {
    const text = heading.textContent || '';
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    if (id && !heading.id) {
      heading.setAttribute('id', id);
    }
  });
  
  return doc.body.innerHTML;
}

/**
 * Generate excerpt from content
 * @param content - Full content
 * @param maxLength - Maximum length of excerpt
 * @returns Excerpt with proper sentence ending
 */
export function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove HTML tags
  const plainText = content.replace(/<[^>]*>/g, '');
  
  if (plainText.length <= maxLength) {
    return plainText.trim();
  }
  
  // Find the last complete sentence within the limit
  const truncated = plainText.substring(0, maxLength);
  const lastSentence = truncated.lastIndexOf('.');
  const lastSpace = truncated.lastIndexOf(' ');
  
  // If we found a sentence ending, use it; otherwise use last space
  const cutoff = lastSentence > maxLength * 0.5 ? lastSentence + 1 : lastSpace;
  
  return truncated.substring(0, cutoff).trim() + '...';
}

/**
 * Extract keywords from content for SEO
 * @param content - Content to analyze
 * @param maxKeywords - Maximum number of keywords to return
 * @returns Array of relevant keywords
 */
export function extractKeywords(content: string, maxKeywords: number = 10): string[] {
  // Remove HTML tags
  const plainText = content.replace(/<[^>]*>/g, '').toLowerCase();
  
  // Common stop words to filter out
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
    'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after',
    'above', 'below', 'between', 'among', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those',
    'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'
  ]);
  
  // Extract words and count frequency
  const words = plainText
    .match(/\b[a-z]{3,}\b/g) || []
    .filter(word => !stopWords.has(word));
  
  const wordCount = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Sort by frequency and return top keywords
  return Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxKeywords)
    .map(([word]) => word);
}

/**
 * Format date for display
 * @param dateString - Date string to format
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * Format relative time (e.g., "2 days ago")
 * @param dateString - Date string
 * @returns Relative time string
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];
  
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }
  
  return 'Just now';
}

/**
 * Generate social sharing URLs
 * @param url - URL to share
 * @param title - Title of the content
 * @param description - Description of the content
 * @returns Object with social sharing URLs
 */
export function generateSocialShareUrls(url: string, title: string, description?: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');
  
  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };
}