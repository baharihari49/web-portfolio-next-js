'use client'
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Experience } from '../components/Experience';
import { Portfolio } from '../components/Portpolio';
import { CTA } from '../components/CTA';
import { Stats } from '../components/Stats';
import { Testimonials } from '../components/Testimonials';
import { Contact } from '../components/Contact/Contact';
import { Footer } from '../components/Footer';
import { TechStack } from '@/components/TechStack';
import { useEmailJsInit } from '../lib/emailJs';

interface PortoProps {
  scrollToSection: (sectionId: string) => void;
}

// Data object for all content

// Custom Styles Component
const CustomStyles = () => (
  <style jsx>{`
    @keyframes blob {
      0% {
        transform: translate(0px, 0px) scale(1);
      }
      33% {
        transform: translate(30px, -50px) scale(1.1);
      }
      66% {
        transform: translate(-20px, 20px) scale(0.9);
      }
      100% {
        transform: translate(0px, 0px) scale(1);
      }
    }
    
    .animate-blob {
      animation: blob 7s infinite;
    }
    
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    
    .animation-delay-4000 {
      animation-delay: 4s;
    }
  `}</style>
);

// BackToTop Component
const BackToTop: React.FC<PortoProps> = ({ scrollToSection }) => {
  return (
    <a
      href="#home"
      onClick={(e) => {
        e.preventDefault();
        scrollToSection('#home');
      }}
      className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-40"
    >
      <ChevronDown className="transform rotate-180" size={24} />
    </a>
  );
};

// Main component that combines all the components
const BahariPortfolio = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 300;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEmailJsInit();

  return (
    <div className="text-gray-900 antialiased bg-gray-50">
      <CustomStyles />
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
      <About />
      <Experience />
      <Portfolio />
      <TechStack />
      <CTA />
      <Stats />
      <Testimonials />
      <Contact />
      <Footer />
      <BackToTop scrollToSection={scrollToSection} />
    </div>
  );
};

export default BahariPortfolio;