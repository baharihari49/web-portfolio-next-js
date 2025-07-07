'use client';

import { motion } from 'framer-motion';
import { Sparkles, Code2, Palette, FolderOpen } from 'lucide-react';

export default function PortfolioHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50 py-20 md:py-32 px-6">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl animate-pulse delay-500" />
      
      {/* Decorative shapes */}
      <div className="absolute top-20 right-20 w-16 h-16 bg-indigo-100 rounded-lg rotate-12 opacity-60"></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-blue-100 rounded-lg -rotate-12 opacity-60"></div>
      <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-purple-100 rounded-full opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Code2 className="w-8 h-8 text-indigo-600" />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Sparkles className="w-10 h-10 text-purple-600" />
            </motion.div>
            <motion.div
              initial={{ rotate: 180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Palette className="w-8 h-8 text-blue-600" />
            </motion.div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
            My Portfolio
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Explore a collection of my latest web development projects, 
            showcasing modern design, innovative solutions, and cutting-edge technologies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600/10 rounded-full text-sm font-medium text-indigo-700"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-600"></span>
              </span>
              Open for Collaboration
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-2 text-sm text-gray-500 font-medium"
            >
              <FolderOpen className="w-4 h-4 text-indigo-500" />
              <span>Browse through all my projects below</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}