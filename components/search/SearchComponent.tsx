'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, Clock, Folder, ArrowUpRight } from 'lucide-react';
import { calculateReadingTime } from '@/lib/contentUtils';

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail?: string;
  category?: string;
  type: 'blog' | 'project';
  content?: string;
  tags?: string[];
  relevanceScore?: number;
}

interface SearchComponentProps {
  placeholder?: string;
  maxResults?: number;
  className?: string;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
  placeholder = "Search articles and projects...",
  maxResults = 5,
  className = "",
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
      if (event.key === 'Enter' && event.metaKey) {
        // Cmd+Enter to focus search
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Search function
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // Search blog posts
      const blogResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/posts?search=${encodeURIComponent(searchQuery)}`
      );
      
      // Search projects (if API supports it)
      const projectResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/portfolio?search=${encodeURIComponent(searchQuery)}`
      );

      const blogData = blogResponse.ok ? await blogResponse.json() : { data: [] };
      const projectData = projectResponse.ok ? await projectResponse.json() : { data: [] };

      // Combine and format results
      const blogResults: SearchResult[] = (blogData.data || []).map((post: { 
        id: string; 
        title: string; 
        slug: string; 
        excerpt: string; 
        thumbnail: string; 
        category: string; 
        content: string; 
        tags?: Array<string | { name: string }>;
      }) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        thumbnail: post.thumbnail,
        category: typeof post.category === 'string' ? post.category : post.category?.name,
        type: 'blog' as const,
        content: post.content,
        tags: post.tags?.map((tag) => typeof tag === 'string' ? tag : tag.name),
      }));

      const projectResults: SearchResult[] = (projectData.data || []).map((project: {
        id: string;
        title: string;
        slug: string;
        description: string;
        image: string;
        category: string;
        technologies: string[];
      }) => ({
        id: project.id,
        title: project.title,
        slug: project.slug,
        excerpt: project.description,
        thumbnail: project.image,
        category: project.category,
        type: 'project' as const,
        tags: project.technologies,
      }));

      // Calculate relevance scores and combine
      const allResults = [...blogResults, ...projectResults]
        .map(result => ({
          ...result,
          relevanceScore: calculateRelevance(result, searchQuery),
        }))
        .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
        .slice(0, maxResults);

      setResults(allResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate relevance score
  const calculateRelevance = (item: SearchResult, query: string): number => {
    const queryLower = query.toLowerCase();
    let score = 0;

    // Title match (highest weight)
    if (item.title.toLowerCase().includes(queryLower)) {
      score += 10;
    }

    // Category match
    if (item.category?.toLowerCase().includes(queryLower)) {
      score += 5;
    }

    // Tags match
    if (item.tags?.some(tag => tag.toLowerCase().includes(queryLower))) {
      score += 3;
    }

    // Content match
    if (item.content?.toLowerCase().includes(queryLower)) {
      score += 2;
    }

    // Excerpt match
    if (item.excerpt.toLowerCase().includes(queryLower)) {
      score += 1;
    }

    return score;
  };

  // Handle search input
  const handleSearch = (value: string) => {
    setQuery(value);
    setIsOpen(true);
    
    if (value.trim()) {
      performSearch(value);
    } else {
      setResults([]);
    }
  };

  // Save search to recent searches
  const saveRecentSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  // Handle result click
  const handleResultClick = () => {
    saveRecentSearch(query);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-1 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {/* Loading State */}
          {isLoading && (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              <span className="mt-2 block">Searching...</span>
            </div>
          )}

          {/* Results */}
          {!isLoading && results.length > 0 && (
            <div className="p-2">
              <div className="text-xs text-gray-500 px-3 py-2 border-b">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </div>
              {results.map((result) => (
                <Link
                  key={`${result.type}-${result.id}`}
                  href={result.type === 'blog' ? `/blog/${result.slug}` : `/projects/${result.slug}`}
                  onClick={() => handleResultClick()}
                  className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-start gap-3">
                    {result.thumbnail && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={result.thumbnail}
                          alt={result.title}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900 truncate">{result.title}</h4>
                        <ArrowUpRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{result.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className={`px-2 py-1 rounded-full ${
                          result.type === 'blog' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {result.type === 'blog' ? 'Article' : 'Project'}
                        </span>
                        {result.category && (
                          <span className="flex items-center">
                            <Folder className="w-3 h-3 mr-1" />
                            {result.category}
                          </span>
                        )}
                        {result.type === 'blog' && result.content && (
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {calculateReadingTime(result.content)}m read
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && query && results.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-sm mt-1">Try different keywords or browse our content</p>
            </div>
          )}

          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <div className="p-2">
              <div className="text-xs text-gray-500 px-3 py-2 border-b">Recent Searches</div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{search}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;