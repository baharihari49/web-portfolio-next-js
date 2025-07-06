'use client'
import React, { useEffect, useState } from 'react';
import { ArrowRight, Github, Instagram, Linkedin, Calendar, Sparkles, Code, Layout } from 'lucide-react';

// CTA Component
export const CTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Handle scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('cta-section');
      if (element) {
        const position = element.getBoundingClientRect();
        // If section is in viewport
        if (position.top < window.innerHeight * 0.75 && position.bottom >= 0) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="cta-section" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-2/3 right-1/2 w-40 h-40 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Code-like decoration elements */}
        <div className="absolute top-20 left-10 text-white opacity-5 text-4xl font-mono">
          &lt;div class=&ldquo;collaboration&rdquo;&gt;
        </div>
        <div className="absolute bottom-20 right-10 text-white opacity-5 text-4xl font-mono">
          &lt;/div&gt;
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column: Main CTA content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative inline-flex items-center bg-white bg-opacity-20 rounded-full px-4 py-1 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300 mr-2" />
              <span className="text-indigo-700 text-sm font-medium">Available for new projects</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
              Let&apos;s create something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 italic">extraordinary</span> together
            </h2>
            
            <p className="text-blue-100 text-lg mb-8 max-w-xl">
              Transform your ideas into reality with innovative web solutions that blend creativity, usability, and cutting-edge technology.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              {/* Main CTA Button */}
              <a
                href="mailto:hello@baharihari.com"
                className="px-8 py-4 bg-white text-indigo-700 rounded-full font-medium hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center"
              >
                Let&apos;s Work Together <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              
              {/* Secondary CTA Button */}
              <a
                href="#contact"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white hover:bg-opacity-10 transition-all duration-300 inline-flex items-center"
              >
                Schedule a Call <Calendar className="ml-2 w-5 h-5" />
              </a>
            </div>
            
            {/* Social proof */}
            <div className="mb-6">
              <p className="text-blue-200 text-sm mb-2">Trusted by creative teams worldwide</p>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-indigo-700 flex items-center justify-center text-xs font-bold text-white">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 border-2 border-indigo-700 flex items-center justify-center text-xs font-bold text-white">
                  +10
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column: Features only */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl transform hover:shadow-2xl transition-all duration-300">
              <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-indigo-700 mb-6">Why Work With Me</h3>
                
                <div className="space-y-6">
                  {/* Service offerings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { icon: <Code className="w-5 h-5 text-white" />, title: "Clean Code", desc: "Well-structured and maintainable solutions" },
                      { icon: <Layout className="w-5 h-5 text-white" />, title: "Responsive Design", desc: "Perfect on all devices and screen sizes" },
                      { icon: <Sparkles className="w-5 h-5 text-white" />, title: "Creative Solutions", desc: "Innovative approaches to complex problems" },
                      { icon: <ArrowRight className="w-5 h-5 text-white" />, title: "Fast Delivery", desc: "Efficient development with on-time delivery" }
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center mr-4">
                          {feature.icon}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{feature.title}</p>
                          <p className="text-sm text-gray-600">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Connect with me */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 border-t border-gray-200">
                    <div className="mb-4 sm:mb-0">
                      <p className="text-gray-800 font-medium mb-1">Connect with me on social media</p>
                    </div>
                    <div className="flex space-x-3">
                      <a href="#" className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-700 transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-700 transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-700 transition-colors">
                        <Instagram className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};