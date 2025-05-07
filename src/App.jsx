import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import HeroSection from './pages/student/HeroSection'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import { RouterProvider } from 'react-router'
import Courses from './pages/student/Courses'
import Mylearning from './pages/student/Mylearning'
import Profile from './pages/student/Profile'
import AddCourse from './pages/admin/course/AddCourse'
import Sidebar from './pages/admin/Sidebar'
import Dashboard from './pages/admin/Dashboard'
import CourseTable from './pages/admin/course/CourseTable'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLecture from './pages/admin/lecture/CreateLecture'
import EditLecture from './pages/admin/lecture/EditLecture'
import CourseDetail from './pages/student/CourseDetail'
import CourseProgress from './pages/student/CourseProgress'
import SearchPage from './pages/student/SearchPage'
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from './components/ProtectedRoutes'
import PurchaseCourseProtectedRoute from './components/PurchaseCourseProtectedRoute'
import { ThemeProvider } from './components/ThemeProvider'
import DoubtSolver from './components/DoubtSolver'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <>
          <HeroSection />
          <Courses />
          <DoubtSolver/>
        </>
      },
      {
        path: "login",
        element: <AuthenticatedUser><Login /></AuthenticatedUser>
      },
      {
        path: "mylearning",
        element: <ProtectedRoute><Mylearning /></ProtectedRoute>
      },
      {
        path: "profile",
        element: <ProtectedRoute><Profile /></ProtectedRoute>
      },
      {
        path: "aboutus",
        element: <ProtectedRoute><AboutUs/></ProtectedRoute>
      },
      {
        path: "contactus",
        element: <ProtectedRoute><ContactUs/></ProtectedRoute>
      },
      {
        path: "course/search",
        element: <ProtectedRoute><SearchPage /></ProtectedRoute>
      },
      {
        path: "course-detail/:courseId",
        element: <ProtectedRoute><CourseDetail /></ProtectedRoute>
      },

      {
        path: "course-progress/:courseId",
        element: <ProtectedRoute>
          <PurchaseCourseProtectedRoute>
          <CourseProgress />
          </PurchaseCourseProtectedRoute>
        </ProtectedRoute>
      },

      // Admin routes only render Sidebar
      {
        path: "admin",
        element: <AdminRoute><Sidebar /></AdminRoute>,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "course",
            element: <CourseTable />
          },
          {
            path: "course/create",
            element: <AddCourse />
          },
          {
            path: "course/:courseId",
            element: <EditCourse />
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />
          }
        ]
      }
    ]
  }
])

function App() {
  return (
    <main>
      <ThemeProvider>
      <RouterProvider router={appRouter} />
      </ThemeProvider>
      
    </main>
  )
}

export default App
