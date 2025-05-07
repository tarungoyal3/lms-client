import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BadgeInfo, Lock, PlayCircle } from 'lucide-react';
import React from 'react';
import BuyCourseButton from '../../components/BuyCourseButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCourseDetailWithStatusQuery } from '@/features/api/purchaseApi';
import ReactPlayer from 'react-player';
import DoubtSolver from '@/components/DoubtSolver';

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1 className="text-center text-xl font-semibold mt-10">Loading Course...</h1>;
  if (isError) return <h1 className="text-center text-xl font-semibold text-red-500 mt-10">Failed to load course details</h1>;

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="mt-20 space-y-10">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-bold">{course?.courseTitle}</h1>
          <p className="text-gray-300 text-lg">Your gateway to mastering new skills</p>
          <div className="flex flex-wrap items-center gap-4 text-sm mt-2">
            <span>Created by <span className="text-indigo-400 font-semibold underline">{course?.creator.name}</span></span>
            <div className="flex items-center gap-1">
              <BadgeInfo size={16} />
              <span>Updated on {course?.createdAt.split("T")[0]}</span>
            </div>
            <span>• {course?.enrolledStudents.length} Students Enrolled</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Section - Course Info */}
        <div className="col-span-2 space-y-8">

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">About this course</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-6" dangerouslySetInnerHTML={{ __html: course.description }} />
          </div>

          {/* Course Content */}
          <Card>
            <CardHeader>
              <CardTitle>Course Outline</CardTitle>
              <CardDescription>{course.lectures.length} Lectures Included</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="mt-4 space-y-4">
              {course.lectures.map((lecture, index) => (
                <div key={index} className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                  {purchased ? <PlayCircle size={20} className="text-green-500" /> : <Lock size={20} className="text-gray-400" />}
                  <p className="text-sm">{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>

        {/* Right Section - Video Preview + Buy Button */}
        <div className="col-span-1">
          <Card>
            <CardContent className="flex flex-col p-5">
              
              {/* Video Player */}
              <div className="w-full rounded-lg overflow-hidden aspect-video mb-4">
                <ReactPlayer width="100%" height="100%" url={course.lectures[0].videoUrl} controls={true} />
              </div>

              {/* Video Title */}
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 truncate">
                {course.lectures[0]?.lectureTitle || "Course Preview"}
              </h2>

              <Separator className="my-4" />

              {/* Price */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-purple-600">₹{course.coursePrice}</h3>
                <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
                  {course.courseLevel}
                </span>
              </div>

              {/* Button */}
              {purchased ? (
                <Button onClick={handleContinueCourse} className="w-full">
                  Continue Learning
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}

            </CardContent>
          </Card>
        </div>

      </section>
      <DoubtSolver/>
    </div>
  );
};

export default CourseDetail;
