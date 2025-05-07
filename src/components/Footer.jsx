import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300 py-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">LMS Platform</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Empowering learners with AI-driven education tools.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <a href="/aboutus" className="text-sm hover:text-blue-600 dark:hover:text-white">
              About
            </a>
            <a href="/course/search?query" className="text-sm hover:text-blue-600 dark:hover:text-white">
              Courses
            </a>
            <a href="/contactus" className="text-sm hover:text-blue-600 dark:hover:text-white">
              Contact
            </a>
            <a href="/privacy" className="text-sm hover:text-blue-600 dark:hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 dark:border-gray-700 my-6"></div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6">
          <a href="https://facebook.com" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-white">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" className="text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white">
            <FaLinkedinIn />
          </a>
          <a href="https://github.com" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">
            <FaGithub />
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} LMS Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
