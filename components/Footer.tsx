// Footer Component
import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  Heart
} from 'lucide-react';
import Image from 'next/image';
import { FiGithub } from "react-icons/fi";
import { LiaLinkedin } from "react-icons/lia";
import { FaInstagram } from "react-icons/fa";

export const Footer = () => {
  const navigationLinks = [
    { name: 'Home', url: '#home' },
    { name: 'About', url: '#about' },
    { name: 'Experience', url: '#experience' },
    { name: 'Portfolio', url: '#portfolio' },
    { name: 'Contact', url: '#contact' },
  ];

  const services = [
    'Web Development',
    'UI/UX Design',
    'Frontend Development',
    'React Development',
    'Full Stack Services'
  ];

  return (
    <footer className="bg-gradient-to-br from-indigo-600 via-blue-700 to-indigo-800 text-white pt-20 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl opacity-10"></div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                width={120}
                height={100}
                src="https://res.cloudinary.com/du0tz73ma/image/upload/v1742113596/Group_3_zerf56.png"
                alt="Bahari Logo"
                className="h-12 mb-6"
              />
              <h3 className="text-xl font-bold mb-4">
                Professional Solutions for
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"> Modern Challenges</span>
              </h3>
              <p className="text-gray-300 mb-6">
                Turning your ideas into exceptional digital experiences with clean code and modern design.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center space-x-4 mt-10">
              <a
                href="https://github.com/baharihari49"
                className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-colors"
              >
                <FiGithub className="w-5 h-5 text-blue-600" />
              </a>
              <a
                href="https://www.linkedin.com/in/bahari49/"
                className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-colors"
              >
                <LiaLinkedin className="w-6 h-6 text-blue-600" />
              </a>
              <a
                href="https://www.instagram.com/bahar.iii1/"
                className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-colors"
              >
                <FaInstagram className="w-6 h-6 text-blue-600" />
              </a>
              <a
                href="mailto:hello@baharihari.com"
                className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-colors"
              >
                <Mail className="w-5 h-5 text-blue-600" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 flex items-center">
              <span className="w-8 h-0.5 bg-gray-300 inline-block mr-3"></span>
              Navigation
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-300 mr-2" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 flex items-center">
              <span className="w-8 h-0.5 bg-gray-300 inline-block mr-3"></span>
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#contact"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-300 mr-2" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 flex items-center">
              <span className="w-8 h-0.5 bg-gray-300 inline-block mr-3"></span>
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hello@baharihari.com"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-start"
                >
                  <Mail className="w-5 h-5 text-gray-300 mr-3 mt-0.5 flex-shrink-0" />
                  <span>hello@baharihari.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:6283184512580"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-start"
                >
                  <Phone className="w-5 h-5 text-gray-300 mr-3 mt-0.5 flex-shrink-0" />
                  <span>+62 (831) 8451 2580</span>
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-300 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Bali, Indonesia</span>
              </li>
            </ul>

            {/* CTA Button */}
            <a
              href="#contact"
              className="mt-6 inline-flex items-center px-5 py-3 bg-white hover:bg-gray-200 text-blue-600 rounded-lg transition-colors duration-300"
            >
              Get in Touch
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        {/* Footer divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"></div>

        {/* Bottom section with copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-gray-200">
              &copy; 2022 Bahari. All rights reserved.
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              Crafted with <Heart className="w-4 h-4 inline text-red-500 mx-1" /> by Bahari
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};