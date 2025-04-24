import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateLectureMutation, useGetCourseLectureQuery } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Lecture from './Lecture'

const CreateLecture = () => {
    const params = useParams();
    const courseId = params.courseId;
    const navigate = useNavigate();
    const [lectureTitle,setLectureTitle] = useState("");

    const [createLecture,{data,isLoading,isSuccess,error}] = useCreateLectureMutation();
    const {data:lectureData,isLoading:lectureLoading,isError:lectureError,refetch} = useGetCourseLectureQuery(courseId);

    const createLectureHandler = async()=>{
        await createLecture({lectureTitle,courseId})
    }

    useEffect(() => {
      if(isSuccess){
        refetch();
        toast.success(data.message);
      }
      if(error){
        toast.error(error.data.message)
      } 
    }, [isSuccess,error])

    console.log(lectureData)
    
  return (
    <div className=' flex-1 mx-10'>
            <div className='mb-4'>
                <h1 className='font-bold text-xl'>Let's add lectures, add some basic details for your new lecture</h1>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, est.</p>
            </div>

            <div className='space-y-4'>
                <div>
                    <Label>Title</Label>
                    <Input type="text" value={lectureTitle} onChange={(e) => setLectureTitle(e.target.value)} placeholder='Your Title name' />
                </div>
                <div className='flex items-center gap-2'>
                    <Button onClick={() => navigate(`/admin/course/${courseId}`)} variant="outline">Back to course</Button>
                    <Button disabled={isLoading} onClick={createLectureHandler}>
                        {
                            isLoading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Please wait
                                </>
                            ) : "Create lecture"
                        }
                    </Button>
                </div>
                <div>
                    {
                        lectureLoading ? (<p>Lecture loading...</p>) : lectureError ? (<p>Failed to load lectures.</p>) : lectureData.lectures.length===0 ? (<p>No lecture available</p>) : 
                        (
                            lectureData.lectures.map((lecture,index)=>(
                                <Lecture key={lecture._id} lecture = {lecture} courseId = {courseId} index = {index}/>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
  )
}

export default CreateLecture