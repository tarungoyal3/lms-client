// import { Menu, School, Store } from 'lucide-react'
// import React, { useEffect } from 'react'
// import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from './ui/dropdown-menu'
// import { Button } from './ui/button'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import DarkMode from '@/DarkMode'
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from './ui/sheet'
// import { Separator } from '@radix-ui/react-dropdown-menu'
// import { Link, useNavigate } from 'react-router-dom'
// import { useLogoutUserMutation } from '@/features/api/authApi'
// import { toast } from 'sonner'
// import { useSelector } from 'react-redux'

// const Navbar = () => {
//   const { user } = useSelector((store) => store.auth);

//   const navigate = useNavigate();
//   const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
//   const logoutHandler = async () => {
//     await logoutUser();
//   }
//   console.log(user);
//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(data.message || "User log out.")
//       navigate("/login");
//     }
//   }, [isSuccess])
//   return (
//     <div className="h-16 bg-white dark:bg-[#0F172A] shadow-sm fixed top-0 left-0 right-0 z-20">
//   <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-4 md:px-8">
//     {/* Left - Logo */}
//     <Link to="/" className="flex items-center gap-2">
//       <School size={28} className="text-blue-600" />
//       <span className="font-bold text-xl tracking-wide">LearnHub</span>
//     </Link>

//     {/* Right - Buttons */}
//     <div className="flex items-center gap-4">
//       <DarkMode />
//       {user ? (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Avatar>
//               <AvatarImage src={user?.photoUrl || "/default-avatar.png"} />
//               <AvatarFallback>U</AvatarFallback>
//             </Avatar>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent>
//             <DropdownMenuItem asChild>
//               <Link to="/mylearning">My Learning</Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem asChild>
//               <Link to="/profile">Profile</Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
//             {user.role === "instructor" && (
//               <>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem asChild>
//                   <Link to="/admin/dashboard">Dashboard</Link>
//                 </DropdownMenuItem>
//               </>
//             )}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       ) : (
//         <>
//           <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
//           <Button onClick={() => navigate("/signup")}>Sign Up</Button>
//         </>
//       )}
//     </div>
//   </div>
// </div>

//   )
// }

// export default Navbar


// const MobileNavbar = ({user}) => {
//   const navigate = useNavigate();
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button size='icon' className="rounded-full bg-gray-200 hoever:bg-gray-200" variant="outline">
//           <Menu />
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="flex flex-col">
//         <SheetHeader className="flex flex-row items-center justify-between mt-2">
//           <SheetTitle><Link to="/">E-Learning</Link></SheetTitle>
//           <DarkMode />
//         </SheetHeader>
//         <Separator className='mr-2' />
//         <nav className='flex flex-col space-y-4'>
//           <Link to="/my-learning">My Learning</Link>
//           <Link to="/profile">Edit Profile</Link>
//           <p>Logout</p>
//         </nav>
//         {
//           user?.role === "instructor" && (
//             <SheetFooter>
//               <SheetClose asChild>
//                 <Button type="submit" onClick={()=>navigate("/admin/dashboard")}>Dashboard</Button>
//               </SheetClose>
//             </SheetFooter>
//           )
//         }
//       </SheetContent>
//     </Sheet>
//   )
// }















































// src/components/Navbar.jsx
import { Menu, School, Store } from 'lucide-react';
import React, { useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import DarkMode from '@/DarkMode';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Separator } from './ui/separator';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '@/features/api/authApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 bg-white dark:bg-[#0F172A] shadow-sm fixed top-0 left-0 right-0 z-20">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <School size={28} className="text-blue-600" />
          <span className="font-bold text-xl tracking-wide dark:text-white">LMS</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/course/search?query" className="hover:text-blue-600 font-medium">Courses</Link>
          <Link to="/aboutus" className="hover:text-blue-600 font-medium">About Us</Link>
          <Link to="/contactus" className="hover:text-blue-600 font-medium">Contact</Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <DarkMode />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.photoUrl || "/default-avatar.png"} />
                  <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/mylearning">📘 My Learning</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile">👤 Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logoutHandler}>🚪 Logout</DropdownMenuItem>
                {user.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/admin/dashboard">🛠 Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
              <Button onClick={() => navigate("/signup")}>Sign Up</Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileNavbar user={user} onLogout={logoutHandler} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;





const MobileNavbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200" variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col pt-6 space-y-4">
        <SheetHeader className="flex items-center justify-between">
          <SheetTitle>
            <Link to="/" className="text-lg font-semibold">LMS</Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator />

        <nav className="flex flex-col gap-4 text-base font-medium">
          <Link to="/course/search?query">📚 Courses</Link>
          <Link to="/store">🛒 Store</Link>
          <Link to="/aboutus">ℹ️ About Us</Link>
          <Link to="/contactus">📞 Contact</Link>
          {user ? (
            <>
              <Link to="/mylearning">📘 My Learning</Link>
              <Link to="/profile">👤 Profile</Link>
              <button onClick={onLogout} className="text-left text-red-500">🚪 Logout</button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate("/login")}>Login</Button>
              <Button variant="outline" onClick={() => navigate("/signup")}>Sign Up</Button>
            </>
          )}
        </nav>

        {user?.role === "instructor" && (
          <SheetFooter className="pt-4">
            <SheetClose asChild>
              <Button onClick={() => navigate("/admin/dashboard")} className="w-full">🛠 Dashboard</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};


