// ====== ABOUT SECTION WITH SCROLL ANIMATION ======
// File: components/About.tsx (Server Component)

import React from 'react';
import { ArrowRight, Download, ExternalLink, User, Briefcase } from 'lucide-react';
import Image from 'next/image';
import AboutAnimationClient from './AboutAnimationClient';

export const About = () => {
  const technologies = [
    { name: "React", color: "bg-blue-100 text-blue-700" },
    { name: "JavaScript", color: "bg-yellow-100 text-yellow-700" },
    { name: "TypeScript", color: "bg-blue-100 text-blue-600" },
    { name: "Laravel", color: "bg-red-100 text-red-600" },
    { name: "Vue.js", color: "bg-green-100 text-green-600" },
    { name: "Next.js", color: "bg-gray-100 text-gray-700" },
    { name: "Tailwind CSS", color: "bg-teal-100 text-teal-600" }
  ];

  const services = [
    { icon: <Briefcase className="w-5 h-5" />, title: "Professional Solutions" },
    { icon: <User className="w-5 h-5" />, title: "Web Design & Development" }
  ];

  return (
    <>
      {/* Global CSS for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }

          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }

          /* Animation classes that will be triggered by intersection observer */
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }

          .animate-fade-in-left {
            animation: fadeInLeft 0.8s ease-out forwards;
          }

          .animate-fade-in-right {
            animation: fadeInRight 0.8s ease-out forwards;
          }

          .animate-slide-in {
            animation: slideIn 0.6s ease-out forwards;
          }

          .animate-scale-in {
            animation: scaleIn 0.6s ease-out forwards;
          }

          .animate-pulse-slow {
            animation: pulse 3s ease-in-out infinite;
          }

          /* Stagger delays */
          .stagger-1 { animation-delay: 0.1s; }
          .stagger-2 { animation-delay: 0.2s; }
          .stagger-3 { animation-delay: 0.3s; }
          .stagger-4 { animation-delay: 0.4s; }
          .stagger-5 { animation-delay: 0.5s; }
          .stagger-6 { animation-delay: 0.6s; }
          .stagger-7 { animation-delay: 0.7s; }

          /* Initial states - hidden before animation */
          .animate-on-scroll {
            opacity: 0;
          }

          /* Hover effects */
          .tech-tag:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }

          .service-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          }

          .floating-badge {
            animation: pulse 2s ease-in-out infinite;
          }

          .image-container:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }

          .btn-shimmer {
            background: linear-gradient(90deg, #2563eb, #3b82f6, #2563eb);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }

          .btn-shimmer:hover {
            animation: shimmer 1s infinite;
          }

          .image-hover:hover img {
            transform: scale(1.05);
          }

          .gradient-line {
            background: linear-gradient(to bottom, #60a5fa, #2563eb);
            animation: pulse 3s ease-in-out infinite;
          }
        `
      }} />

      <section id="about" className="relative bg-gray-50 py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="animate-on-scroll" data-animation="animate-fade-in-up">
              <span className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
                <User className="w-4 h-4 mr-2" />
                About Me
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                About Me
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left: Image Section */}
            <div className="relative animate-on-scroll" data-animation="animate-fade-in-left" data-delay="300">
              <div className="relative bg-white rounded-3xl p-6 shadow-lg image-container transition-all duration-500">
                {/* Main Image */}
                <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden mb-4 image-hover">
                  <Image
                    src="https://res.cloudinary.com/du0tz73ma/image/upload/c_fill,w_500,h_712/v1733249983/IMG-20240331-WA0008_xebcsy.jpg"
                    alt="Bahari Dwi Setyo - Developer Working"
                    fill
                    className="object-cover object-center transition-transform duration-700"
                    quality={90}
                  />
                  {/* Image overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Years Experience Badge */}
                <div className="absolute top-10 right-10 bg-blue-600 text-white px-4 py-3 rounded-2xl text-center shadow-lg floating-badge">
                  <div className="text-xl font-bold">2.5+</div>
                  <div className="text-xs">Years</div>
                </div>

                {/* Animated Accent Line */}
                <div className="absolute right-0 top-20 bottom-20 w-1 rounded-full gradient-line"></div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-200 rounded-full animate-pulse-slow"></div>
                <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-300 rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
              </div>
            </div>

            {/* Right: Content Section */}
            <div className="space-y-6">
              
              {/* Icon Badge */}
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center animate-on-scroll" data-animation="animate-scale-in" data-delay="500">
                <User className="w-6 h-6 text-blue-600" />
              </div>

              {/* Main Heading */}
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 animate-on-scroll" data-animation="animate-slide-in" data-delay="600">
                I am a Passionate Developer
              </h3>

              {/* Subtitle */}
              <h4 className="text-xl font-semibold text-blue-600 animate-on-scroll" data-animation="animate-slide-in" data-delay="700">
                Professional Worker to Provide Solutions
              </h4>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-lg animate-on-scroll" data-animation="animate-slide-in" data-delay="800">
                As a dedicated Frontend Developer and Fullstack Developer, I focus on 
                crafting efficient, user-friendly, and visually appealing digital solutions. My 
                mission is to solve complex problems with clean code and innovative 
                designs, ensuring seamless user experiences that meet both functional and 
                aesthetic goals.
              </p>

              {/* Services */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-on-scroll" data-animation="animate-slide-in" data-delay="900">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm service-card transition-all duration-300">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {service.icon}
                    </div>
                    <span className="font-medium text-gray-700">{service.title}</span>
                  </div>
                ))}
              </div>

              {/* Technical Expertise */}
              <div className="animate-on-scroll" data-animation="animate-slide-in" data-delay="1000">
                <h5 className="text-lg font-bold text-gray-900 mb-4">Technical Expertise</h5>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium tech-tag transition-all duration-300 ${tech.color}`}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-on-scroll" data-animation="animate-slide-in" data-delay="1100">
                <a
                  href="/cv/bahari-cv.pdf"
                  download
                  className="inline-flex items-center justify-center px-8 py-4 btn-shimmer text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download CV
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
                
                <a
                  href="#portfolio"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-800 font-semibold rounded-lg shadow-lg border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  My Projects
                  <ExternalLink className="w-5 h-5 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-pulse-slow" style={{animationDelay: '2s'}}></div>

        {/* Client Component for Animation Logic */}
        <AboutAnimationClient />
      </section>
    </>
  );
};