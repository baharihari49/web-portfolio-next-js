import React from 'react';
import { ArrowRight, User, Briefcase, Award, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { AboutClient } from './AboutClient';

export const AboutServer = () => {
  const highlights = [
    {
      icon: <User size={24} />,
      title: "Passionate Developer",
      description: "Dedicated to creating elegant solutions and exceptional user experiences"
    },
    {
      icon: <Briefcase size={24} />,
      title: "Full Stack Expertise",
      description: "Proficient in both frontend and backend technologies for complete solutions"
    },
    {
      icon: <Award size={24} />,
      title: "Problem Solver",
      description: "Committed to tackling complex challenges with innovative approaches"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-6">
        <AboutClient>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              About Me
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate developer focused on creating impactful digital experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="relative">
              <div className="relative">
                <Image 
                  src="https://res.cloudinary.com/du0tz73ma/image/upload/v1700285770/photo1700277283_nqihef.jpg"
                  alt="Bahari - Professional Developer"
                  width={450}
                  height={550}
                  className="rounded-2xl shadow-2xl object-cover w-full"
                  priority
                />
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-blue-100 rounded-2xl -z-10"></div>
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-purple-100 rounded-2xl -z-10"></div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                Hi, I&apos;m Bahari
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                A dedicated Full Stack Developer with over 2.5 years of experience 
                crafting modern web applications. I specialize in transforming ideas 
                into elegant, functional solutions that deliver real value.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                My journey in tech has been driven by curiosity and a passion for 
                continuous learning. From frontend frameworks like React and Next.js 
                to backend technologies like Laravel and Node.js, I enjoy working 
                across the entire stack to build comprehensive solutions.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 gap-4 mt-8">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {highlight.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{highlight.title}</h4>
                      <p className="text-gray-600">{highlight.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <a 
                  href="#portfolio" 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View My Work
                  <ArrowRight className="ml-2" size={20} />
                </a>
                <a 
                  href="https://res.cloudinary.com/du0tz73ma/image/upload/v1733663290/CV-Bahari_compressed_1_c0xlwi.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
                >
                  Download Resume
                  <ExternalLink className="ml-2" size={20} />
                </a>
              </div>
            </div>
          </div>
        </AboutClient>
      </div>
    </section>
  );
};