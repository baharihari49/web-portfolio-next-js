'use client'

import React, { useState, useEffect, useCallback } from "react";
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
  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, [testimonials.length]);

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
  }, [nextTestimonial]);

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
        
        <div className="max-w-4xl mx-auto">
          {/* Testimonials - Center */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative">
              {/* Navigation arrows */}
              <div className="absolute top-1/2 -left-4 md:-left-16 transform -translate-y-1/2">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
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

              {/* Navigation - right arrow */}
              <div className="absolute top-1/2 -right-4 md:-right-16 transform -translate-y-1/2">
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};