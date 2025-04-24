import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateCourseMutation } from '@/features/api/courseApi'
import { Label } from '@radix-ui/react-label'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const AddCourse = () => {
    const [courseTitle, setCourseTitle] = useState("");
    const [category, setCategory] = useState("");
    const [createCourse,{data,error,isLoading,isSuccess}] = useCreateCourseMutation();
    const navigate = useNavigate();
    //for displaying toast
    // useEffect(() => {
    //     if(isSuccess){
    //         toast.success(data?.message || "Course created.")
    //     }
    // }, [isSuccess,error])
    useEffect(() => {
        console.log("isSuccess:", isSuccess, "data:", data, "error:", error);
        
        if (isSuccess && data) { 
            toast.success(data.message || "Course created successfully.");
            navigate("/admin/course")
        }
        if (error) {
            toast.error("Failed to create course.");
            
        }
    }, [isSuccess, data, error]); 
    
    const getSelectedCategory = (value) => {
        setCategory(value)
    }

    const createCourseHandler = async () => {
        await createCourse({courseTitle,category});
    }

    
    
    return (
        <div className=' flex-1 mx-10'>
            <div className='mb-4'>
                <h1 className='font-bold text-xl'>Add course, add some basic details for your new course</h1>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, est.</p>
            </div>

            <div className='space-y-4'>
                <div>
                    <Label>Title</Label>
                    <Input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} placeholder='Your Course name' />
                </div>
                <div>
                    <Label>Category</Label>
                    <Select onValueChange={getSelectedCategory}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem value="Next JS">Next JS</SelectItem>
                                <SelectItem value="Data Science">Data Science</SelectItem>
                                <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                                <SelectItem value="FullStack Development">FullStack Development</SelectItem>
                                <SelectItem value="MERN Stack Development">MERN Stack Development</SelectItem>
                                <SelectItem value="JavaScript">JavaScript</SelectItem>
                                <SelectItem value="Python">Python</SelectItem>
                                <SelectItem value="Docker">Docker</SelectItem>
                                <SelectItem value="MongoDB">MongoDB</SelectItem>
                                <SelectItem value="HTML">HTML</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex items-center gap-2'>
                    <Button onClick={() => navigate("/admin/course")} variant="outline">Back</Button>
                    <Button disabled={isLoading} onClick={createCourseHandler}>
                        {
                            isLoading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Please wait
                                </>
                            ) : "Create"
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddCourse