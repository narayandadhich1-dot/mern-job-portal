import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { User2Icon, LogOut } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authslice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Hook to check current route

  // Check if we are on the Home page
  const isHomePage = location.pathname === "/";

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    // Logic: If Home -> Absolute & Transparent. If Admin/Jobs -> Relative & White background.
    <div className={`${isHomePage ? 'absolute' : 'relative bg-white border-b border-gray-200'} top-0 left-0 w-full z-50 transition-all duration-300`}>
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <Link to="/">
            <h1 className={`text-2xl font-bold ${isHomePage ? 'text-white' : 'text-gray-800'}`}>
              Job<span className="text-[#F83002]">Portal</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-12">
          {/* Logic: Change text color based on page */}
          <ul className={`flex font-medium items-center gap-5 ${isHomePage ? 'text-white' : 'text-gray-600'}`}>
            {user && user.role === "recruiter" ? (
              <>
                <li className="hover:text-[#F83002] transition-all cursor-pointer">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="hover:text-[#F83002] transition-all cursor-pointer">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-[#F83002] transition-all cursor-pointer">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-[#F83002] transition-all cursor-pointer">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="hover:text-[#F83002] transition-all cursor-pointer">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" className={`${isHomePage ? 'text-white hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'}`}>
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] text-white hover:bg-[#5b30a6]">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className={`cursor-pointer border-2 ${isHomePage ? 'border-white/20' : 'border-gray-200'}`}>
                  <AvatarImage
                    src={user?.profile?.profilePicture || "https://github.com/shadcn.png"}
                    alt="profile"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                {/* User details content remains the same */}
                <div className="flex items-center gap-3 pb-3 border-b">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.profile?.profilePicture || "https://github.com/shadcn.png"} alt="profile" />
                  </Avatar>
                  <div className="leading-tight">
                    <h4 className="font-semibold text-sm">{user?.fullname}</h4>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-col text-sm">
                  {user && user.role === "student" && (
                    <div className="flex items-center px-2 py-2 rounded-md hover:bg-muted transition text-left cursor-pointer">
                      <User2Icon className="mr-2 h-4 w-4" />
                      <Link to="/profile">View Profile</Link>
                    </div>
                  )}
                  <button onClick={logoutHandler} className="flex items-center px-2 py-2 rounded-md text-red-600 hover:bg-red-50 cursor-pointer transition text-left">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;