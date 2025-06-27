'use client';
import React, { useState } from 'react';
import { HelpCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { faqData } from './data/faqData';

const FAQSection: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Toggle FAQ item
  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find quick answers to common questions about working with me
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqData.map((faq, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              onClick={() => toggleFaq(index)}
            >
              <span className="font-medium text-gray-800 flex items-center">
                <HelpCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                {faq.question}
              </span>
              <span className="text-gray-500 ml-4">
                {activeFaq === index ? 
                  <ChevronUp className="w-5 h-5" /> : 
                  <ChevronDown className="w-5 h-5" />
                }
              </span>
            </button>
            
            <div 
              className={`px-6 overflow-hidden transition-all duration-300 ${
                activeFaq === index ? 'max-h-96 pb-6' : 'max-h-0'
              }`}
            >
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;