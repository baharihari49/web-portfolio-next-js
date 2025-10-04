import React from 'react';
import { Mail, Phone, Calendar } from 'lucide-react';

const MoreWaysToConnect: React.FC = () => {
  return (
    <div className="mt-16 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to start a conversation?</h3>
          <p className="text-gray-600">Choose the way that works best for you</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:hello@baharihari.com"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md flex items-center"
          >
            <Mail className="w-5 h-5 mr-2" />
            Email Me
          </a>
          
          <a
            href="https://wa.me/6283184512580"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm hover:shadow-md flex items-center"
          >
            <Phone className="w-5 h-5 mr-2" />
            WhatsApp
          </a>
          
          <a
            href="https://calendly.com" // Replace with your actual Calendly link
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md flex items-center"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule Call
          </a>
        </div>
      </div>
    </div>
  );
};

export default MoreWaysToConnect;