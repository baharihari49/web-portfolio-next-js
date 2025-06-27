// page.tsx or BahariPortfolio.tsx (Server Component)
import React from 'react';
import { Header } from '../components/Header';
import { About } from '../components/About';
import Experience from '../components/Experience';
import Portfolio from '@/components/Portfolio';
import { CTA } from '../components/CTA';
import { Stats } from '../components/Stats';
import { Testimonials } from '../components/Testimonials';
import { Contact } from '../components/Contact/Contact';
import { Footer } from '../components/Footer';
import TechStack from '../components/TechStack';
import BlogSection from '@/components/blogSection/BlogSection'; // Server component
import ScrollProvider from '@/components/ScrollProvider'; // Client component for scroll logic
import CustomStyles from '@/components/CustomStyles'; // Client component for styles
import { Hero } from '@/components/hero/Hero';

// Main Server Component
const BahariPortfolio = async () => {
  return (
    <div className="text-gray-900 antialiased bg-gray-50">
      <CustomStyles />
      <ScrollProvider>
        <Header />
        <Hero />
        <About />
        <Experience />
        <Portfolio />
        <TechStack />
        <CTA />
        <Stats />
        <Testimonials />
        <Contact />
        <BlogSection /> {/* Server component */}
        <Footer />
      </ScrollProvider>
    </div>
  );
};

export default BahariPortfolio;