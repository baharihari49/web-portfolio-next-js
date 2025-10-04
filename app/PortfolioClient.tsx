'use client'
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { useEmailJsInit } from '../lib/emailJs';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';

interface PortfolioClientProps {
  children: React.ReactNode;
}

// BackToTop Component
const BackToTop: React.FC<{ scrollToSection: (sectionId: string) => void }> = ({ scrollToSection }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showButton) return null;

  return (
    <a
      href="#home"
      onClick={(e) => {
        e.preventDefault();
        scrollToSection('#home');
      }}
      className="fixed bottom-24 right-6 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-40"
    >
      <ChevronDown className="transform rotate-180" size={24} />
    </a>
  );
};

export const PortfolioClient: React.FC<PortfolioClientProps> = ({ children }) => {
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
    handleScroll(); // Call once on mount
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
    <>
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
      {children}
      <BackToTop scrollToSection={scrollToSection} />
      <FloatingWhatsApp 
        phoneNumber="+6283184512580" // Ganti dengan nomor WhatsApp Anda
        message="Hi Bahari! I'm interested in discussing a web development project with you. Are you available for a chat?"
        showAfter={3000}
      />
    </>
  );
};