// import React, { useState } from 'react';
// import axios from 'axios';

// const LearningScheduler = ({ onScheduleGenerated }) => {
//   const [availableHours, setAvailableHours] = useState('');
//   const [deadline, setDeadline] = useState('');
//   const [topics, setTopics] = useState('');
//   const [schedule, setSchedule] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleGenerate = async () => {
//     setLoading(true);
//     setSchedule('');
//     setError('');

//     try {
//       const res = await axios.post('http://localhost:8080/api/v1/scheduler/generate-schedule', {
//         availableHours,
//         deadline,
//         topics: topics.split(',').map(t => t.trim())
//       });

//       if (res.data?.plan) {
//         setSchedule(res.data.plan);
//         if (onScheduleGenerated) onScheduleGenerated(res.data.plan);
//       } else {
//         setError('No schedule received. Please try again.');
//       }
//     } catch (err) {
//       console.error('Frontend Error:', err);
//       setError('Failed to generate schedule. Server might be down or unreachable.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       {/* Main Form Container */}
//       <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
//         <h2 className="text-3xl font-semibold text-center text-indigo-700">📅 Smart Learning Scheduler</h2>
        
//         {/* Available Hours */}
//         <div className="flex flex-col space-y-2">
//           <label className="text-lg font-medium text-gray-800">Available Study Hours per Day:</label>
//           <input
//             type="number"
//             value={availableHours}
//             onChange={e => setAvailableHours(e.target.value)}
//             className="p-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             placeholder="e.g. 3"
//           />
//         </div>

//         {/* Deadline */}
//         <div className="flex flex-col space-y-2">
//           <label className="text-lg font-medium text-gray-800">Deadline Date:</label>
//           <input
//             type="date"
//             value={deadline}
//             onChange={e => setDeadline(e.target.value)}
//             className="p-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* Topics */}
//         <div className="flex flex-col space-y-2">
//           <label className="text-lg font-medium text-gray-800">Topics (comma-separated):</label>
//           <input
//             type="text"
//             value={topics}
//             onChange={e => setTopics(e.target.value)}
//             className="p-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             placeholder="e.g. HTML, CSS, React, MongoDB"
//           />
//         </div>

//         {/* Generate Button */}
//         <button
//           onClick={handleGenerate}
//           className={`w-full p-4 rounded-lg font-semibold text-white transition duration-300 ease-in-out transform ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
//           disabled={loading}
//         >
//           {loading ? 'Generating...' : 'Generate Schedule'}
//         </button>
        
//         {/* Error Message */}
//         {error && (
//           <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg shadow-md">
//             <p>{error}</p>
//           </div>
//         )}
//       </div>

//       {/* Schedule Display */}
//       {schedule && (
//         <div className="mt-8 bg-white rounded-xl shadow-lg p-6 space-y-6">
//           <h3 className="text-2xl font-semibold text-indigo-700">🗓️ Your Personalized Study Plan:</h3>
//           <div className="space-y-4">
//             {schedule.split('\n').map((line, index) => (
//               <p key={index} className="text-lg text-gray-800">{line}</p>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LearningScheduler;




























































import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LearningScheduler = ({ onScheduleGenerated }) => {
  const [availableHours, setAvailableHours] = useState('');
  const [deadline, setDeadline] = useState('');
  const [topics, setTopics] = useState('');
  const [schedule, setSchedule] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load saved schedule from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('learning_schedule');
    if (saved) setSchedule(saved);
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setSchedule('');
    setError('');

    try {
      const res = await axios.post('http://localhost:8080/api/v1/scheduler/generate-schedule', {
        availableHours,
        deadline,
        topics: topics.split(',').map(t => t.trim())
      });

      if (res.data?.plan) {
        setSchedule(res.data.plan);
        localStorage.setItem('learning_schedule', res.data.plan);
        if (onScheduleGenerated) onScheduleGenerated(res.data.plan);
      } else {
        setError('No schedule received. Please try again.');
      }
    } catch (err) {
      console.error('Frontend Error:', err);
      setError('Failed to generate schedule.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow max-w-xl mx-auto mt-5 dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-4 text-center text-indigo-600">Smart Learning Scheduler</h2>

      <div className="space-y-3">
        <input
          type="number"
          value={availableHours}
          onChange={e => setAvailableHours(e.target.value)}
          placeholder="Hours per day"
          className="w-full border px-3 py-2 rounded-md"
        />
        <input
          type="date"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
        />
        <input
          type="text"
          value={topics}
          onChange={e => setTopics(e.target.value)}
          placeholder="Topics (comma-separated)"
          className="w-full border px-3 py-2 rounded-md"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          {loading ? 'Generating...' : 'Generate Schedule'}
        </button>
      </div>

      {error && <div className="text-red-500 mt-3">{error}</div>}

      {schedule && (
        <div className="mt-6 bg-gray-50 p-4 rounded-md text-sm whitespace-pre-wrap leading-relaxed border">
          <h3 className="text-lg font-bold text-indigo-700 mb-2">📘 Your Study Plan:</h3>
          <div>{schedule}</div>
        </div>
      )}
    </div>
  );
};

export default LearningScheduler;
