'use client'
import { MouseEvent, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X, Home, User, Briefcase, Image as ImageIcon, MessageSquare, Phone } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  
  // Update header height when it changes
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    
    // Initial calculation
    updateHeaderHeight();
    
    // Recalculate after a short delay to ensure accurate measurement
    const timeoutId = setTimeout(updateHeaderHeight, 100);
    
    // Add listeners for various events that might affect header height
    window.addEventListener('resize', updateHeaderHeight);
    window.addEventListener('load', updateHeaderHeight);
    
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      window.removeEventListener('load', updateHeaderHeight);
      clearTimeout(timeoutId);
    };
  }, [scrolled, isOpen]); // Recalculate when scrolled state or menu state changes
  
  // Handle scroll events to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Lock/unlock body scroll when mobile menu is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyle;
    }
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Home', href: '#home', icon: <Home className="w-4 h-4" /> },
    { name: 'About', href: '#about', icon: <User className="w-4 h-4" /> },
    { name: 'Experience', href: '#experience', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Portfolio', href: '#portfolio', icon: <ImageIcon className="w-4 h-4" /> },
    { name: 'Testimonials', href: '#testimonials', icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'Contact', href: '#contact', icon: <Phone className="w-4 h-4" /> },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    scrollToSection(href);
  };

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-white/80 backdrop-blur-md py-4'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#home" className="flex items-center" onClick={(e) => handleNavClick(e, '#home')}>
              <div className="relative h-10 w-auto">
                <Image 
                  src="https://res.cloudinary.com/du0tz73ma/image/upload/v1742113500/Group_2_unphpg.png" 
                  alt="Bahari Logo" 
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeSection === item.href.substring(1)
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {activeSection === item.href.substring(1) && (
                  <span className="absolute inset-0 rounded-full bg-blue-100 animate-pulse-slow"></span>
                )}
                <span className="relative">{item.name}</span>
              </a>
            ))}
            
            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="ml-4 px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-300 flex items-center"
            >
              Let&apos;s Talk
              <Phone className="ml-2 w-4 h-4" />
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-300 focus:outline-none"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      
      {/* Mobile Menu Panel - FIXED */}
      <div 
        className={`md:hidden fixed right-0 w-4/5 max-w-sm bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          top: `${Math.max(headerHeight, 60)}px`, /* Use fallback minimum height */
          height: `calc(100vh - ${Math.max(headerHeight, 60)}px)`,
          paddingTop: '1rem',
          overflowY: 'auto'
        }}
      >
        <div className="h-full flex flex-col">
          <div className="overflow-y-auto flex-grow px-6 py-6">
            <div className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`flex items-center py-3 px-4 rounded-lg transition-colors duration-300 ${
                    activeSection === item.href.substring(1)
                      ? 'bg-blue-100 text-blue-600'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className={`mr-3 ${activeSection === item.href.substring(1) ? 'text-blue-600' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Mobile CTA Button */}
          <div className="p-6 border-t border-gray-200">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="block w-full px-5 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-300 text-center"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
      
      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.2;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
          z-index: -1;
        }
      `}</style>
    </header>
  );
};