import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Bot, SendHorizonal, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDragControls, useMotionValue } from "framer-motion";

const DoubtSolver = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const answerRef = useRef(null);

  const dragControls = useDragControls();
  const y = useMotionValue(0);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/ai/ask",
        { question },
        { withCredentials: true }
      );
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("Failed to get answer. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [answer]);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>

      {/* Chatbot Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragControls={dragControls}
            style={{ y }}
            dragMomentum={false}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-[340px] max-w-[95vw] z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-2xl border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
          >
            <div
              className="cursor-move p-3 bg-blue-600 text-white flex items-center justify-between"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span className="font-medium text-sm">AI Tutor</span>
              </div>
              <X
                className="cursor-pointer w-4 h-4 hover:text-gray-200"
                onClick={() => setIsOpen(false)}
              />
            </div>

            <div className="p-4 space-y-3 bg-white dark:bg-gray-800 text-sm">
              <textarea
                rows={2}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white placeholder:text-gray-400"
                placeholder="Type your doubt here..."
              />

              <button
                onClick={handleAsk}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {loading ? "Thinking..." : <>Ask <SendHorizonal className="w-4 h-4" /></>}
              </button>

              {answer && (
                <div
                  ref={answerRef}
                  className="max-h-40 overflow-y-auto bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-gray-800 dark:text-white"
                >
                  <strong>AI:</strong>
                  <p className="mt-1 whitespace-pre-line">{answer}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DoubtSolver;
