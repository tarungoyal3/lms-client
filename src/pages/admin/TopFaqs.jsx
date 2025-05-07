// pages/admin/TopFaqs.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const TopFaqs = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/faqs/top");
        setFaqs(res.data);
      } catch (err) {
        console.error("Failed to load FAQs:", err);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">🔍 Top AI FAQs</h2>
      <ul className="space-y-3">
        {faqs.map((faq, idx) => (
          <li key={idx} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-800 dark:text-gray-100"><strong>Q:</strong> {faq.question}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Asked {faq.count} time(s)</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopFaqs;
