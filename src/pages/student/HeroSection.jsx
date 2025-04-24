// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const HeroSection = () => {
//   const [searchQuery,setSearchQuery] = useState("");
//   const navigate = useNavigate();
//   const searchHandler = (e)=>{
//     e.preventDefault();
//     if(searchQuery.trim()!==""){
//       navigate(`/course/search?query=${searchQuery}`)
//     }
//     setSearchQuery("")
//   }
//   return (
//     <div className='relative bg-gradient-to-br from-blue-600 to-purple-700 dark:from-gray-800 dark:to-gray-900 py-32 px-8 text-center text-white'>
//       <div className='max-w-4xl mx-auto'>
//         <h1 className='text-6xl font-extrabold leading-tight mb-6'>
//           Unlock Your Potential with Expert-Led Courses
//         </h1>
//         <p className='text-lg text-gray-200 dark:text-gray-400 mb-8'>
//           Learn, grow, and succeed with the best online courses tailored for your goals.
//         </p>
//         <form onSubmit={searchHandler} className='flex items-center bg-white dark:bg-gray-800 rounded-full shadow-xl overflow-hidden max-w-xl mx-auto'>
//           <Input 
//             type='text' 
//             value = {searchQuery}
//             onChange = {(e)=>setSearchQuery(e.target.value)}
//             placeholder='Search for courses...' 
//             className='flex-grow px-6 py-4 text-gray-900 dark:text-gray-100 border-none focus:ring-0 placeholder-gray-500 dark:placeholder-gray-400'
//           />
//           <Button type = "submit" className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-r-full hover:opacity-90 dark:hover:opacity-80'>
//             Search
//           </Button>
//         </form>
//         <Button onClick={()=> navigate(`/course/search?query`)} className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200">Explore Courses</Button>
//       </div>
//     </div>
//   );
// };
// export default HeroSection;
























import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 dark:from-gray-900 dark:to-gray-950 py-28 px-6 sm:px-8 text-center text-white transition-all duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
          Unlock Your Potential with <span className="text-yellow-300">Expert-Led Courses</span>
        </h1>
        <p className="text-md sm:text-lg text-gray-100 dark:text-gray-400 mb-10">
          Learn, grow, and succeed with the best online courses tailored for your goals.
        </p>

        <form
          onSubmit={searchHandler}
          className="flex flex-col sm:flex-row items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto transition-all"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for courses..."
            className="flex-grow px-6 py-4 text-gray-900 dark:text-white bg-transparent border-none focus:ring-0 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-r-full font-semibold hover:opacity-90 dark:hover:opacity-80 transition"
          >
            Search
          </Button>
        </form>

        <div className="mt-6">
          <Button
            onClick={() => navigate(`/course/search?query`)}
            className="mt-4 sm:mt-0 bg-white dark:bg-gray-800 text-blue-700 dark:text-white border border-blue-200 dark:border-gray-700 px-6 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Explore Courses
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
