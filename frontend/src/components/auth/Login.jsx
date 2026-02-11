import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant.js";

import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser, setIsAuthenticated } from "../../redux/authslice.js";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, user } = useSelector((store) => store.auth);
    
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setIsAuthenticated(true));
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            const message =
                error.response?.data?.message || "Invalid email or password";
            toast.error(message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-7xl mx-auto">
                <form
                    onSubmit={submitHandler}
                    className="w-1/2 p-5 border rounded-md my-10"
                >
                    <h1 className="font-bold text-xl mb-5">Login</h1>

                    <div className="my-2">
                        <Label className="mb-1">Email</Label>
                        <Input
                            type="text"
                            value={input.email}
                            onChange={changeEventHandler}
                            name="email"
                            placeholder="Enter your Email"
                        />
                    </div>
                    <div className="my-2">
                        <Label className="mb-1">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            name="password"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <RadioGroup className="flex" defaultValue="comfortable">
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {loading ? (
                        <Button className="w-full my-4 cursor-not-allowed" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait...
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4 cursor-pointer">
                            Login
                        </Button>
                    )}

                    <span>
                        Don't have an account?{" "}
                        <a href="/signup" className="text-blue-500">
                            Sign up
                        </a>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;