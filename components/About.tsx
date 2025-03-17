'use client'
import React, { useEffect, useState } from 'react';
import { ArrowRight, User, Briefcase, Award, ExternalLink } from 'lucide-react';
import Image from 'next/image';

// About Component
export const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('about');
      if (element) {
        const position = element.getBoundingClientRect();
        // If section is in viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="about" className="py-20 md:py-32 bg-gradient-to-br from-indigo-50 to-blue-50 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-100 rounded-bl-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-100 rounded-tr-full opacity-30"></div>
      
      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-lg bg-indigo-200 opacity-20 transform rotate-45"></div>
      <div className="absolute bottom-20 right-10 w-20 h-20 rounded-full bg-blue-200 opacity-20"></div>
      <div className="absolute top-40 right-40 w-10 h-10 rounded-full bg-indigo-300 opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="text-indigo-600 font-medium">Who I Am</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 text-gray-800">
              About Me
            </h2>
            <div className="mt-3 h-1 w-20 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center">
          {/* Image container */}
          <div 
            className={`md:w-1/2 2xl:w-1/2 md:pr-12 mb-10 md:mb-0 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="relative">
              {/* Background decorations for image */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-indigo-600 rounded-3xl opacity-10"></div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-indigo-600 border-opacity-30 rounded-3xl"></div>
              
              <Image
                width={1000}
                height={1000}
                src="https://res.cloudinary.com/du0tz73ma/image/upload/c_fill,w_500,h_712/v1733249983/IMG-20240331-WA0008_xebcsy.jpg"
                alt="Bahari"
                className="relative z-10 rounded-3xl shadow-xl max-w-full h-auto object-cover w-80 md:w-[90%] transform transition-transform duration-500 hover:scale-[1.02]"
              />
              
              {/* Experience badge */}
              <div className="absolute -top-6 -right-6 bg-white shadow-lg rounded-full px-4 py-4 z-20">
                <div className="flex flex-col items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full text-white">
                  <span className="text-xl font-bold">3+</span>
                  <span className="text-xs">Years</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content container */}
          <div 
            className={`md:w-1/2 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-6">
                <User className="w-6 h-6" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">I am a Passionate Developer</h2>
              <h4 className="text-xl font-semibold mb-6 text-indigo-600">Professional Worker to Provide Solutions</h4>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                As a dedicated Frontend Developer and Fullstack Developer, I focus on crafting efficient,
                user-friendly, and visually appealing digital solutions. My mission is to solve complex
                problems with clean code and innovative designs, ensuring seamless user experiences that
                meet both functional and aesthetic goals.
              </p>
              
              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: <Briefcase className="w-5 h-5 text-indigo-600" />, text: 'Professional Solutions' },
                  { icon: <Award className="w-5 h-5 text-indigo-600" />, text: 'Web Design & Development' }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    <div className="mr-3">
                      {item.icon}
                    </div>
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
              
              {/* Skills section */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Technical Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {["React", "JavaScript", "TypeScript", "Laravel", "Vue.js", "Next.js", "Tailwind CSS"].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a
                  href="https://drive.google.com/drive/folders/1uVXfBm5S73BAMFCWwKxPHfF-zUBS3sqP?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 inline-flex items-center text-sm md:text-base"
                >
                  Download CV <ArrowRight size={18} className="ml-2" />
                </a>
                
                <a
                  href="#portfolio"
                  className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-full font-medium hover:bg-indigo-50 transition-colors duration-300 inline-flex items-center text-sm md:text-base"
                >
                  My Projects <ExternalLink size={18} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};