'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft, ExternalLink, Calendar, Bookmark, Briefcase, Trophy,
  Clock, Code, Monitor, Share2,
  ArrowRight, Layers, Palette, Layout, MessageSquare, Users, ArrowUpRight,
  Star, Zap, CheckCircle2, Globe, Link2
} from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Breadcrumbs, BreadcrumbStructuredData } from '@/components/ui/breadcrumbs';

// Import types
import { PortfolioItem } from '@/app/types/portfolio';

// Get technology color based on name (for consistent tech tag colors)
const getTechColor = (tech: string) => {
  const techColors: { [key: string]: string } = {
    'React': 'bg-blue-100 text-blue-700',
    'Next.js': 'bg-gray-800 text-white',
    'TypeScript': 'bg-blue-100 text-blue-700',
    'JavaScript': 'bg-yellow-100 text-yellow-700',
    'HTML5': 'bg-orange-100 text-orange-700',
    'CSS3': 'bg-purple-100 text-purple-700',
    'Tailwind': 'bg-teal-100 text-teal-700',
    'Tailwind CSS': 'bg-teal-100 text-teal-700',
    'Node.js': 'bg-green-100 text-green-700',
    'MongoDB': 'bg-green-100 text-green-700',
    'Firebase': 'bg-orange-100 text-orange-700',
    'PostgreSQL': 'bg-blue-100 text-blue-700',
    'Express': 'bg-gray-100 text-gray-700',
    'Redux': 'bg-purple-100 text-purple-700',
    'Bootstrap': 'bg-purple-100 text-purple-700',
    'Angular': 'bg-red-100 text-red-700',
    'GSAP': 'bg-green-100 text-green-700',
    'Chart.js': 'bg-blue-100 text-blue-700',
    'Framer Motion': 'bg-purple-100 text-purple-700',
  };

  return techColors[tech] || 'bg-gray-100 text-gray-700';
};

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = React.use(params);
  const { slug } = unwrappedParams;
  const [project, setProject] = useState<PortfolioItem | null>(null);
  const [allProjects, setAllProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  
  // Demo URL - if not in the response, can be added here
  const [demoUrl, setDemoUrl] = useState<string | null>(null);

  // Fetch all projects for navigation and current project data
  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        // Fetch all portfolio data
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/portfolio`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch portfolio data: ${response.status}`);
        }
        
        const data = await response.json();
        const portfolioItems = data.data || [];
        setAllProjects(portfolioItems);
        
        // Find the current project
        const foundProject = portfolioItems.find((item: PortfolioItem) => item.slug === slug);
        if (foundProject) {
          setProject(foundProject);
          
          // Set demo URL if project has a link
          if (foundProject.link) {
            setDemoUrl(foundProject.link);
          }
        } else {
          setError('Project not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching project data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // Handle navigation to a non-existent project
  if (!loading && (error || !project)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">{`The project you're looking for doesn't exist or has been moved.`}</p>
          <Link
            href="/#portfolio"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  if (loading || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Portfolio', href: '/#portfolio' },
    { label: project.title, current: true },
  ];

  return (
    <>
      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData items={breadcrumbItems} />
      
      <div className="bg-gray-50 min-h-screen pb-20 font-sans">
        {/* Hero Section with Floating Navigation */}
        <div className="relative">
          {/* Hero Image */}
          <div className="h-[60vh] lg:h-[70vh] w-full relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
            <Image
              src={project.image}
              alt={project.title}
              className="object-cover object-center"
              fill
              priority
              sizes="100vw"
            />

            {/* Back Button */}
            <div className="absolute top-8 left-8 z-20">
              <Link
                href="/#portfolio"
                className="flex items-center gap-2 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Portfolio</span>
              </Link>
            </div>
            
            {/* Visit Website Button (Hero) */}
            {demoUrl && (
              <div className="absolute top-8 right-8 z-20">
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 shadow-lg"
                >
                  <Globe className="w-4 h-4" />
                  <span>Visit Website</span>
                </a>
              </div>
            )}

            {/* Project info overlay */}
            <div className="absolute bottom-0 left-0 w-full z-20 px-4 sm:px-8 md:px-16 pb-8 md:pb-12">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                    {project.category}
                  </span>
                  {project.year && (
                    <span className="px-3 py-1 bg-gray-700 text-white text-xs font-medium rounded-full flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {project.year}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                  {project.title}
                </h1>

                <p className="text-white/90 text-lg md:text-xl max-w-3xl">
                  {project.description?.split('.')[0]}
                </p>
                
                {/* CTA Button in Hero Section */}
                {demoUrl && (
                  <div className="mt-6">
                    <a
                      href={demoUrl}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:-translate-y-1"
                    >
                      <Globe className="w-5 h-5 mr-2" />
                      Explore Live Project
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Floating Navigation Bar */}
          <div className="sticky top-0 z-30 w-full bg-white shadow-md transform translate-y-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between py-4">
                <h2 className="text-xl font-bold text-gray-800 truncate">{project.title}</h2>

                <div className="flex items-center gap-4">
                  {demoUrl && (
                    <a
                      href={demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="hidden sm:inline">Visit Website</span>
                    </a>
                  )}

                  <Link
                    href="/#portfolio"
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Back to Portfolio</span>
                  </Link>

                  {project.nextProjectSlug && (
                    <Link
                      href={`/projects/${project.nextProjectSlug}`}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <span className="hidden sm:inline">Next Project</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Content - Main Project Info */}
            <div className="lg:col-span-2">
              {/* Project Overview */}
              <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Bookmark className="w-6 h-6 mr-3 text-blue-600" />
                  Project Overview
                </h3>

                <div className="prose prose-blue max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Key Achievement */}
                  {project.highlight && (
                    <div className="mb-6">
                      <h4 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                        <Trophy className="w-5 h-5 mr-2 text-amber-500" />
                        Key Achievement
                      </h4>
                      <div className="bg-amber-50 border-l-4 border-amber-500 px-4 py-3 rounded-r-md">
                        <p className="text-amber-700">
                          {project.highlight}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Visit Project CTA - Within Overview */}
                {demoUrl && (
                  <div className="mt-8 flex justify-start">
                    <a
                      href={demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-medium transition-colors border border-blue-200"
                    >
                      <Globe className="w-5 h-5" />
                      Visit the Live Project
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                )}
              </div>

              {/* Key Features Section */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <Star className="w-6 h-6 mr-3 text-blue-600" />
                    Key Features
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    {project.keyFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-start group">
                        <div className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0 
                                     group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Gallery (if available) */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <Palette className="w-6 h-6 mr-3 text-blue-600" />
                    Project Gallery
                  </h3>

                  {/* Main Image */}
                  <div className="mb-4 rounded-xl overflow-hidden relative aspect-video">
                    <Image
                      src={project.gallery[activeImage]}
                      alt={`${project.title} gallery image ${activeImage + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>

                  {/* Thumbnails */}
                  <div className="grid grid-cols-3 gap-3">
                    {project.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`rounded-lg overflow-hidden border-2 transition-all relative h-24 ${
                          activeImage === idx
                            ? 'border-blue-600 shadow-md'
                            : 'border-transparent hover:border-blue-400'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 33vw, 200px"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenge & Solution (if available) */}
              {project.challenges && project.solutions && (
                <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <Layers className="w-6 h-6 mr-3 text-blue-600" />
                    Challenges & Solutions
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Challenges */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Code className="w-5 h-5 mr-2 text-red-500" />
                        Challenges
                      </h4>
                      <ul className="space-y-3">
                        {project.challenges.map((challenge, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="bg-red-100 text-red-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                              {idx + 1}
                            </span>
                            <span className="text-gray-700">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Solutions */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Monitor className="w-5 h-5 mr-2 text-green-500" />
                        Solutions
                      </h4>
                      <ul className="space-y-3">
                        {project.solutions.map((solution, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="bg-green-100 text-green-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                              {idx + 1}
                            </span>
                            <span className="text-gray-700">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Testimonial (if available) */}
              {project.testimonial && (
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-md p-6 md:p-8 mb-8 text-white">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <MessageSquare className="w-6 h-6 mr-3" />
                    Client Testimonial
                  </h3>

                  <div className="relative">
                    {/* Quote marks */}
                    <div className="absolute -top-2 -left-2 text-6xl text-white/20">&ldquo;</div>
                    <div className="absolute -bottom-10 -right-2 text-6xl text-white/20">&rdquo;</div>

                    <blockquote className="relative z-10 text-lg md:text-xl italic mb-6 pl-4">
                      {project.testimonial.text}
                    </blockquote>

                    <div className="flex items-center mt-4">
                      <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold">{project.testimonial.author}</div>
                        <div className="text-white/80 text-sm">{project.testimonial.position}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar - Project Details */}
            <div className="lg:col-span-1">
              {/* Project Details Card */}
              <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8 sticky top-24">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Layout className="w-6 h-6 mr-3 text-blue-600" />
                  Project Details
                </h3>

                {/* Role */}
                {project.role && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">My Role</h4>
                    <div className="flex items-center">
                      <Briefcase className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-gray-800 font-medium">
                        {project.role}
                      </span>
                    </div>
                  </div>
                )}

                {/* Timeline */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Timeline</h4>
                  <div className="flex flex-col gap-3">
                    {project.year && (
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-gray-800">
                          {project.year}
                        </span>
                      </div>
                    )}
                    {project.duration && (
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-gray-800">
                          {project.duration}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Live Project URL */}
                {demoUrl && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Project URL</h4>
                    <div className="flex items-center">
                      <Link2 className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                      <a 
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium truncate"
                      >
                        {demoUrl.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  </div>
                )}

                {/* Technologies */}
                {project.technologies && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-sm ${getTechColor(tech)}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Highlight in Sidebar */}
                {project.highlight && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Key Highlight</h4>
                    <div className="flex items-center bg-amber-50 p-3 rounded-lg">
                      <Zap className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                      <span className="text-amber-700 font-medium">
                        {project.highlight}
                      </span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-6 border-t border-gray-100">
                  {demoUrl && (
                    <a
                      href={demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mb-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors text-center flex items-center justify-center"
                    >
                      Visit Live Project
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  )}

                  <Link
                    href="/#portfolio"
                    className="block w-full mb-3 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors text-center"
                  >
                    Back to Portfolio
                  </Link>

                  {/* Share Links */}
                  <div className="text-center">
                    <button className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                      <Share2 className="w-4 h-4 mr-1" />
                      <span className="text-sm">Share this project</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Project Navigation */}
          {project.nextProject && project.nextProjectSlug && (
            <div className="mt-8">
              <Link
                href={`/projects/${project.nextProjectSlug}`}
                className="block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-1/3 h-48 md:h-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-indigo-600/80 z-10"></div>
                    {allProjects.find(p => p.slug === project.nextProjectSlug)?.image && (
                      <Image
                        src={allProjects.find(p => p.slug === project.nextProjectSlug)?.image || ''}
                        alt={project.nextProject}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                  </div>

                  <div className="w-full md:w-2/3 p-6 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-blue-600 font-medium mb-1">Next Project</div>
                      <h3 className="text-xl font-bold text-gray-800">{project.nextProject}</h3>
                    </div>

                    <div className="bg-blue-100 rounded-full p-3 text-blue-700">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>

      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}