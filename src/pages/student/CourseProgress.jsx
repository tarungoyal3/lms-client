import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useGetCourseProgressQuery, useInCompleteCourseMutation, useUpdateLectureProgressMutation } from '@/features/api/courseProgressApi';
import { CheckCircle, CheckCircle2, CirclePlay } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useCompleteCourseMutation } from '../../features/api/courseProgressApi';
import { toast } from 'sonner';

const CourseProgress = () => {
  const { courseId } = useParams();
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [updateLectureProgress] = useUpdateLectureProgressMutation();

  const [completeCourse, { data: markCompleteData, isSuccess: completedSuccess }] = useCompleteCourseMutation();
  const [inCompleteCourse, { data: markInCompleteData, isSuccess: inCompletedSuccess }] = useInCompleteCourseMutation();
  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData.message)
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData.message);
    }
  }, [completedSuccess, inCompletedSuccess])
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
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed)
  }

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId })
    refetch();
  }

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  }

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId)
  }



  return (
    <div className='max-w-7xl mx-auto p-4 mt-20'>
      {/* Display course name */}
      <div className='flex justify-between mb-4'>
        <h1 className='font-bold text-2xl'>{courseTitle}</h1>
        {/* <Button onClick={completed?handleInCompleteCourse : handleCompleteCourse} variant={completed?"outline":"default"}>
          {
            completed ? <div className='flex items-center'><CheckCircle className='h-4 w-4 mr-2'/><span>Completed</span></div> : ("Mark as incomplete")
          }
        </Button> */}
        <Button onClick={completed ? handleInCompleteCourse : handleCompleteCourse} variant={completed ? "outline" : "default"}>
          {
            completed ? (
              "Mark as Incomplete"
            ) : (
              <div className='flex items-center'>
                <CheckCircle className='h-4 w-4 mr-2' />
                <span>Mark as Complete</span>
              </div>
            )
          }
        </Button>

      </div>

      <div className='flex flex-col md:flex-row gap-6'>
        {/* video section */}
        <div className='flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4'>
          <div>
            <video src={activeLecture?.videoUrl}
              controls
              className='w-full h-auto md:rounded-lg'
              onPlay={() => handleLectureProgress(activeLecture._id)}
            />
          </div>
          {/* Display current watching lecture title */}
          <div>
            <h3 className='font-semibold'>
              {
                activeLecture
                  ? `Lecture ${lectures.findIndex((lec) => lec._id === activeLecture._id) + 1} : ${activeLecture.lectureTitle}`
                  : 'No lecture selected'
              }
            </h3>
          </div>
        </div>

        {/* Lecture sidebar */}
        <div className='flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0'>
          <h2 className='font-semibold text-xl mb-4'>Course Lecture</h2>
          <div className='flex-1 overflow-y-auto'>
            {
              lectures.map((lecture) => (
                <Card
                  key={lecture._id}
                  className={`mb-3 hover:cursor-pointer transition-transform ${lecture._id === currentLecture?._id ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                  onClick={() => setCurrentLecture(lecture)}
                >
                  <CardContent className='flex items-center justify-between p-3'>
                    <div className='flex items-center'>
                      {
                        isLectureCompleted(lecture._id) ? (<CheckCircle2 size={24} className='text-green-500 mr-2' />) : (<CirclePlay size={24} className='text-gray-500 mr-2' />)
                      }
                      <div>
                        <CardTitle className='text-lg font-medium'>{lecture.lectureTitle}</CardTitle>
                      </div>
                    </div>
                    {
                      isLectureCompleted(lecture._id) && (<Badge variant="outline" className='bg-green-200 text-green-600'>Completed</Badge>)
                    }
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseProgress;
