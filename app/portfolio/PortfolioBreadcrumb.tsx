'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PortfolioBreadcrumb() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      aria-label="Breadcrumb"
      className="bg-background/50 backdrop-blur-sm border-b"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              href="/"
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="w-4 h-4 mr-1" />
              <span>Home</span>
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />
            <span className="text-foreground font-medium">Portfolio</span>
          </li>
        </ol>
      </div>
    </motion.nav>
  );
}