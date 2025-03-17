import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Quote, MessageSquare } from 'lucide-react';
import testimoniData from "@/app/data/testimoni.json"

interface Testimonial {
  content: string;
  name: string;
  position: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialsData {
  item: Testimonial[];
}

// Testimonials Component
export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const testimonials = (testimoniData as TestimonialsData).item

  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('testimonials');
      if (element) {
        const position = element.getBoundingClientRect();
        // If section is in viewport
        if (position.top < window.innerHeight * 0.8 && position.bottom >= 0) {
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

  // Navigation for testimonials
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Auto-scroll testimonials at interval
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [currentIndex, testimonials.length, nextTestimonial]);

  // Default avatar if none provided
  const getAvatarUrl = (testimonial: Testimonial) => {
    return testimonial.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=0D8ABC&color=fff`;
  };

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-gradient-to-br from-indigo-700 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-indigo-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-2/3 right-1/2 w-64 h-64 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Decorative patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32">
            <Quote className="w-full h-full" />
          </div>
          <div className="absolute bottom-20 right-20 w-32 h-32 transform rotate-180">
            <Quote className="w-full h-full" />
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="inline-block">
            <span className="text-blue-200 font-medium">Client Feedback</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-white">
              What People Say About My Work
            </h2>
            <div className="h-1 w-20 bg-blue-300 mx-auto rounded-full"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Profile Image - Left side */}
          <div className={`lg:col-span-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative max-w-sm mx-auto">
              {/* Decorative elements around the image */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-indigo-600 rounded-3xl opacity-50 transform rotate-6"></div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-blue-300 border-opacity-30 rounded-3xl transform -rotate-2"></div>
              
              <div className="relative z-10 rounded-3xl shadow-2xl w-full overflow-hidden transform transition-transform duration-500 hover:scale-105">
                <Image
                  src="https://res.cloudinary.com/du0tz73ma/image/upload/c_fill,w_1734,h_2476/v1733605546/IMG-20240831-WA0026_zwhpex.jpg"
                  alt="Bahari"
                  width={1734}
                  height={2476}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              
              {/* Testimonial counts badge */}
              <div className="absolute -bottom-6 -right-6 bg-white text-indigo-700 px-4 py-2 rounded-full shadow-lg font-bold text-lg z-20 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                {testimonials.length}+ Reviews
              </div>
            </div>
            
            {/* Mobile version navigation - Only visible on mobile/tablet */}
            <div className="mt-8 flex justify-center space-x-4 lg:hidden">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-blue-600" />
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      idx === currentIndex ? 'bg-blue-300' : 'bg-white bg-opacity-30'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-blue-600" />
              </button>
            </div>
          </div>
          
          {/* Testimonials - Right side */}
          <div className={`lg:col-span-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative">
              {/* Desktop navigation arrows */}
              <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 hidden lg:block">
                <button
                  onClick={prevTestimonial}
                  className="w-14 h-14 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-blue-600" />
                </button>
              </div>
              
              <div className="bg-white text-gray-800 rounded-2xl p-8 md:p-10 shadow-2xl transform transition-all duration-500">
                <div className="flex justify-between items-start mb-6">
                  <div className="md:flex items-center">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-indigo-50 mr-4">
                      <Image
                        src={getAvatarUrl(testimonials[currentIndex])}
                        alt={testimonials[currentIndex].name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="pl-2 md:p-0">
                      <h4 className="text-xl font-bold text-gray-900">{testimonials[currentIndex].name}</h4>
                      <p className="text-indigo-600">{testimonials[currentIndex].position}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < (testimonials[currentIndex].rating || 5) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-indigo-200 opacity-50" />
                  <p className="text-lg md:text-xl leading-relaxed text-gray-700 pl-6">
                    {testimonials[currentIndex].content}
                  </p>
                </div>
                
                {/* Pagination indicators */}
                <div className="mt-8 flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    <span className="font-bold text-indigo-600">{currentIndex + 1}</span> of {testimonials.length}
                  </p>
                  
                  <div className="flex space-x-2">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          idx === currentIndex ? 'bg-indigo-600' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Additional testimonial preview - Desktop only */}
              <div className="hidden lg:block mt-6">
                <div className="bg-indigo-800 text-white rounded-2xl p-6 shadow-xl opacity-80 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => setCurrentIndex((currentIndex + 1) % testimonials.length)}>
                  <div className="flex items-center mb-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                      <Image
                        src={getAvatarUrl(testimonials[(currentIndex + 1) % testimonials.length])}
                        alt={testimonials[(currentIndex + 1) % testimonials.length].name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{testimonials[(currentIndex + 1) % testimonials.length].name}</h4>
                      <p className="text-blue-200 text-sm">{testimonials[(currentIndex + 1) % testimonials.length].position}</p>
                    </div>
                  </div>
                  <p className="text-blue-100 line-clamp-2">
                    &ldquo;{testimonials[(currentIndex + 1) % testimonials.length].content}&rdquo;
                  </p>
                </div>
              </div>
              
              {/* Desktop navigation - right arrow */}
              <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 hidden lg:block">
                <button
                  onClick={nextTestimonial}
                  className="w-14 h-14 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};