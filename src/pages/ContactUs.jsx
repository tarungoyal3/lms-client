import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaUser, FaCommentDots } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: Send formData to your backend or email service
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-6 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-blue-700 dark:text-white mb-4"
        >
          Get in Touch
        </motion.h1>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
          Have a question, suggestion, or feedback? We're all ears. Drop us a message and we'll get back to you as soon as possible!
        </p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-900 shadow-xl dark:shadow-gray-800 rounded-2xl p-8 space-y-6 transition-colors duration-300"
        >
          <div className="relative">
            <FaUser className="absolute top-4 left-4 text-gray-400 dark:text-gray-500" />
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute top-4 left-4 text-gray-400 dark:text-gray-500" />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="relative">
            <FaCommentDots className="absolute top-4 left-4 text-gray-400 dark:text-gray-500" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl h-36 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium shadow-md hover:bg-blue-700 transition"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default ContactUs;
