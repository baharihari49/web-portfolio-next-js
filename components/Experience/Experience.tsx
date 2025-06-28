// components/Experience/Experience.tsx (Server Component)
import React from 'react';
import { ExperienceItem } from '@/app/types/experience';
import ExperienceClient from './ExperienceClient';

// Server-side data fetching function
async function fetchExperiences(): Promise<ExperienceItem[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/experiences`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
        cache: 'force-cache'
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch experiences: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data.reverse() || [];
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
}

// Error Fallback Component
function ErrorFallback({ error }: { error: string }) {
  return (
    <section id="experience" className="relative py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      {/* Animated Background Blobs - matching Hero style */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-6 mx-auto w-fit">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Unable to load experience data
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Experience{' '}
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Unavailable
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            We encountered an issue loading the experience data. Please check your connection and try again.
          </p>
          
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
        </div>
      </div>
    </section>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <section id="experience" className="relative py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      {/* Animated Background Blobs - matching Hero style */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-6 mx-auto w-fit">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            No Experience Data
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Experience{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Coming Soon
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Professional experience information will be available here soon. Check back later for updates.
          </p>
        </div>
      </div>
    </section>
  );
}

// Main Server Component
const Experience: React.FC = async () => {
  // Fetch data on the server
  const experiences = await fetchExperiences();

  // Handle empty state
  if (experiences.length === 0) {
    return <EmptyState />;
  }

  return (
    <section id="experience" className="relative py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      {/* Animated Background Blobs - matching Hero style */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Code-like decoration elements - matching Hero */}
      <div className="absolute top-20 left-10 text-blue-200 opacity-10 text-4xl font-mono">
        &lt;Experience&gt;
      </div>
      <div className="absolute bottom-20 right-10 text-indigo-200 opacity-10 text-4xl font-mono">
        &lt;/Experience&gt;
      </div>
      <div className="absolute top-1/2 left-1/4 text-purple-200 opacity-10 text-2xl font-mono">
        const career = () =&gt; &#123;
      </div>
      <div className="absolute bottom-1/3 right-1/4 text-blue-200 opacity-10 text-2xl font-mono">
        &#125;;
      </div>

      {/* Background decorative elements - matching About style */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-pulse-slow animation-delay-2000"></div>
      <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-purple-100 rounded-full opacity-25 animate-pulse-slow animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Modern Header - matching Hero/About style */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          {/* Badge like Hero */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6 mx-auto w-fit">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
            Professional Journey
          </div>
          
          {/* Title with gradient - matching Hero style */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Work{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          
          {/* Subtitle - matching Hero/About style */}
          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            Explore my professional journey and the impactful solutions I've delivered throughout my career in technology and development.
          </p>
        </div>

        {/* Pass data to client component for interactivity */}
        <ExperienceClient experiences={experiences} />
      </div>
    </section>
  );
};

export default Experience;