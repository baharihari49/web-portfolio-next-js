'use client';

import React from 'react';
import Head from 'next/head';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const PrivacyPolicy: React.FC = () => {
    return (
        <>
            <Head>
                <title>Privacy Policy - baharihari.com</title>
                <meta name="description" content="Privacy Policy for baharihari.com - Learn what data is collected and how it's used." />
                <link rel="canonical" href="https://baharihari.com/privacy-policy" />
                <meta property="og:title" content="Privacy Policy - baharihari.com" />
                <meta property="og:description" content="Privacy Policy for baharihari.com - Learn what data is collected and how it's used." />
                <meta property="og:url" content="https://baharihari.com/privacy-policy" />
                <meta property="og:type" content="website" />
            </Head>
            <Header activeSection={''} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative mt-20">
                {/* Document Header */}
                <div className="bg-blue-600 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 rounded-lg mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        Privacy Policy
                    </h1>
                    <div className="flex items-center text-blue-100 text-sm">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        Last Updated: May 28, 2025
                    </div>
                </div>

                {/* Introduction */}
                <div className="mb-6 sm:mb-8">
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        At <span className="text-blue-600 font-medium">baharihari.com</span>, we respect your privacy. This policy explains what data is collected and how we use it.
                    </p>
                </div>

                {/* Privacy Sections */}
                <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                    {/* Section 1 */}
                    <section>
                        <div className="flex items-center mb-3 sm:mb-4">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 text-blue-700 text-xs sm:text-sm font-semibold rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">1</div>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Data We Collect</h2>
                        </div>
                        <div className="ml-10 sm:ml-12 space-y-3 sm:space-y-4">
                            <p className="text-gray-700 leading-relaxed flex items-start text-sm sm:text-base">
                                <span className="text-gray-400 mr-2 sm:mr-3 mt-1">•</span>
                                <strong>Public TikTok Data</strong>: Public videos (thumbnails, captions, view counts) and profile information (username, avatar) retrieved through TikTok embed/API.
                            </p>
                            <p className="text-gray-700 leading-relaxed flex items-start text-sm sm:text-base">
                                <span className="text-gray-400 mr-2 sm:mr-3 mt-1">•</span>
                                <strong>Simple Cookies</strong>: To store display preferences (e.g., light/dark mode).
                            </p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <div className="flex items-center mb-3 sm:mb-4">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 text-green-700 text-xs sm:text-sm font-semibold rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">2</div>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">How We Use Data</h2>
                        </div>
                        <div className="ml-10 sm:ml-12 space-y-2 sm:space-y-3">
                            <p className="text-gray-700 leading-relaxed flex items-start text-sm sm:text-base">
                                <span className="text-gray-400 mr-2 sm:mr-3 mt-1">•</span>
                                <span>Displaying the TikTok Video Feed on the Site.</span>
                            </p>
                            <p className="text-gray-700 leading-relaxed flex items-start text-sm sm:text-base">
                                <span className="text-gray-400 mr-2 sm:mr-3 mt-1">•</span>
                                <span>Enhancing viewing experience with previews and direct links to TikTok.</span>
                            </p>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <div className="flex items-center mb-3 sm:mb-4">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-100 text-purple-700 text-xs sm:text-sm font-semibold rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">3</div>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Storage & Security</h2>
                        </div>
                        <div className="ml-10 sm:ml-12 space-y-2 sm:space-y-3">
                            <p className="text-gray-700 leading-relaxed flex items-start text-sm sm:text-base">
                                <span className="text-gray-400 mr-2 sm:mr-3 mt-1">•</span>
                                <span>We <strong>DO NOT</strong> store TikTok videos or metadata on our servers; everything is retrieved &ldquo;on-the-fly&rdquo; from TikTok.</span>
                            </p>
                            <p className="text-gray-700 leading-relaxed flex items-start text-sm sm:text-base">
                                <span className="text-gray-400 mr-2 sm:mr-3 mt-1">•</span>
                                <span>Cookies only store display preferences, not personal data.</span>
                            </p>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <div className="flex items-center mb-3 sm:mb-4">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-100 text-orange-700 text-xs sm:text-sm font-semibold rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">4</div>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Third-Party Services</h2>
                        </div>
                        <div className="ml-10 sm:ml-12 space-y-2 sm:space-y-3">
                            <p className="text-gray-700 leading-relaxed flex items-start text-sm sm:text-base">
                                <span className="text-gray-400 mr-2 sm:mr-3 mt-1">•</span>
                                <span><strong>TikTok Embed/API</strong>: Subject to TikTok&apos;s privacy policy (<a href="https://www.tiktok.com/legal/privacy-policy" className="text-blue-600 hover:text-blue-800 underline break-all" target="_blank" rel="noopener noreferrer">https://www.tiktok.com/legal/privacy-policy</a>).</span>
                            </p>
                            <p className="text-gray-700 leading-relaxed flex items-start text-sm sm:text-base">
                                <span className="text-gray-400 mr-2 sm:mr-3 mt-1">•</span>
                                <span><strong>Google Analytics</strong> (optional): For anonymous site usage statistics.</span>
                            </p>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <div className="flex items-center mb-3 sm:mb-4">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-100 text-red-700 text-xs sm:text-sm font-semibold rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">5</div>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Your Rights</h2>
                        </div>
                        <div className="ml-10 sm:ml-12 space-y-2 sm:space-y-3">
                            <p className="text-gray-700 leading-relaxed flex items-start text-sm sm:text-base">
                                <span className="text-gray-400 mr-2 sm:mr-3 mt-1">•</span>
                                <span>You can delete cookies through your browser settings.</span>
                            </p>
                            <p className="text-gray-700 leading-relaxed flex items-start text-sm sm:text-base break-all">
                                <span className="text-gray-400 mr-2 sm:mr-3 mt-1">•</span>
                                <span>For privacy inquiries, contact <a href="mailto:baharihari49@gmail.com" className="text-blue-600 hover:text-blue-800">baharihari49@gmail.com</a>.</span>
                            </p>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section className='mb-10'>
                        <div className="flex items-center mb-3 sm:mb-4">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">6</div>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Policy Updates</h2>
                        </div>
                        <div className="ml-10 sm:ml-12">
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                This policy may be updated at any time. The latest version will be displayed on this page.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;
