'use client';

import React from 'react';
import Head from 'next/head';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const TermsOfService: React.FC = () => {
  return (
    <>
      <Head>
        <title>Terms of Service - baharihari.com</title>
        <meta name="description" content="Terms of Service for baharihari.com - Rules and guidelines for using the site." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://baharihari.com/terms-of-service" />
        <meta property="og:title" content="Terms of Service - baharihari.com" />
        <meta property="og:description" content="Terms of Service for baharihari.com - Rules and guidelines for using the site." />
        <meta property="og:url" content="https://baharihari.com/terms-of-service" />
        <meta property="og:type" content="website" />
      </Head>
      <Header activeSection={''} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative mt-20">
        {/* Document Header */}
        <div className="bg-blue-600 px-8 py-8 rounded-lg mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Terms of Service
          </h1>
          <div className="flex items-center text-blue-100 text-sm">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Last Updated: May 28, 2025
          </div>
        </div>

        {/* Introduction */}
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed text-base">
            Welcome to <span className="text-blue-600 font-medium">baharihari.com</span> (&ldquo;Site&rdquo;).
            By using this Site, you agree to be bound by the following Terms of Service:
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-10">
          {/* Section 1 */}
          <section>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full flex items-center justify-center mr-4 flex-shrink-0">1</div>
              <h2 className="text-xl font-bold text-gray-900">Services Provided</h2>
            </div>
            <div className="ml-12">
              <p className="text-gray-700 leading-relaxed">
                This Site displays the personal profile of <strong>Bahari</strong> (&ldquo;Owner&rdquo;) and includes a TikTok Video Feed section showing public videos from the TikTok account
                <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm mx-1">@housecoinhodl</code>
                via TikTok embed/API.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-100 text-green-700 text-sm font-semibold rounded-full flex items-center justify-center mr-4 flex-shrink-0">2</div>
              <h2 className="text-xl font-bold text-gray-900">Content Usage</h2>
            </div>
            <div className="ml-12 space-y-3">
              <p className="text-gray-700 leading-relaxed flex items-start">
                <span className="text-gray-400 mr-3 mt-1">•</span>
                All videos, thumbnails, and metadata (captions, view counts) are retrieved directly from TikTok.
              </p>
              <p className="text-gray-700 leading-relaxed flex items-start">
                <span className="text-gray-400 mr-3 mt-1">•</span>
                Visitors can preview and click to view the full video on TikTok.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full flex items-center justify-center mr-4 flex-shrink-0">3</div>
              <h2 className="text-xl font-bold text-gray-900">Copyright & Trademarks</h2>
            </div>
            <div className="ml-12 space-y-3">
              <p className="text-gray-700 leading-relaxed flex items-start">
                <span className="text-gray-400 mr-3 mt-1">•</span>
                All trademarks, copyrights, and video content remain the property of the original creators and TikTok, Inc.
              </p>
              <p className="text-gray-700 leading-relaxed flex items-start">
                <span className="text-gray-400 mr-3 mt-1">•</span>
                The Owner only re-displays (embeds) publicly available content in accordance with TikTok&apos;s policies.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-orange-100 text-orange-700 text-sm font-semibold rounded-full flex items-center justify-center mr-4 flex-shrink-0">4</div>
              <h2 className="text-xl font-bold text-gray-900">Restrictions</h2>
            </div>
            <div className="ml-12 space-y-3">
              <p className="text-gray-700 leading-relaxed flex items-start">
                <span className="text-gray-400 mr-3 mt-1">•</span>
                You may not copy, distribute, or modify video content without proper authorization.
              </p>
              <p className="text-gray-700 leading-relaxed flex items-start">
                <span className="text-gray-400 mr-3 mt-1">•</span>
                Excessive scraping outside of the official embed/API methods is prohibited.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-100 text-red-700 text-sm font-semibold rounded-full flex items-center justify-center mr-4 flex-shrink-0">5</div>
              <h2 className="text-xl font-bold text-gray-900">Disclaimer</h2>
            </div>
            <div className="ml-12 space-y-3">
              <p className="text-gray-700 leading-relaxed flex items-start">
                <span className="text-gray-400 mr-3 mt-1">•</span>
                The service is provided on an &ldquo;as is&rdquo; basis. The Owner does not guarantee uninterrupted availability since it depends on TikTok&apos;s platform.
              </p>
              <p className="text-gray-700 leading-relaxed flex items-start">
                <span className="text-gray-400 mr-3 mt-1">•</span>
                The Owner is not responsible for embedded content&mdash;please contact the content owner on TikTok for any concerns.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className='mb-10'>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full flex items-center justify-center mr-4 flex-shrink-0">6</div>
              <h2 className="text-xl font-bold text-gray-900">Changes to Terms</h2>
            </div>
            <div className="ml-12">
              <p className="text-gray-700 leading-relaxed">
                The Owner reserves the right to update these Terms at any time. The latest version will be posted on this page.
              </p>
            </div>
          </section>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default TermsOfService;