// Hero.tsx (Server Component)
import React from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowDown, Code, Zap, ExternalLink, Mail } from 'lucide-react';
import { FiGithub } from "react-icons/fi";
import { LiaLinkedin } from "react-icons/lia";
import { FaInstagram } from "react-icons/fa";
import HeroClient from './HeroClient'; // Client component for animations

interface HeroProps {
  scrollToSection?: (sectionId: string) => void;
}

// Hero Server Component
export const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 md:pt-36 md:pb-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 right-1/2 w-40 h-40 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Code-like decoration elements */}
        <div className="absolute top-20 left-10 text-white opacity-5 text-4xl font-mono">
          &lt;div&gt;
        </div>
        <div className="absolute bottom-20 right-10 text-white opacity-5 text-4xl font-mono">
          &lt;/div&gt;
        </div>
        <div className="absolute top-1/2 left-1/4 text-white opacity-5 text-2xl font-mono">
          const Developer = () =&gt; &#123;
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-white opacity-5 text-2xl font-mono">
          &#125;;
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Content Section */}
          <HeroClient scrollToSection={scrollToSection}>
            <div className="md:w-3/5 md:pr-12">
              <div className="mb-8 md:mb-0 text-white">
                <div className="relative inline-block">
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-white"></span>
                  <h3 className="text-lg font-medium text-blue-100">Hello, I&apos;m Bahari</h3>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 leading-tight">
                  Frontend Developer & <span className="text-blue-200">Full Stack Web Dev</span>
                </h1>
                
                <p className="text-xl text-blue-100 mb-8 md:pr-10 max-w-2xl">
                  I&apos;m experienced in creating responsive web applications using modern technologies
                  like React, Vue.js, and Laravel.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <a
                    href="mailto:hello@baharihari.com"
                    className="px-8 py-4 bg-white text-indigo-600 rounded-full font-medium hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
                  >
                    Let&apos;s Talk <ArrowRight size={18} className="ml-2" />
                  </a>
                  
                  <button
                    onClick={() => scrollToSection?.('#portfolio')}
                    className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white hover:bg-opacity-10 transition-all duration-300 flex items-center"
                  >
                    View Work <ExternalLink size={18} className="ml-2" />
                  </button>
                </div>
                
                {/* Social links */}
                <div className="flex items-center space-x-4 mt-10">
                  <span className="text-blue-100 text-sm">Connect with me:</span>
                  <a 
                    href="https://github.com/baharihari49" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-colors"
                  >
                    <FiGithub className="w-5 h-5 text-white" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/bahari49/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-colors"
                  >
                    <LiaLinkedin className="w-6 h-6 text-white" />
                  </a>
                  <a 
                    href="https://www.instagram.com/bahar.iii1/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-colors"
                  >
                    <FaInstagram className="w-6 h-6 text-white" />
                  </a>
                  <a 
                    href="mailto:hello@baharihari.com" 
                    className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Image Section */}
            <div className="md:w-2/5 2xl:w-3/5 mt-12 md:mt-0 flex justify-center">
              <div className="relative max-w-sm">
                {/* Decorative elements around the image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400 to-purple-500 rounded-2xl transform rotate-3 scale-105 opacity-70"></div>
                <div className="absolute inset-0 border-2 border-white border-opacity-20 rounded-2xl transform -rotate-2 scale-95"></div>
                
                <div className="relative z-10 rounded-2xl shadow-2xl overflow-hidden md:w-96 2xl:w-[25rem] transform transition-transform duration-500 hover:scale-105">
                  <Image
                    src="https://res.cloudinary.com/du0tz73ma/image/upload/c_fill,w_2475,h_3420/v1733248656/IMG-20241110-WA0013_jwgzp5.jpg"
                    alt="Bahari"
                    width={2475}
                    height={3420}
                    priority
                    className="max-w-full w-80 md:w-full h-auto object-cover"
                  />
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-6 -right-6 bg-white text-indigo-600 px-4 py-2 rounded-full shadow-lg font-medium text-sm z-20 flex items-center">
                  <Code className="w-4 h-4 mr-2" />
                  Full Stack Dev
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white text-indigo-600 px-4 py-2 rounded-full shadow-lg font-medium text-sm z-20 flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  React Expert
                </div>
              </div>
            </div>
          </HeroClient>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-white text-sm mb-2 animate-bounce">Scroll Down</span>
        <ArrowDown className="w-5 h-5 text-white animate-bounce" />
      </div>
      
      {/* Straight line at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white"></div>
    </section>
  );
};