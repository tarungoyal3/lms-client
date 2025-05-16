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
