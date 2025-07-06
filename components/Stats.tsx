'use client'

import React, { useState, useEffect, useRef } from 'react';
import {
  Users, Award, Clock, CheckCircle, Zap, Code, Heart,
  TrendingUp, Target, Star, Briefcase, Coffee, Smile,
  ThumbsUp, ChevronUp, Info, ArrowRight
} from 'lucide-react';

import statsData from "@/app/data/stats.json"

interface StatItem {
  icon: string;
  number: string;
  text: string;
  description?: string;
  trend?: string;
  color?: string;
  suffix?: string;
}

interface StatsData {
  item: StatItem[];
}

interface AnimatedCounterProps {
  target: string;
  duration?: number;
  isDarkMode?: boolean;
}

export const Stats = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [counting, setCounting] = useState<boolean>(false);
  const [activeInfoIndex, setActiveInfoIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const scrollHandlerRef = useRef(false);
  const infoCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const setInfoCardRef = (el: HTMLDivElement | null, index: number) => {
    infoCardRefs.current[index] = el;
  };

  const stats = (statsData as StatsData).item

  // Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle scroll animations with throttling
  useEffect(() => {
    const checkVisibility = () => {
      const element = document.getElementById('stats-section');
      if (element) {
        const position = element.getBoundingClientRect();
        // If section is in viewport
        if (position.top < window.innerHeight * 0.8 && position.bottom >= 0) {
          setVisibleItems(Array.from({ length: stats.length }, (_, i) => i));
          if (!counting) {
            setCounting(true);
          }
        }
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
  }, [stats.length, counting]);

  // Close info card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeInfoIndex !== null) {
        const ref = infoCardRefs.current[activeInfoIndex];
        if (ref && !ref.contains(event.target as Node)) {
          setActiveInfoIndex(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeInfoIndex]);

  // Render the appropriate icon component based on icon string
  const renderIcon = (iconName: string) => {
    const iconProps = { className: "w-full h-full" };

    switch (iconName.toLowerCase()) {
      case 'users': return <Users {...iconProps} />;
      case 'award': return <Award {...iconProps} />;
      case 'clock': return <Clock {...iconProps} />;
      case 'check': return <CheckCircle {...iconProps} />;
      case 'zap': return <Zap {...iconProps} />;
      case 'code': return <Code {...iconProps} />;
      case 'heart': return <Heart {...iconProps} />;
      case 'trending': return <TrendingUp {...iconProps} />;
      case 'target': return <Target {...iconProps} />;
      case 'star': return <Star {...iconProps} />;
      case 'briefcase': return <Briefcase {...iconProps} />;
      case 'coffee': return <Coffee {...iconProps} />;
      case 'smile': return <Smile {...iconProps} />;
      case 'thumbsup': return <ThumbsUp {...iconProps} />;
      default: return <Award {...iconProps} />;
    }
  };

  // Define backgrounds for cards
  const cardStyles = [
    {
      background: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      hoverEffect: 'hover:from-blue-600 hover:to-indigo-700',
      iconBg: 'bg-blue-400/30',
      iconColor: 'text-white',
      darkMode: true
    },
    {
      background: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      hoverEffect: 'hover:from-emerald-600 hover:to-teal-700',
      iconBg: 'bg-emerald-400/30',
      iconColor: 'text-white',
      darkMode: true
    },
    {
      background: 'bg-gradient-to-br from-violet-500 to-purple-600',
      hoverEffect: 'hover:from-violet-600 hover:to-purple-700',
      iconBg: 'bg-violet-400/30',
      iconColor: 'text-white',
      darkMode: true
    },
    {
      background: 'bg-gradient-to-br from-amber-500 to-orange-600',
      hoverEffect: 'hover:from-amber-600 hover:to-orange-700',
      iconBg: 'bg-amber-400/30',
      iconColor: 'text-white',
      darkMode: true
    },
    // Light background styles
    {
      background: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      hoverEffect: 'hover:from-blue-100 hover:to-indigo-200',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-600',
      darkMode: false
    },
    {
      background: 'bg-gradient-to-br from-emerald-50 to-teal-100',
      hoverEffect: 'hover:from-emerald-100 hover:to-teal-200',
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-600',
      darkMode: false
    },
    {
      background: 'bg-gradient-to-br from-violet-50 to-purple-100',
      hoverEffect: 'hover:from-violet-100 hover:to-purple-200',
      iconBg: 'bg-violet-500/10',
      iconColor: 'text-violet-600',
      darkMode: false
    },
    {
      background: 'bg-gradient-to-br from-amber-50 to-orange-100',
      hoverEffect: 'hover:from-amber-100 hover:to-orange-200',
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-600',
      darkMode: false
    }
  ];

  // Counter animation for numbers
  const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ target, duration = 2000, isDarkMode = true }) => {
    const [count, setCount] = useState(0);

    // Parse the number from the string, handling cases like "10M+" or "95%"
    const parseTargetNumber = () => {
      const numericPart = target.replace(/[^0-9.]/g, '');
      return parseFloat(numericPart) || 0;
    };

    const targetNumber = parseTargetNumber();

    useEffect(() => {
      if (counting && targetNumber > 0) {
        let start = 0;
        const increment = targetNumber > 100
          ? Math.ceil(targetNumber / (duration / 16))
          : targetNumber / (duration / 16);

        const timer = setInterval(() => {
          start += increment;
          if (start >= targetNumber) {
            setCount(targetNumber);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, 16);

        return () => clearInterval(timer);
      }
    }, [targetNumber, duration]);

    // Get the non-numeric suffix (like "+", "%", etc.)
    const getSuffix = () => {
      const match = target.match(/[^0-9.]+/);
      return match ? match[0] : '';
    };

    // Format the number appropriately
    const formatNumber = (num: number) => {
      if (targetNumber >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
      } else if (targetNumber >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      } else if (Number.isInteger(targetNumber)) {
        return Math.round(num).toString();
      } else {
        return num.toFixed(1);
      }
    };

    return (
      <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        {counting ? formatNumber(count) : '0'}
        <span className={isDarkMode ? 'text-white/90' : 'text-gray-800/90'}>
          {getSuffix()}
        </span>
      </span>
    );
  };

  // Render trend indicator
  const renderTrend = (trend: string | undefined, isDarkMode: boolean) => {
    if (!trend) return null;

    const isPositive = !trend.includes('-');
    const trendColor = isDarkMode
      ? (isPositive ? 'text-green-300' : 'text-red-300')
      : (isPositive ? 'text-green-600' : 'text-red-600');

    return (
      <div className={`flex items-center text-sm font-medium ${trendColor}`}>
        {isPositive ? <ChevronUp className="w-4 h-4 mr-0.5" /> : <ChevronUp className="w-4 h-4 mr-0.5 rotate-180" />}
        {trend}
      </div>
    );
  };

  // Toggle info card visibility
  const toggleInfoCard = (index: number) => {
    setActiveInfoIndex(activeInfoIndex === index ? null : index);
  };

  return (
    <section id="stats-section" className="py-20 md:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-indigo-200 rounded-full opacity-30 blur-3xl"></div>

        {/* Code pattern */}
        <div className="absolute top-20 left-10 text-blue-100 opacity-10 text-9xl font-mono">&lt;/&gt;</div>
        <div className="absolute bottom-10 right-10 text-indigo-100 opacity-10 text-9xl font-mono">{`{ }`}</div>

        {/* Additional decorative elements - only render on client side */}
        {isMounted && (
          <>
            <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-indigo-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="mx-auto w-fit px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">By The Numbers</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 inline-block text-transparent bg-clip-text">
            Achievements & Impact
          </h2>
          <p className="text-gray-600 text-lg">
            Delivering measurable results and exceptional value that speak for themselves
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const style = cardStyles[index % cardStyles.length];
            const isDarkMode = style.darkMode;

            return (
              <div
                key={index}
                className={`relative rounded-2xl shadow-lg transform transition-all duration-500 
                  ${style.background} ${style.hoverEffect}
                  ${visibleItems.includes(index) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                  group hover:shadow-xl cursor-pointer`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => toggleInfoCard(index)}
              >
                {/* Card content */}
                <div className="p-8 text-center h-full flex flex-col items-center justify-center relative z-10">
                  {/* Icon container */}
                  <div className={`w-16 h-16 ${style.iconBg} rounded-full flex items-center justify-center mb-5 p-3.5 transition-transform duration-300 group-hover:scale-110`}>
                    <div className={style.iconColor}>
                      {renderIcon(stat.icon)}
                    </div>
                  </div>

                  {/* Number with animation */}
                  <h3 className="text-4xl md:text-5xl font-bold mb-2">
                    <AnimatedCounter target={stat.number} isDarkMode={isDarkMode} />
                  </h3>

                  {/* Trend indicator if available */}
                  {stat.trend && (
                    <div className="mb-2">
                      {renderTrend(stat.trend, isDarkMode)}
                    </div>
                  )}

                  {/* Description text */}
                  <p className={`font-medium ${isDarkMode ? 'text-white/90' : 'text-gray-700'} text-sm md:text-base`}>
                    {stat.text}
                  </p>

                  {/* Info button - only if description exists */}
                  {stat.description && (
                    <div className={`absolute top-3 right-3 p-1.5 rounded-full ${isDarkMode ? 'hover:bg-white/20' : 'hover:bg-gray-200'} transition-colors`}>
                      <Info className={`w-4 h-4 ${isDarkMode ? 'text-white/70' : 'text-gray-500'}`} />
                    </div>
                  )}

                  {/* Bottom accent line */}
                  <div className={`w-12 h-1 ${isDarkMode ? 'bg-white/30' : 'bg-blue-500/30'} rounded-full mt-5`}></div>
                </div>

                {/* Add subtle pattern overlay */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-10">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`grid-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
                  </svg>
                </div>

                {/* Info card - only appears when active */}
                {activeInfoIndex === index && stat.description && (
                  <div
                    ref={(el) => setInfoCardRef(el, index)}
                    className={`absolute top-full left-0 right-0 mt-2 z-20 p-4 rounded-xl shadow-xl 
                    ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
                    transform transition-all duration-300 opacity-100 scale-100`}
                  >
                    <div className="text-left">
                      <h4 className="font-bold mb-2 text-lg flex items-center">
                        {renderIcon(stat.icon)}
                        <span className="ml-2">{stat.text}</span>
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {stat.description}
                      </p>
                      {stat.trend && (
                        <div className="mt-3 p-2 rounded-lg bg-opacity-10 bg-gray-800">
                          <div className="flex items-center justify-between">
                            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Performance trend:</span>
                            {renderTrend(stat.trend, isDarkMode)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Value proposition section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="p-8 md:p-10 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
              <h3 className="text-2xl font-bold mb-4">Why These Numbers Matter</h3>
              <p className="text-blue-100 mb-6">
                These statistics represent real results achieved for real clients. Behind each number is a story of challenges overcome and goals exceeded.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center px-4 py-2 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Discuss Your Project
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>

            <div className="col-span-2 p-8 md:p-10">
              <h3 className="text-xl font-bold text-gray-800 mb-4">How I Deliver Results</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Strategic Approach</h4>
                    <p className="text-sm text-gray-600">Solutions designed with your specific goals and audience in mind.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-teal-100 rounded-lg text-teal-600">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Technical Excellence</h4>
                    <p className="text-sm text-gray-600">Clean, efficient code that performs well and scales with your needs.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-purple-100 rounded-lg text-purple-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">User-Centered</h4>
                    <p className="text-sm text-gray-600">Focus on creating experiences that delight your users and customers.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-amber-100 rounded-lg text-amber-600">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Rapid Delivery</h4>
                    <p className="text-sm text-gray-600">Efficient processes to get your solutions to market quickly.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            Start a Project
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};