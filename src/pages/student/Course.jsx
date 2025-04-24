// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Badge } from '@/components/ui/badge'
// import { Card, CardContent } from '@/components/ui/card'
// import React from 'react'

// const Course = () => {
//     return (
//         <div>
//             <Card className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
//                 <div className='relative'>
//                     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3CRvZuHn-tATX9lixgGZeK39Cn2uV9Tduvw&s" alt="Course" className='w-full h-36 object-cover rounded-t-lg' />
//                 </div>
//                 <CardContent className="px-5 py-3 space-y-2">
//                     <h1 className='font-bold hover:underline text-lg truncate'> NextJs Complete course in 2024</h1>
//                     <div className='flex items-center justify-between'>
//                     <div className='flex items-center gap-3'>
//                         <Avatar className='h-8 w-8 rounded-full'>
//                             <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
//                             <AvatarFallback>CN</AvatarFallback>
//                         </Avatar>
//                         <h1 className='font-medium text-sm'>Tarun Goyal</h1>
//                     </div>
//                     <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
//                         Advance
//                     </Badge>
//                     </div>
//                     <div className='text-lg font-bold'>
//                         <span>₹499</span>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }

// export default Course


















// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Badge } from '@/components/ui/badge'
// import { Card, CardContent } from '@/components/ui/card'
// import React from 'react'

// const Course = () => {
//     return (
//         <div>
//             <Card className="overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
//                 <div className='relative'>
//                     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKodOXURAFVqoDnZIsRd3GV_IzqEaUUFHcJQ&s" alt="Course" className='w-full h-40 object-cover rounded-t-xl' />
//                 </div>
//                 <CardContent className="px-6 py-4 space-y-3">
//                     <h1 className='font-bold text-lg truncate hover:text-blue-600 transition-all cursor-pointer'>React.js Complete Course in 2024</h1>
//                     <div className='flex items-center justify-between'>
//                         <div className='flex items-center gap-3'>
//                             <Avatar className='h-9 w-9 rounded-full shadow-md'>
//                                 <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
//                                 <AvatarFallback>CN</AvatarFallback>
//                             </Avatar>
//                             <h1 className='font-medium text-sm text-gray-700 dark:text-gray-300'>Tarun Goyal</h1>
//                         </div>
//                         <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 text-xs rounded-full shadow-md">
//                             Advanced
//                         </Badge>
//                     </div>
//                     <div className='text-lg font-bold text-gray-900 dark:text-gray-100'>
//                         <span>₹499</span>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }

// export default Course;





























import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { Link } from 'react-router-dom';
const Course = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
      <div className='transition-transform transform hover:scale-105 shadow-lg hover:shadow-2xl rounded-xl overflow-hidden bg-white dark:bg-gray-800'>
        <img
          src={course.courseThumbnail}
          alt='Course Thumbnail'
          className='w-full h-48 object-cover'
        />
        <div className='p-5 space-y-3'>
          <h2 className='font-bold text-lg text-gray-900 dark:text-gray-100 truncate hover:text-purple-600 cursor-pointer'>
            {course.courseTitle}
          </h2>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <img
                src={course.creator?.photoUrl || 'https://github.com/shadcn.png'}
                alt='Instructor'
                className='h-10 w-10 rounded-full border border-gray-300'
              />
              <h3 className='text-sm font-medium text-gray-700 dark:text-gray-300'>{course.creator?.name}</h3>
            </div>
            <span className='bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 text-xs rounded-full'>{course.courseLevel}</span>
          </div>
          <p className='text-lg font-bold text-gray-900 dark:text-gray-100'>{course.coursePrice}</p>
        </div>
      </div>
    </Link>
  );
};

export default Course;
