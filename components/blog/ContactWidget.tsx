// components/blog/ContactWidget.tsx
import React, { JSX } from 'react';
import Link from 'next/link';

export default function ContactWidget(): JSX.Element {
  return (
    <div className="rounded-lg shadow-sm overflow-hidden animate-on-scroll opacity-0">
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 p-6 text-center">
        <div className="absolute inset-0 opacity-20 bg-pattern-dots"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-white mb-2">
            <a href="tel:+6283184512580" className="hover:underline">+62831 (8451) 2580</a>
          </h4>
          <h5 className="text-white/80 mb-6">
            <a href="mailto:baharihari49@gmail.com" className="hover:underline">baharihari49@gmail.com</a>
          </h5>
          <Link href="/contact">
            <button className="px-6 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors shadow-md">
              Contact us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}