import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from '@/features/api/courseApi';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CourseTab = () => {
    const navigate = useNavigate();
    const params = useParams();
    const courseId = params.courseId;

    const { data: courseByIdData, isLoading: courseByIdLoading, refetch } = useGetCourseByIdQuery(courseId,{refetchOnMountOrArgChange:true});
    const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();
    const [publishCourse] = usePublishCourseMutation();

    const [previewThumbnail, setPreviewThumbnail] = useState("");

    const [input, setInput] = useState({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: ""
    });

    useEffect(() => {
        if (courseByIdData?.course) {
            const course = courseByIdData?.course;
            setInput({
                courseTitle: course.courseTitle,
                subTitle: course.subTitle,
                description: course.description,
                category: course.category,
                courseLevel: course.courseLevel,
                coursePrice: course.coursePrice,
                courseThumbnail: ""
            })
        }
    }, [courseByIdData])

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }

    const selectCategory = (value) => {
        setInput({ ...input, category: value })
    }

    const selectCourseLevel = (value) => {
        setInput({ ...input, courseLevel: value })
    }

    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, courseThumbnail: file })
            const fileReader = new FileReader();
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
            fileReader.readAsDataURL(file);
        }
    }

    const updateCourseHandler = async () => {
        const formData = new FormData();
        formData.append("courseTitle", input.courseTitle);
        formData.append("subTitle", input.subTitle);
        formData.append("description", input.description);
        formData.append("category", input.category);
        formData.append("courseLevel", input.courseLevel);
        formData.append("coursePrice", input.coursePrice);
        formData.append("courseThumbnail", input.courseThumbnail);
        await editCourse({ formData, courseId });
    }

    const publishStatusHandler = async(action)=>{
        try {
            const response = await publishCourse({courseId,query:action});
            if(response.data){
                refetch();
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to publish or unpublish course");
        }
    }

    //For toast
    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Course Updated.")
        }
        if (error) {
            toast.error(error.data.message || "Failed to update course")
        }
    }, [isSuccess, error])

    if(courseByIdLoading){
        return <h1>Loading...</h1>
    }
    return (
        <div>
            <Card>
                <CardHeader className='flex flex-row justify-between'>
                    <div>
                        <CardTitle>Basic course information</CardTitle>
                        <CardDescription>
                            Make changes to your courses here. Click save when you are done.
                        </CardDescription>
                    </div>
                    <div className='space-x-2'>
                        <Button variant="outline" disabled = {courseByIdData?.course.lectures.length === 0} onClick={()=>publishStatusHandler(courseByIdData?.course.isPublished?"false":"true")}>
                            {
                                courseByIdData?.course.isPublished ? "Unpublished" : "Published"
                            }
                        </Button>
                        <Button>Remove Course</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className='space-y-4 mt-5'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                value={input.courseTitle} onChange={changeEventHandler}
                                type="text" name="courseTitle" placeholder="Ex. Fullstack developer"
                            />
                        </div>
                        <div>
                            <Label>Subtitle</Label>
                            <Input
                                value={input.subTitle} onChange={changeEventHandler}
                                type="text" name="subTitle" placeholder="Become a Full Stack developer in 2 months"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <RichTextEditor input={input} setInput={setInput} />
                        </div>
                        <div className='flex items-center gap-5'>
                            <div>
                                <Label>Category</Label>
                                <Select onValueChange={selectCategory}>
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
                            <div>
                                <Label>Course Level</Label>
                                <Select onValueChange={selectCourseLevel}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select course level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Course Level</SelectLabel>
                                            <SelectItem value="Beginner">Beginner</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="Advance">Advance</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Price in (INR)</Label>
                                <Input
                                    type="number" name="coursePrice" value={input.coursePrice} onChange={changeEventHandler} placeholder="eg. 199" className='w-fit'
                                />
                            </div>
                        </div>
                        <div>
                            <Label>Course Thumbnail</Label>
                            <Input
                                type="file" onChange={selectThumbnail} accept="image/*" className='w-fit'
                            />
                            {
                                previewThumbnail && (
                                    <img src={previewThumbnail} className='w-64 my-2' alt="Course Thumbnail" />
                                )
                            }
                        </div>
                        <div>
                            <Button onClick={() => navigate("/admin/course")} variant="outline">Cancel</Button>
                            <Button disabled={isLoading} onClick={updateCourseHandler}>
                                {
                                    isLoading ? (
                                        <>
                                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                            Please wait
                                        </>
                                    ) : "Save"
                                }
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CourseTab