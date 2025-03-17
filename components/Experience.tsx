import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Briefcase, Calendar, MapPin, ChevronRight, 
  ExternalLink, Award, Star, Zap, Settings, Code, Users,
  ChevronDown, ChevronUp,
} from 'lucide-react';
import experincesData from "@/app/data/experience.json"

interface ExperienceItem {
  title: string;
  list: string[];
  company?: string;
  companyLogo?: string; // URL to company logo
  duration?: string;
  location?: string;
  skills?: string[]; // Skills/technologies used
  achievements?: string[]; // Key achievements
  current?: boolean; // Whether this is the current position
  type?: string // Type of employment
  link?: string; // Link to company website
}

interface ExperiencesData {
  item: ExperienceItem[];
}

// Experience Component
export const Experience = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'current' | 'previous'>('all');
  const [isMounted, setIsMounted] = useState(false);
  const scrollHandlerRef = useRef(false);


  const experiences = (experincesData as ExperiencesData).item
  
  // Set mounted state for client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Function to toggle expanded state of a job item
  const toggleExpand = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  
  // Handle scroll animations with throttling to improve performance
  useEffect(() => {
    const checkVisibility = () => {
      const elements = document.querySelectorAll('.experience-card');
      const newVisibleItems: number[] = [];
      
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.85) {
          newVisibleItems.push(index);
        }
      });
      
      if (newVisibleItems.length > visibleItems.length) {
        setVisibleItems(newVisibleItems);
      }
    };

    const handleScroll = () => {
      if (!scrollHandlerRef.current) {
        scrollHandlerRef.current = true;
        
        window.requestAnimationFrame(() => {
          checkVisibility();
          setTimeout(() => {
            scrollHandlerRef.current = false;
          }, 100);
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    setTimeout(checkVisibility, 200);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleItems.length]);
  
  // Filter experiences based on active tab
  const filteredExperiences = experiences.filter(exp => {
    if (activeTab === 'all') return true;
    if (activeTab === 'current') return exp.current;
    if (activeTab === 'previous') return !exp.current;
    return true;
  });
  
  // Job position icons based on title or type
  const getJobIcon = (experience: ExperienceItem) => {
    const title = experience.title.toLowerCase();
    
    if (title.includes('developer') || title.includes('engineer')) return <Code />;
    if (title.includes('manager') || title.includes('lead')) return <Users />;
    if (title.includes('designer')) return <Settings />;
    if (experience.type === 'freelance') return <Zap />;
    
    return <Briefcase />;
  };
  
  // Get a color class for the job type
  const getJobTypeColor = (type?: string) => {
    switch(type) {
      case 'fulltime': return 'bg-blue-600';
      case 'parttime': return 'bg-purple-600';
      case 'freelance': return 'bg-amber-600';
      case 'remote': return 'bg-emerald-600';
      default: return 'bg-blue-600';
    }
  };
  
  // Get a color for skill tags
  const getSkillColor = (skill: string) => {
    // Map common technologies/skills to colors
    const skillMap: Record<string, string> = {
      'React': 'bg-blue-100 text-blue-700',
      'JavaScript': 'bg-yellow-100 text-yellow-700',
      'TypeScript': 'bg-blue-100 text-blue-800',
      'Node.js': 'bg-green-100 text-green-700',
      'PHP': 'bg-indigo-100 text-indigo-700',
      'Laravel': 'bg-red-100 text-red-700',
      'UI/UX': 'bg-purple-100 text-purple-700',
      'HTML': 'bg-orange-100 text-orange-700',
      'CSS': 'bg-blue-100 text-blue-600',
      'Management': 'bg-gray-100 text-gray-700',
      'Leadership': 'bg-blue-100 text-blue-800',
      'Design': 'bg-pink-100 text-pink-700',
    };
    
    // Look for partial matches
    for (const [key, value] of Object.entries(skillMap)) {
      if (skill.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }
    
    // Default color
    return 'bg-gray-100 text-gray-700';
  };

  // Fixed dot positions (pre-calculated to avoid hydration mismatch)
  const timelineDots = [
    { top: '5%', left: '0px', delay: '0s' },
    { top: '10%', left: '2px', delay: '0.1s' },
    { top: '15%', left: '3px', delay: '0.2s' },
    { top: '20%', left: '2px', delay: '0.3s' },
    { top: '25%', left: '0px', delay: '0.4s' },
    { top: '30%', left: '-2px', delay: '0.5s' },
    { top: '35%', left: '-3px', delay: '0.6s' },
    { top: '40%', left: '-2px', delay: '0.7s' },
    { top: '45%', left: '0px', delay: '0.8s' },
    { top: '50%', left: '2px', delay: '0.9s' },
    { top: '55%', left: '3px', delay: '1.0s' },
    { top: '60%', left: '2px', delay: '1.1s' },
    { top: '65%', left: '0px', delay: '1.2s' },
    { top: '70%', left: '-2px', delay: '1.3s' },
    { top: '75%', left: '-3px', delay: '1.4s' },
    { top: '80%', left: '-2px', delay: '1.5s' },
    { top: '85%', left: '0px', delay: '1.6s' },
    { top: '90%', left: '2px', delay: '1.7s' },
    { top: '95%', left: '3px', delay: '1.8s' },
    { top: '100%', left: '2px', delay: '1.9s' }
  ];

  return (
    <section id="experience" className="py-20 md:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-indigo-200 rounded-full opacity-30 blur-3xl"></div>
        
        {/* Code patterns */}
        <div className="absolute top-10 left-10 text-blue-100 opacity-10 text-9xl font-mono">&lt;/&gt;</div>
        <div className="absolute bottom-10 right-10 text-indigo-100 opacity-10 text-9xl font-mono">{`{ }`}</div>
        
        {/* Timeline dots - decorative - Only render on client side to avoid hydration issues */}
        {isMounted && (
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 h-full">
            {timelineDots.map((dot, i) => (
              <div 
                key={i} 
                className="w-1 h-1 bg-blue-300 rounded-full absolute opacity-50"
                style={{ 
                  top: dot.top, 
                  left: dot.left,
                  animationDelay: dot.delay
                }}
              ></div>
            ))}
          </div>
        )}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="w-fit mx-auto px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">Professional Journey</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 inline-block text-transparent bg-clip-text">
            Work Experience
          </h2>
          <p className="text-gray-600 text-lg">
            Explore my professional journey and the impactful solutions I&apos;ve delivered throughout my career.
          </p>
        </div>
        
        {/* Filter tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-xl shadow-md inline-flex">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'all' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Experience
            </button>
            <button
              onClick={() => setActiveTab('current')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'current' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Current Position
            </button>
            <button
              onClick={() => setActiveTab('previous')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'previous' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Previous Roles
            </button>
          </div>
        </div>
        
        {/* Timeline for larger screens */}
        <div className="hidden lg:block relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-blue-200 via-indigo-300 to-blue-200 rounded-full"></div>
          
          {filteredExperiences.map((experience, index) => (
            <div 
              key={index}
              className={`relative flex items-stretch mb-16 experience-card transition-all duration-700 ${
                visibleItems.includes(index) 
                  ? 'opacity-100' 
                  : 'opacity-0 ' + (index % 2 === 0 ? '-translate-x-12' : 'translate-x-12')
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Timeline node */}
              <div className="absolute left-1/2 top-10 transform -translate-x-1/2 flex flex-col items-center">
                <div className={`w-6 h-6 ${experience.current ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gray-400'} rounded-full shadow-lg z-10 relative ${experience.current ? 'animate-pulse' : ''}`}>
                  {experience.current && (
                    <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-50"></div>
                  )}
                </div>
              </div>
              
              {/* Content card - alternating sides */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'mr-auto pr-12' : 'ml-auto pl-12'}`}>
                <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 ${
                  expandedItems.includes(index) ? 'shadow-xl' : 'hover:shadow-xl'
                }`}>
                  {/* Card header */}
                  <div className={`${experience.current ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-white border-t-4 border-blue-600'} p-6`}>
                    <div className="flex items-start">
                      {/* Company logo or job icon */}
                      <div className={`rounded-lg mr-4 flex-shrink-0 ${
                        experience.current ? 'bg-white bg-opacity-20' : 'bg-blue-100'
                      } p-3`}>
                        {experience.companyLogo ? (
                          <div className="relative w-8 h-8">
                            <Image 
                              src={experience.companyLogo} 
                              alt={experience.company || 'Company logo'} 
                              fill
                              sizes="32px"
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div className={experience.current ? 'text-white' : 'text-blue-600'}>
                            {getJobIcon(experience)}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h3 className={`text-xl font-bold ${experience.current ? 'text-white' : 'text-gray-800'}`}>{experience.title}</h3>
                        {experience.company && (
                          <div className="flex items-center">
                            <p className={`font-medium ${experience.current ? 'text-blue-100' : 'text-blue-600'}`}>
                              {experience.company}
                            </p>
                            {experience.link && (
                              <a 
                                href={experience.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`ml-2 transition-colors ${experience.current ? 'text-blue-100 hover:text-white' : 'text-blue-500 hover:text-blue-700'}`}
                              >
                                <ExternalLink size={14} />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Duration and location */}
                    {(experience.duration || experience.location || experience.type) && (
                      <div className={`flex flex-wrap mt-4 text-sm ${experience.current ? 'text-blue-100' : 'text-gray-500'}`}>
                        {experience.duration && (
                          <div className="flex items-center mr-6 mb-2">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{experience.duration}</span>
                          </div>
                        )}
                        {experience.location && (
                          <div className="flex items-center mr-6 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{experience.location}</span>
                          </div>
                        )}
                        {experience.type && (
                          <div className="flex items-center mb-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs text-white ${getJobTypeColor(experience.type)}`}>
                              {experience.type.charAt(0).toUpperCase() + experience.type.slice(1)}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Card body */}
                  <div className="px-6 pt-4 pb-2">
                    {/* Responsibilities */}
                    <div className={`${expandedItems.includes(index) ? '' : 'max-h-[150px] overflow-hidden relative'}`}>
                      <ul className="space-y-3 mb-6">
                        {experience.list.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <ChevronRight className="w-4 h-4 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Skills */}
                      {experience.skills && experience.skills.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center">
                            <Code className="w-4 h-4 mr-1" /> SKILLS & TECHNOLOGIES
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {experience.skills.map((skill, idx) => (
                              <span 
                                key={idx}
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillColor(skill)}`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Key achievements */}
                      {experience.achievements && experience.achievements.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center">
                            <Award className="w-4 h-4 mr-1" /> KEY ACHIEVEMENTS
                          </h4>
                          <div className="space-y-2">
                            {experience.achievements.map((achievement, idx) => (
                              <div key={idx} className="flex items-start p-2 bg-amber-50 border-l-2 border-amber-500 rounded-r-md">
                                <Star className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
                                <p className="text-sm text-amber-700">{achievement}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Fade overlay when collapsed */}
                      {!expandedItems.includes(index) && (
                        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
                      )}
                    </div>
                  </div>
                  
                  {/* Card footer */}
                  <div className="px-6 pb-5 pt-1 border-t border-gray-100 flex justify-between">
                    <button
                      onClick={() => toggleExpand(index)}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors"
                    >
                      {expandedItems.includes(index) ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-1" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-1" />
                          Show More
                        </>
                      )}
                    </button>
                    
                    <div>
                      {experience.link && (
                        <a 
                          href={experience.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 ml-4"
                        >
                          Visit Website
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Vertical timeline for smaller screens (mobile and tablet) */}
        <div className="lg:hidden relative">
          <div className="absolute left-6 top-0 h-full w-1 bg-gradient-to-b from-blue-200 via-indigo-300 to-blue-200 rounded-full"></div>
          
          {filteredExperiences.map((experience, index) => (
            <div 
              key={index}
              className={`relative pl-16 mb-12 experience-card transition-all duration-700 ${
                visibleItems.includes(index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Timeline node */}
              <div className="absolute left-6 top-10 transform -translate-x-1/2 flex flex-col items-center">
                <div className={`w-6 h-6 ${experience.current ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gray-400'} rounded-full shadow-lg z-10 relative ${experience.current ? 'animate-pulse' : ''}`}>
                  {experience.current && (
                    <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-50"></div>
                  )}
                </div>
              </div>
              
              <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 ${
                expandedItems.includes(index) ? 'shadow-xl' : 'hover:shadow-xl'
              }`}>
                {/* Card header */}
                <div className={`${experience.current ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-white border-t-4 border-blue-600'} p-4`}>
                  <div className="flex items-start">
                    {/* Company logo or job icon */}
                    <div className={`rounded-lg mr-4 flex-shrink-0 ${
                      experience.current ? 'bg-white bg-opacity-20' : 'bg-blue-100'
                    } p-3`}>
                      {experience.companyLogo ? (
                        <div className="relative w-6 h-6">
                          <Image 
                            src={experience.companyLogo} 
                            alt={experience.company || 'Company logo'} 
                            fill
                            sizes="24px"
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className={`${experience.current ? 'text-white' : 'text-blue-600'} w-6 h-6`}>
                          {getJobIcon(experience)}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className={`text-lg font-bold ${experience.current ? 'text-white' : 'text-gray-800'} pr-8`}>{experience.title}</h3>
                      {experience.company && (
                        <div className="flex items-center">
                          <p className={`font-medium ${experience.current ? 'text-blue-100' : 'text-blue-600'}`}>
                            {experience.company}
                          </p>
                          {experience.link && (
                            <a 
                              href={experience.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={`ml-2 transition-colors ${experience.current ? 'text-blue-100 hover:text-white' : 'text-blue-500 hover:text-blue-700'}`}
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Duration and location */}
                  {(experience.duration || experience.location || experience.type) && (
                    <div className={`flex flex-wrap mt-4 text-sm ${experience.current ? 'text-blue-100' : 'text-gray-500'}`}>
                      {experience.duration && (
                        <div className="flex items-center mr-4 mb-2">
                          <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                          <span>{experience.duration}</span>
                        </div>
                      )}
                      {experience.location && (
                        <div className="flex items-center mr-4 mb-2">
                          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                          <span>{experience.location}</span>
                        </div>
                      )}
                      {experience.type && (
                        <div className="flex items-center mb-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs text-white ${getJobTypeColor(experience.type)}`}>
                            {experience.type.charAt(0).toUpperCase() + experience.type.slice(1)}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Card body */}
                <div className="px-4 pt-4 pb-2">
                  {/* Responsibilities */}
                  <div className={`${expandedItems.includes(index) ? '' : 'max-h-[150px] overflow-hidden relative'}`}>
                    <ul className="space-y-3 mb-6">
                      {experience.list.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Skills */}
                    {experience.skills && experience.skills.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center">
                          <Code className="w-4 h-4 mr-1" /> SKILLS & TECHNOLOGIES
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.skills.map((skill, idx) => (
                            <span 
                              key={idx}
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillColor(skill)}`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Key achievements */}
                    {experience.achievements && experience.achievements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center">
                          <Award className="w-4 h-4 mr-1" /> KEY ACHIEVEMENTS
                        </h4>
                        <div className="space-y-2">
                          {experience.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-start p-2 bg-amber-50 border-l-2 border-amber-500 rounded-r-md">
                              <Star className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
                              <p className="text-sm text-amber-700">{achievement}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Fade overlay when collapsed */}
                    {!expandedItems.includes(index) && (
                      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
                    )}
                  </div>
                </div>
                
                {/* Card footer */}
                <div className="px-4 pb-5 pt-1 border-t border-gray-100 flex flex-wrap justify-between">
                  <button
                    onClick={() => toggleExpand(index)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors mb-2"
                  >
                    {expandedItems.includes(index) ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        Show More
                      </>
                    )}
                  </button>
                  
                  <div>
                    {experience.link && (
                      <a 
                        href={experience.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        Visit Website
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional decorative elements */}
        <div className="absolute -bottom-10 -right-20 w-80 h-80 bg-blue-600 opacity-5 rounded-full"></div>
        <div className="absolute top-1/3 -left-10 w-40 h-40 bg-indigo-600 opacity-5 rounded-full"></div>
      </div>
    </section>
  );
};