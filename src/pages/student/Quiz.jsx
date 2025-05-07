import React, { useEffect, useState } from "react";
import axios from "axios";

const Quiz = ({ courseId }) => {
  const [quizData, setQuizData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // useEffect(() => {
  //   const fetchQuiz = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:8080/api/quiz/${courseId}`);
  //       console.log("Quiz response:", res.data);
        
  //       // Ensure the quiz data is always an array
  //       if (Array.isArray(res.data)) {
  //         setQuizData(res.data);
  //       } else if (res.data?.questions && Array.isArray(res.data.questions)) {
  //         setQuizData(res.data.questions);
  //       } else {
  //         setQuizData([]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching quiz:", error);
  //       setQuizData([]);
  //     }
  //   };

  //   fetchQuiz();
  // }, [courseId]);


  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/quiz/${courseId}`);
        console.log("Quiz response:", res.data);
  
        // Always set the quiz from the .questions array
        const questions = res.data?.questions;
        if (Array.isArray(questions)) {
          setQuizData(questions);
        } else {
          console.warn("Invalid quiz format received");
          setQuizData([]);
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setQuizData([]);
      }
    };
  
    fetchQuiz();
  }, [courseId]);
  
  const handleOptionSelect = (qIndex, option) => {
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = () => {
    let correct = 0;
    quizData.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctAnswer) {
        correct += 1;
      }
    });
    setScore(correct);
    setShowResults(true);
  };

  return (
    <div className="p-4">
      {!Array.isArray(quizData) || quizData.length === 0 ? (
        <p>Loading quiz...</p>
      ) : (
        <div className="space-y-6">
          {quizData.map((q, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <p className="font-semibold text-lg">
                {index + 1}. {q.question}
              </p>
              <div className="mt-2 space-y-1">
                {Object.entries(q.options).map(([key, text]) => (
                  <label key={key} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={key}
                      disabled={showResults}
                      checked={selectedAnswers[index] === key}
                      onChange={() => handleOptionSelect(index, key)}
                    />
                    <span>{text}</span>
                  </label>
                ))}
              </div>

              {showResults && (
                <div className="mt-2">
                  <p className="text-sm">
                    ✅ Correct Answer:{" "}
                    <strong>
                      {q.correctAnswer}: {q.options[q.correctAnswer]}
                    </strong>
                  </p>
                  <p className="text-sm text-gray-700">
                    💡 Explanation: {q.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}

          {!showResults ? (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleSubmit}
            >
              Submit Quiz
            </button>
          ) : (
            <p className="text-lg font-bold">
              Your Score: {score} / {quizData.length}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
