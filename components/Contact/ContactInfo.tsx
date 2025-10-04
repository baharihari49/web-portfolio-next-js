'use client'
import React from 'react';
import { 
  Mail, Phone, MapPin, Clock, Calendar, 
  ExternalLink, Github, Linkedin, Instagram, Twitter 
} from 'lucide-react';
import { useTimeAndAvailability } from './hooks/useTimeAndAvailability';

const ContactInfo: React.FC = () => {
  const { getLocalTime, availability } = useTimeAndAvailability();

  return (
    <div className="md:col-span-5 lg:col-span-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 lg:p-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full transform translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full transform -translate-x-20 translate-y-20"></div>
      
      <h3 className="text-2xl font-bold mb-8 relative">Contact Information</h3>
      
      <div className="space-y-8 relative z-10">
        {/* Email Contact */}
        <div className="flex items-start">
          <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4 shrink-0">
            <Mail className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm text-blue-100 mb-1">Email Me</h4>
            <a 
              href="mailto:hello@baharihari.com" 
              className="text-lg font-medium text-white hover:underline transition-all group flex items-center"
            >
              hello@baharihari.com
              <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
        
        {/* Phone Contact */}
        <div className="flex items-start">
          <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4 shrink-0">
            <Phone className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm text-blue-100 mb-1">Call Me</h4>
            <a 
              href="tel:6283184512580" 
              className="text-lg font-medium text-white hover:underline transition-all group flex items-center"
            >
              +62 (831) 8451 2580
              <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
        
        {/* Location info */}
        <div className="flex items-start">
          <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4 shrink-0">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm text-blue-100 mb-1">Location</h4>
            <p className="text-lg font-medium text-white">
              Jakarta, Indonesia
            </p>
          </div>
        </div>
        
        {/* Availability */}
        <div className="flex items-start">
          <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4 shrink-0">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm text-blue-100 mb-1">Local Time</h4>
            <div className="flex flex-col">
              <p className="text-lg font-medium text-white">
                {getLocalTime() || 'WIB (GMT+7)'}
              </p>
              <div className="flex items-center mt-1">
                <span className={`w-2.5 h-2.5 rounded-full mr-2 ${
                  availability.status === 'available' ? 'bg-green-400 animate-pulse' : 
                  availability.status === 'limited' ? 'bg-yellow-400' : 
                  'bg-gray-400'
                }`}></span>
                <span className="text-sm text-blue-100">{availability.text}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Social connect */}
      <div className="mt-12 pt-8 border-t border-white border-opacity-20">
        <h4 className="text-white text-sm mb-4">Connect with me</h4>
        <div className="flex space-x-3">
          <a 
            href="#" 
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all transform hover:scale-110 hover:shadow-lg"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a 
            href="#" 
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all transform hover:scale-110 hover:shadow-lg"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href="#" 
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all transform hover:scale-110 hover:shadow-lg"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="#" 
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all transform hover:scale-110 hover:shadow-lg"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
      
      {/* Response time commitment */}
      <div className="mt-12 p-4 bg-white bg-opacity-10 rounded-lg">
        <div className="flex items-center text-white mb-2">
          <Calendar className="w-5 h-5 mr-2 text-blue-600" />
          <h4 className="font-medium text-blue-600">Response Time</h4>
        </div>
        <p className="text-sm text-blue-600">
          I typically respond to all inquiries within 24 hours on business days.
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;