// ====== FIX HERO IMAGE SRC ======
// File: components/hero/Hero.tsx

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowDown, Code, Zap, ExternalLink, Mail } from 'lucide-react';
import { FiGithub } from "react-icons/fi";
import { LiaLinkedin } from "react-icons/lia";
import { FaInstagram } from "react-icons/fa";
import HeroClient from './HeroClient';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
      
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Wrap content dengan HeroClient untuk interaktivitas */}
      <HeroClient>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center justify-items-center w-full py-20">
            
            {/* Left Content - Centered text */}
            <div className="text-center lg:text-left flex flex-col justify-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6 mx-auto lg:mx-0 w-fit">
                <Code className="w-4 h-4 mr-2" />
                Available for new opportunities
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Hello! I'm{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Bahari
                </span>
              </h1>

              <h2 className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed">
                Full Stack Developer crafting digital experiences with{' '}
                <span className="text-blue-600 font-semibold">React</span>,{' '}
                <span className="text-purple-600 font-semibold">Laravel</span>, and{' '}
                <span className="text-green-600 font-semibold">Node.js</span>
              </h2>

              <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Passionate about creating robust web applications that solve real-world problems. 
                Let's build something amazing together!
              </p>

              {/* CTA Buttons - Centered */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Get In Touch
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>

                <a
                  href="#portfolio"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-800 font-semibold rounded-lg shadow-lg border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  View My Work
                  <ExternalLink className="w-5 h-5 ml-2" />
                </a>
              </div>

              {/* Social Links - Centered */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                <span className="text-gray-600 font-medium">Follow me:</span>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300 group"
                  >
                    <FiGithub className="w-5 h-5 text-gray-700 group-hover:text-gray-900" />
                  </a>
                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300 group"
                  >
                    <LiaLinkedin className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
                  </a>
                  <a
                    href="https://instagram.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300 group"
                  >
                    <FaInstagram className="w-5 h-5 text-pink-600 group-hover:text-pink-700" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Content - Centered image */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-80 h-96 mx-auto lg:w-96 lg:h-[28rem]">
                {/* Background blur effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                
                {/* Main image container - kotak dengan rounded corners */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50">
                  {/* ✅ UPDATE: Gunakan Cloudinary URL dengan aspect ratio kotak */}
                  <Image
                    src="https://res.cloudinary.com/du0tz73ma/image/upload/c_fill,w_2475,h_3420/v1733248656/IMG-20241110-WA0013_jwgzp5.jpg"
                    alt="Bahari Dwi Setyo - Full Stack Developer"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 320px, 384px"
                    priority
                    quality={90}
                  />
                  
                  {/* Overlay gradient untuk depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                </div>
                
                {/* Floating Badge - Experience */}
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-2xl text-sm font-semibold shadow-lg animate-bounce backdrop-blur-sm">
                  2.5+ Years
                </div>
                
                {/* Floating Badge - Projects */}
                <div className="absolute -bottom-3 -left-3 bg-green-400 text-green-900 px-4 py-2 rounded-2xl text-sm font-semibold shadow-lg animate-bounce animation-delay-2000 backdrop-blur-sm">
                  10+ Projects
                </div>
                
                {/* Modern geometric decorations */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-lg rotate-12 animate-pulse"></div>
                <div className="absolute bottom-16 right-4 w-6 h-6 bg-blue-400/30 rounded-md rotate-45 animate-pulse animation-delay-2000"></div>
              </div>

              {/* Modern floating elements */}
              <div className="absolute top-8 -left-8 w-24 h-6 bg-blue-200/60 rounded-full blur-lg animate-pulse"></div>
              <div className="absolute bottom-24 -right-6 w-16 h-16 bg-purple-200/40 rounded-2xl blur-lg animate-pulse animation-delay-4000"></div>
              <div className="absolute top-32 -right-4 w-12 h-12 bg-pink-200/50 rounded-xl blur-lg animate-pulse animation-delay-6000"></div>
            </div>

          </div>

          {/* Scroll Indicator - Fixed ke bottom viewport */}
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-50">
            <a
              href="#about"
              className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors duration-300 group"
            >
              <span className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors duration-300 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                Scroll to explore
              </span>
              <div className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-200/50">
                <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-0.5 transition-transform duration-300" />
              </div>
            </a>
          </div>

        </div>
      </HeroClient>
    </section>
  );
};

export default Hero;