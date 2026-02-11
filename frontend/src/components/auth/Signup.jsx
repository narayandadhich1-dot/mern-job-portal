import { use, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant.js"
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading } from "../../redux/authslice.js";

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: "",
    });

    const navigate = useNavigate();
    const { loading } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    // --- NEW VALIDATION LOGIC ---
    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{10}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

        if (!input.fullname.trim()) {
            toast.error("Full name is required.");
            return false;
        }
        if (!emailRegex.test(input.email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }
        if (!mobileRegex.test(input.phoneNumber)) {
            toast.error("Please enter a valid 10-digit mobile number.");
            return false;
        }
        if (!passwordRegex.test(input.password)) {
            toast.error("Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.");
            return false;
        }
        if (!input.role) {
            toast.error("Please select a role (Student or Recruiter).");
            return false;
        }
        return true;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log("Error during signup:", error);
            toast.error(
                error.response?.data?.message || "Signup failed. Please try again."
            );
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
                    <h1 className="font-bold text-xl mb-5">Sign Up</h1>
                    <div className="my-2">
                        <Label className="mb-1">Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            name="fullname"
                            placeholder="Enter your full name"
                        />
                    </div>
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
                        <Label className="mb-1">Mobile Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            name="phoneNumber"
                            placeholder="Enter your mobile number"
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
                        <p className="text-[10px] text-gray-500 mt-1">
                            Min. 8 chars, 1 uppercase, 1 number, 1 symbol.
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <RadioGroup className="flex">
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label>Student</Label>
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
                                <Label>Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className="flex items-center gap-2">
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                    {loading ? (
                        <Button className="w-full my-4 cursor-not-allowed" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait...
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4 cursor-pointer">
                            Sign Up
                        </Button>
                    )}

                    <span>
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-500">
                            Login
                        </a>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Signup;