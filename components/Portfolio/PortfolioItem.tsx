import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Eye, ExternalLink, Calendar, 
  Clock, Briefcase, Trophy, ArrowRight 
} from 'lucide-react';
import { PortfolioItem as PortfolioItemType } from '@/app/types/portfolio';
import { getTechColor } from '@/app/utils/portfolioUtils';

interface PortfolioItemProps {
  item: PortfolioItemType;
  index: number;
  isVisible: boolean;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ item, index, isVisible }) => {
  return (
    <div 
      className={`portfolio-item transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${(index % 3) * 150}ms` }}
    >
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 flex flex-col transform hover:-translate-y-1 h-full overflow-hidden">
        {/* Project Image with fixed aspect ratio container */}
        <div className="relative w-full pt-[56.25%]"> {/* 16:9 aspect ratio */}
          <div className="absolute inset-0">
            <Image
              src={item.image}
              alt={`${item.title} - ${item.category} project by Bahari, built with ${item.technologies?.slice(0, 3).join(', ') || 'modern technologies'}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority={index < 3}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAhEQACAQIEBwAAAAAAAAAAAAABAgMABAUGITESSUpRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLhI5AjpTjHeP/2Q=="
              loading={index < 3 ? 'eager' : 'lazy'}
            />
          </div>
          
          {/* Year badge */}
          {item.year && (
            <div className="absolute top-4 left-4 px-2 py-1 bg-black bg-opacity-70 rounded-md text-white text-xs font-medium flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {item.year}
            </div>
          )}
          
          {/* Category badge */}
          <div className="absolute top-4 right-4 px-2 py-1 bg-blue-600 rounded-md text-white text-xs font-medium">
            {item.category}
          </div>
          
          {/* Quick actions overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-0 hover:opacity-95 transition-opacity duration-300 flex items-end">
            <div className="p-4 w-full">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white truncate">{item.title}</h3>
                <div className="flex space-x-2">
                  <Link 
                    href={`/projects/${item.slug}`}
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-blue-700 hover:bg-blue-50 transition-colors shadow-md"
                    aria-label="View project details"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-blue-700 hover:bg-blue-50 transition-colors shadow-md"
                      aria-label="Visit project website"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Card content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-gray-800 truncate">{item.title}</h3>
            {item.duration && (
              <span className="text-xs text-gray-500 flex items-center whitespace-nowrap ml-2">
                <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                {item.duration}
              </span>
            )}
          </div>
          
          {/* Role */}
          {item.role && (
            <div className="mb-3 flex items-center">
              <Briefcase className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-600 truncate">{item.role}</span>
            </div>
          )}
          
          {/* Highlight */}
          {item.highlight && (
            <div className="mb-3 flex items-start">
              <Trophy className="w-4 h-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600 line-clamp-1">{item.highlight}</span>
            </div>
          )}
          
          {/* Description */}
          {item.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
          )}
          
          {/* Technologies */}
          {item.technologies && item.technologies.length > 0 && (
            <div className="mt-auto pt-3">
              <div className="flex flex-wrap gap-1.5">
                {item.technologies.slice(0, 3).map((tech, idx) => (
                  <span 
                    key={idx} 
                    className={`px-2 py-0.5 rounded-md text-xs font-medium ${getTechColor(tech)}`}
                  >
                    {tech}
                  </span>
                ))}
                {item.technologies.length > 3 && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                    +{item.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Card footer with view button */}
        <div className="px-5 pb-5 mt-auto">
          <Link
            href={`/projects/${item.slug}`}
            className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
          >
            View Details
            <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;