import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'
import Course from './Course';
import { useGetPublishedCourseQuery } from '@/features/api/courseApi';
const Courses = () => {
  const {data,isLoading,isError} = useGetPublishedCourseQuery();
  if(isError) return <h1>Some error occurred.</h1>
return (
  <div className='bg-gray-50 dark:bg-gray-900 py-16'>
    <div className='max-w-7xl mx-auto px-6'>
      <h2 className='text-center text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-12'>
        Explore Our Top Courses
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => <CourseSkeleton key={index} />)
          : data?.courses && data.courses.map((course, index) => <Course key={index} course = {course}/>)}
      </div>
    </div>
  </div>
)
}

export default Courses;


const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow rounded-xl overflow-hidden animate-pulse">
      <Skeleton className="w-full h-40" />
      <div className="px-6 py-5 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-7 w-7 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-5 w-1/4" />
      </div>
    </div>
  );
};