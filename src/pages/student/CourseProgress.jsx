import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { useGetCourseProgressQuery, useInCompleteCourseMutation, useUpdateLectureProgressMutation } from '@/features/api/courseProgressApi';
import { CheckCircle, CheckCircle2, CirclePlay } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCompleteCourseMutation } from '../../features/api/courseProgressApi';
import { toast } from 'sonner';
import DoubtSolver from '@/components/DoubtSolver';
import axios from "axios";
import LearningScheduler from './LearningScheduler';
import Quiz from './Quiz';

const CourseProgress = () => {


  const [recap, setRecap] = useState("");
  const [loadingRecap, setLoadingRecap] = useState(false);
  const { courseId } = useParams();
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [updateLectureProgress] = useUpdateLectureProgressMutation();

  const [completeCourse, { data: markCompleteData, isSuccess: completedSuccess }] = useCompleteCourseMutation();
  const [inCompleteCourse, { data: markInCompleteData, isSuccess: inCompletedSuccess }] = useInCompleteCourseMutation();

  const [quiz, setQuiz] = useState("");
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData.message);
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData.message);
    }
  }, [completedSuccess, inCompletedSuccess]);

  useEffect(() => {
    if (data?.data?.courseDetails?.lectures?.length > 0 && !currentLecture) {
      setCurrentLecture(data.data.courseDetails.lectures[0]);
    }
  }, [data, currentLecture]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load course details</p>;
  if (!data?.data?.courseDetails) return <p>No course data found</p>;

  const { completed, courseDetails, progress } = data.data;
  const { courseTitle, lectures } = courseDetails;

  const activeLecture = currentLecture;

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };


  const generateRecap = async () => {
    setLoadingRecap(true);
    try {
      const res = await axios.post('http://localhost:8080/api/v1/revision/generate-summary', { lectures: [currentLecture] });

      setRecap(res.data.summary);
    } catch (err) {
      toast.error("Failed to generate recap.");
    } finally {
      setLoadingRecap(false);
    }
  };



  const generateQuiz = async () => {
    setLoadingQuiz(true);
    try {
      const res = await axios.post('http://localhost:8080/api/v1/quiz/generate-quiz', {
        lectures: [currentLecture]  // or all lectures for full course
      });

      setQuiz(res.data.quiz);
    } catch (err) {
      toast.error("Failed to generate quiz.");
    } finally {
      setLoadingQuiz(false);
    }
  };




  return (
    <div className="max-w-7xl mx-auto p-6 mt-10">
      {/* Course header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">{courseTitle}</h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? 'outline' : 'primary'}
          className="flex items-center"
        >
          {completed ? (
            <>
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              Mark as Incomplete
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 mr-2 text-blue-500" />
              Mark as Complete
            </>
          )}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Video Section */}
        <div className="flex-1 lg:w-3/5 h-fit rounded-lg shadow-lg bg-white dark:bg-gray-800 p-5">
          <div className="relative w-full aspect-video">
            <video
              src={activeLecture?.videoUrl}
              controls
              className="w-full h-full rounded-lg shadow-md"
              onPlay={() => handleLectureProgress(activeLecture._id)}
            />
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-200">
              {activeLecture
                ? `Lecture ${lectures.findIndex((lec) => lec._id === activeLecture._id) + 1}: ${activeLecture.lectureTitle}`
                : 'No lecture selected'}
            </h3>
          </div>
        </div>

        {/* Sidebar for Lecture List */}
        <div className="flex flex-col w-full lg:w-2/5 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 md:pl-4 pt-4 lg:pt-0">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Course Lectures</h2>
          <div className="overflow-y-auto flex-1 space-y-4">
            {lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${lecture._id === currentLecture?._id ? 'bg-gray-200 dark:bg-gray-700' : ''
                  }`}
                onClick={() => setCurrentLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={28} className="text-green-500" />
                    ) : (
                      <CirclePlay size={28} className="text-gray-500 dark:text-gray-300" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium text-gray-800 dark:text-gray-100">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge variant="outline" className="bg-green-200 text-green-600">
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <DoubtSolver />

      {/* Revision buddy */}
      <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">📘 Revision Buddy</h2>
          <Button onClick={generateRecap} disabled={loadingRecap}>
            {loadingRecap ? "Generating..." : "Generate Recap"}
          </Button>
        </div>
        {recap && (
          <pre className="whitespace-pre-wrap bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4 rounded-lg mt-4">
            {recap}
          </pre>
        )}
      </div>

      {/* Quiz generator */}
      <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">🧪 AI Quiz Generator</h2>
          <Button onClick={generateQuiz} disabled={loadingQuiz || !currentLecture}>
            {loadingQuiz ? "Generating..." : "Generate Quiz"}
          </Button>
        </div>

        {quiz && (
          <pre className="whitespace-pre-wrap bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4 rounded-lg mt-4">
            {quiz}
          </pre>
        )}
      </div>

      {/* <Quiz/> */}
      {/* <Quiz courseId={courseId}/> */}

      <LearningScheduler />
    </div>
  );
};

export default CourseProgress;
