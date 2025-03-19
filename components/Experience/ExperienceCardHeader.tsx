import React from 'react';
import Image from 'next/image';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { ExperienceItem } from '@/app/types/experience';
import { getJobIcon, getJobTypeColor } from '@/app/utils/experienceUtils';

interface ExperienceCardHeaderProps {
  experience: ExperienceItem;
  isCompact?: boolean;
}

const ExperienceCardHeader: React.FC<ExperienceCardHeaderProps> = ({ 
  experience, 
  isCompact = false 
}) => {
  return (
    <div className={`${experience.current ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-white border-t-4 border-blue-600'} ${isCompact ? 'p-4' : 'p-6'}`}>
      <div className="flex items-start">
        {/* Company logo or job icon */}
        <div className={`rounded-lg mr-4 flex-shrink-0 ${
          experience.current ? 'bg-white bg-opacity-20' : 'bg-blue-100'
        } p-3`}>
          {experience.companyLogo ? (
            <div className={`relative ${isCompact ? 'w-6 h-6' : 'w-8 h-8'}`}>
              <Image 
                src={experience.companyLogo} 
                alt={experience.company || 'Company logo'} 
                fill
                sizes={isCompact ? "24px" : "32px"}
                className="object-contain"
              />
            </div>
          ) : (
            <div className={`${experience.current ? 'text-white' : 'text-blue-600'} ${isCompact ? 'w-6 h-6' : ''}`}>
              {getJobIcon(experience)}
            </div>
          )}
        </div>
        
        <div>
          <h3 className={`${isCompact ? 'text-lg' : 'text-xl'} font-bold ${experience.current ? 'text-white' : 'text-gray-800'} ${isCompact ? 'pr-8' : ''}`}>
            {experience.title}
          </h3>
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
            <div className={`flex items-center ${isCompact ? 'mr-4' : 'mr-6'} mb-2`}>
              <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
              <span>{experience.duration}</span>
            </div>
          )}
          {experience.location && (
            <div className={`flex items-center ${isCompact ? 'mr-4' : 'mr-6'} mb-2`}>
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
  );
};

export default ExperienceCardHeader;