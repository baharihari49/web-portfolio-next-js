import React from 'react';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import FAQSection from './FAQSection';
import MoreWaysToConnect from './MoreWaysToConnect';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200 rounded-full opacity-30 blur-3xl"></div>
        
        {/* Code patterns */}
        <div className="absolute top-10 left-10 text-blue-100 opacity-10 text-9xl font-mono">&lt;/&gt;</div>
        <div className="absolute bottom-10 right-10 text-indigo-100 opacity-10 text-9xl font-mono">{`{ }`}</div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-fit mx-auto px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">Let&apos;s Connect</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 inline-block text-transparent bg-clip-text">
            Get in Touch
          </h2>
          <p className="text-gray-600 text-lg">
            Have a project in mind or want to explore possibilities? I&apos;m here to help bring your ideas to life.
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Main contact card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Contact Information - Left side */}
              <ContactInfo />
              
              {/* Form - Right side */}
              <ContactForm />
            </div>
          </div>
          
          {/* FAQ Section */}
          <FAQSection />
          
          {/* More ways to connect */}
          <MoreWaysToConnect />
        </div>
      </div>
    </section>
  );
};