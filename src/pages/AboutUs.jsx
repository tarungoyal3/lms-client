// // src/pages/AboutUs.jsx
// import React from 'react';
// import { FaGraduationCap, FaBookOpen, FaLightbulb } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const AboutUs = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16 px-6">
//       <div className="max-w-5xl mx-auto">
//         <motion.h1
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-4xl font-extrabold text-center text-blue-700 mb-6"
//         >
//           About Our LMS
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12"
//         >
//           Our Learning Management System (LMS) is crafted with passion and purpose — to empower students through
//           smart, intuitive, and interactive learning experiences.
//         </motion.p>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
//           >
//             <FaGraduationCap className="text-blue-600 text-4xl mx-auto mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Student-Centric</h3>
//             <p className="text-gray-600 text-sm">
//               Focused on student needs — with AI-powered revision, personalized schedules, and progress tracking.
//             </p>
//           </motion.div>

//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
//           >
//             <FaBookOpen className="text-green-600 text-4xl mx-auto mb-4" />
//             <h3 className="text-xl font-semibold mb-2">All-in-One Platform</h3>
//             <p className="text-gray-600 text-sm">
//               Access study materials, track modules, attempt quizzes, and get instant AI doubt resolution.
//             </p>
//           </motion.div>

//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
//           >
//             <FaLightbulb className="text-yellow-500 text-4xl mx-auto mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Built with Innovation</h3>
//             <p className="text-gray-600 text-sm">
//               Created using the MERN stack, integrated with AI to enhance the way students learn and grow.
//             </p>
//           </motion.div>
//         </div>

//         <div className="mt-16 text-center">
//           <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
//           <p className="text-gray-700 max-w-3xl mx-auto leading-7">
//             We aim to build a future where technology complements education — helping students not just learn,
//             but learn smarter. By leveraging modern web technologies and AI, we strive to make learning
//             more accessible, personalized, and engaging for everyone.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;






















// src/pages/AboutUs.jsx
import React from 'react';
import { FaGraduationCap, FaBookOpen, FaLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center text-blue-700 dark:text-white mb-6"
        >
          About Our LMS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12"
        >
          Our Learning Management System (LMS) is crafted with passion and purpose — to empower students through
          smart, intuitive, and interactive learning experiences.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md dark:shadow-gray-800 hover:shadow-lg transition-colors duration-300"
          >
            <FaGraduationCap className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Student-Centric</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Focused on student needs — with AI-powered revision, personalized schedules, and progress tracking.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md dark:shadow-gray-800 hover:shadow-lg transition-colors duration-300"
          >
            <FaBookOpen className="text-green-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">All-in-One Platform</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Access study materials, track modules, attempt quizzes, and get instant AI doubt resolution.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md dark:shadow-gray-800 hover:shadow-lg transition-colors duration-300"
          >
            <FaLightbulb className="text-yellow-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Built with Innovation</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Created using the MERN stack, integrated with AI to enhance the way students learn and grow.
            </p>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-7">
            We aim to build a future where technology complements education — helping students not just learn,
            but learn smarter. By leveraging modern web technologies and AI, we strive to make learning
            more accessible, personalized, and engaging for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
