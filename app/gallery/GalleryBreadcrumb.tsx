'use client';

import Link from 'next/link';
import { ChevronRight, Home, Layout } from 'lucide-react';

export default function GalleryBreadcrumb() {
  return (
    <nav className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              href="/"
              className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </li>
          <li className="flex items-center text-blue-600 font-medium">
            <Layout className="w-4 h-4 mr-1" />
            Gallery
          </li>
        </ol>
      </div>
    </nav>
  );
}
