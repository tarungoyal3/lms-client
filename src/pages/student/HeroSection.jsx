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
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-violet-500 to-fuchsia-500 dark:from-gray-900 dark:to-gray-950 text-white p-6">
  <div className="text-center space-y-6">
    <h1 className="text-5xl font-extrabold leading-tight">
      Learn Anything, <span className="text-yellow-400">Anywhere</span>.
    </h1>
    <p className="text-lg text-gray-100 max-w-xl mx-auto">
      Discover top-notch online courses and upgrade your skills at your own pace.
    </p>
  </div>

  {/* Search Section */}
  <form
    onSubmit={searchHandler}
    className="flex mt-10 bg-white dark:bg-gray-800 rounded-full overflow-hidden shadow-lg w-full max-w-2xl"
  >
    <Input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search courses..."
      className="flex-grow px-6 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
    />
    <Button type="submit" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 rounded-none rounded-r-full px-6">
      Search
    </Button>
  </form>

  {/* Explore Button */}
  <Button
    onClick={() => navigate(`/course/search?query`)}
    className="mt-6 px-6 py-3 bg-white text-purple-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-white rounded-full border dark:border-gray-700"
  >
    Explore All Courses
  </Button>
</div>

  );
};

export default HeroSection;
