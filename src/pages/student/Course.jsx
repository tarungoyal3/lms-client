import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import React from 'react';

const Course = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`} className="block group">
      <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900">
        
        {/* Thumbnail */}
        <div className="relative">
          <img
            src={course.courseThumbnail}
            alt="Course Thumbnail"
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-3 left-3 bg-purple-600 text-white">
            {course.courseLevel}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-purple-500 line-clamp-2">
            {course.courseTitle}
          </h2>

          {/* Instructor */}
          <div className="flex items-center gap-3 mt-2">
            <img
              src={course.creator?.photoUrl || 'https://github.com/shadcn.png'}
              alt="Instructor"
              className="w-9 h-9 rounded-full object-cover border"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">{course.creator?.name}</span>
          </div>

          {/* Price */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-xl font-bold text-purple-600">
              ₹{course.coursePrice}
            </p>
            <button className="text-sm text-purple-500 font-semibold hover:underline">
              View Details →
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Course;
