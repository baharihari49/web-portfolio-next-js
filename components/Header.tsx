// ====== MODERN HEADER COMPONENT ======
// File: components/Header.tsx

'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, User, Briefcase, Code, Award, MessageSquare, Phone, FileText } from 'lucide-react';
import { useScroll } from '@/components/ScrollProvider';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  // Get scroll context
  const { activeSection, scrollToSection } = useScroll();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items dengan styling yang lebih modern
  const navItems = [
    { name: 'Home', href: '#home', icon: <Home className="w-4 h-4" /> },
    { name: 'About', href: '#about', icon: <User className="w-4 h-4" /> },
    { name: 'Experience', href: '#experience', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Portfolio', href: '#portfolio', icon: <Code className="w-4 h-4" /> },
    { name: 'Tech Stack', href: '#tech-stack', icon: <Award className="w-4 h-4" /> },
    { name: 'Blog', href: '/blog', icon: <FileText className="w-4 h-4" /> },
    { name: 'Testimonials', href: '#testimonials', icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'Contact', href: '#contact', icon: <Phone className="w-4 h-4" /> },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    // Handle external routes
    if (href.startsWith('/')) {
      window.location.href = href;
      return;
    }

    // Handle section navigation
    if (isHomePage && href.startsWith('#') && scrollToSection) {
      scrollToSection(href);
      return;
    }

    // Navigate to homepage with section
    if (!isHomePage && href.startsWith('#')) {
      window.location.href = '/' + href;
      return;
    }

    // Default fallback
    window.location.href = href;
  };

  // Render desktop navigation items
  const renderNavLink = (item: any, index: number) => {
    if (item.href === '/blog') {
      return (
        <Link
          key={index}
          href="/blog"
          className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${pathname === '/blog'
            ? 'bg-blue-100 text-blue-600'
            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          onClick={() => setIsOpen(false)}
        >
          {item.name}
        </Link>
      );
    }

    const isActive = isHomePage && activeSection === item.href.substring(1);
    return (
      <a
        key={index}
        href={item.href}
        onClick={(e) => handleNavClick(e, item.href)}
        className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 relative ${isActive
          ? 'bg-blue-100 text-blue-600'
          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
          }`}
      >
        {item.name}
      </a>
    );
  };

  // Render mobile navigation items
  const renderMobileNavLink = (item: any, index: number) => {
    if (item.href === '/blog') {
      return (
        <Link
          key={index}
          href="/blog"
          className={`flex items-center py-3 px-4 rounded-xl transition-colors duration-300 ${pathname === '/blog'
            ? 'bg-blue-100 text-blue-600'
            : 'hover:bg-gray-100 text-gray-700'
            }`}
          onClick={() => setIsOpen(false)}
        >
          <span className={`mr-3 ${pathname === '/blog' ? 'text-blue-600' : 'text-gray-400'}`}>
            {item.icon}
          </span>
          {item.name}
        </Link>
      );
    }

    const isActive = isHomePage && activeSection === item.href.substring(1);
    return (
      <a
        key={index}
        href={item.href}
        onClick={(e) => handleNavClick(e, item.href)}
        className={`flex items-center py-3 px-4 rounded-xl transition-colors duration-300 ${isActive
          ? 'bg-blue-100 text-blue-600'
          : 'hover:bg-gray-100 text-gray-700'
          }`}
      >
        <span className={`mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
          {item.icon}
        </span>
        {item.name}
      </a>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo - Modern gradient text */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
            >
              Bahari
            </Link>
          </div>

          {/* Desktop Navigation - Modern pill-style */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1 bg-gray-50/80 backdrop-blur-sm rounded-full px-2 py-2 border border-gray-200/50">
              {navItems.map((item, index) => renderNavLink(item, index))}
            </div>
          </div>

          {/* CTA Button - Modern style */}
          <div className="hidden md:block">
            <a
              href={isHomePage ? "#contact" : "/#contact"}
              onClick={(e) => handleNavClick(e, isHomePage ? "#contact" : "/#contact")}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Let's Talk
              <Phone className="ml-2 w-4 h-4" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Modern slide-down */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Mobile menu panel */}
            <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-6 space-y-2">
                  {navItems.map((item, index) => renderMobileNavLink(item, index))}
                  
                  {/* Mobile CTA */}
                  <div className="pt-4 border-t border-gray-100">
                    <a
                      href={isHomePage ? "#contact" : "/#contact"}
                      onClick={(e) => handleNavClick(e, isHomePage ? "#contact" : "/#contact")}
                      className="flex items-center justify-center w-full py-3 px-6 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all duration-300"
                    >
                      Let's Talk
                      <Phone className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;