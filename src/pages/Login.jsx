//RsJewQWLcvClyfQh
// RsJewQWLcvClyfQh
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Login = () => {
    const [loginInput, setLoginInput] = useState({ email: "", password: "" })
    const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" })
    const navigate = useNavigate();

    const [registerUser,
        {   data: registerData,
            error: registerError,
            isLoading: registerIsLoading,
            isSuccess: registerIsSuccess }] = useRegisterUserMutation();     //These are now hooks look in the authApi.js file
    const [loginUser,
        {   data: loginData,
            error: loginError,
            isLoading: loginIsLoading,
            isSuccess: loginIsSuccess }] = useLoginUserMutation();


    //     For example, if the input has a name="email", this would set the property email in the object with its new value.
    // For example, if name is "email" and value is "user@example.com", the object will look like { email: "user@example.com" }.
    const handlechange = (e, type) => {
        const { name, value } = e.target;
        if (type === "signup") {
            setSignupInput({ ...signupInput, [name]: value })
        }
        else {
            setLoginInput({ ...loginInput, [name]: value })
        }
    };

    const handleRegistration = async (type) => {
        const inputData = type === "signup" ? signupInput : loginInput
        const action = type === "signup"?registerUser:loginUser
        // await action(inputData)
        try {
            const result = await action(inputData).unwrap();
            console.log("Success:", result);
        } catch (error) {
            console.error("Registration/Login Error:", error);
        }
    }

    useEffect(() => {
      if(registerIsSuccess && registerData){
        toast.success(registerData.message || "Signup successfull..")
      }
      if(registerError){
        // toast.error(registerData.data.message || "Signup Failed..")
        const errorMessage = registerError.data?.message || "Signup Failed..";
        toast.error(errorMessage);
      }
      if(loginIsSuccess && loginData){
        toast.success(loginData.message || "Login Successfull..")
        navigate("/");
        return;
      }
      if(loginError){
        // toast.error(loginData.data.message || "Login Failed..")
        const errorMessage = loginError.data?.message || "Login Failed..";
        toast.error(errorMessage);
      }
    }, [loginIsLoading,registerIsLoading,loginData,registerData,loginError,registerError])
    
    return (
        <div className="flex items-center justify-center w-full mt-20">
            <Tabs defaultValue="Signup" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="Signup" >Signup</TabsTrigger>
                    <TabsTrigger value="Login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="Signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>
                                Create your accout and click on signup now!
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input onChange={(e) => handlechange(e, "signup")} type="text" placeholder="Enter your name" required={true} name="name" value={signupInput.name} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input onChange={(e) => handlechange(e, "signup")} name="email" value={signupInput.email} type="email" placeholder="Enter your email" required={true} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input onChange={(e) => handlechange(e, "signup")} name="password" value={signupInput.password} type="password" placeholder="Enter your password" required={true} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled = {registerIsLoading} onClick={() => handleRegistration("signup")}>
                                {
                                    registerIsLoading?(
                                        <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait
                                        </>
                                    ):"Signup"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="Login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Login into your account now!
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input onChange={(e) => handlechange(e, "login")} name="email" value={loginInput.email} type="email" placeholder="Enter email" required={true} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input onChange={(e) => handlechange(e, "login")} name="password" value={loginInput.password} type="password" placeholder="Enter password" required={true} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled = {loginIsLoading} onClick={() => handleRegistration("login")}>
                                {
                                    loginIsLoading ? (
                                        <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait 
                                        </>
                                    ) : "Login"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Login
