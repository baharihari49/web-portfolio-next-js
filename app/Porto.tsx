import React from 'react';
import { About } from '../components/About';
import Experience from '../components/Experience';
import Portfolio from '@/components/Portfolio';
import Gallery from '@/components/Gallery';
import { CTA } from '../components/CTA';
import { Stats } from '../components/Stats';
import { Testimonials } from '../components/Testimonials';
import { Contact } from '../components/Contact/Contact';
import { Footer } from '../components/Footer';
import TechStack from '../components/TechStack';
import BlogSection from '@/components/Blog';
import { PortfolioClient } from './PortfolioClient';
import { CustomStyles } from '../components/CustomStyles';

// Data object for all content


// Main component that combines all the components (Server Component)
const BahariPortfolio = () => {
  return (
    <div className="text-gray-900 antialiased bg-gray-50">
      <CustomStyles />
      <PortfolioClient>
        <About />
        <Experience />
        <Portfolio />
        <Gallery />
        <TechStack />
        <CTA />
        <Stats />
        <Testimonials />
        <Contact />
        <BlogSection />
        <Footer />
      </PortfolioClient>
    </div>
  );
};

export default BahariPortfolio;