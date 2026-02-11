import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor,
} from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User2Icon, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authslice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () =>{
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true})
      if(res.data.success){
        dispatch(setUser(null));
        navigate("/login");
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="bg-white ">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <Link to="/">
            <h1 className="text-2xl font-bold">
              Job<span className="text-[#F83002]">Portal</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">

            {
              user && user.role === 'recruiter' ? (
                <>
                 <li>
              <Link to="/admin/companies">Companies</Link>
            </li>
            <li>
              <Link to="/admin/jobs">Jobs</Link>
            </li>
                
                </>
              ) : (

                <>

                 <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/browse">Browse</Link>
            </li>
          

          </>

              )
            }

           </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] text-white hover:bg-[#5b30a6] cursor-pointer">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
  <PopoverTrigger asChild>
    <Avatar className="cursor-pointer">
    
<AvatarImage
  src={user?.profile?.profilePicture || "https://github.com/shadcn.png"}
  alt="profile"
/>
    </Avatar>
  </PopoverTrigger>
  <PopoverContent className="w-80 p-4">
    
    <div className="flex items-center gap-3 pb-3 border-b">
      <Avatar className="h-10 w-10">
        
<AvatarImage
  src={user?.profile?.profilePicture || "https://github.com/shadcn.png"}
  alt="profile"
/>
      </Avatar>
      <div className="leading-tight">
        <h4 className="font-semibold text-sm">
          {user?.fullname || "User Name"}
        </h4>
        <p className="text-xs text-muted-foreground">
          {user?.email || "User Email"}
        </p>
      </div>
    </div>

    <div className="mt-3 flex flex-col text-sm">
      
      {user && user.role === 'student' && (
        <button className="flex items-center px-2 py-2 rounded-md hover:bg-muted transition text-left">
          <User2Icon className="mr-2 h-4 w-4" /> 
          <Link to="/profile">View Profile</Link>
        </button>
      )}

      <button
        onClick={logoutHandler}
        className="flex items-center px-2 py-2 rounded-md outline-none text-red-600 hover:bg-red-50 outline-1 cursor-pointer transition text-left"
      >
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
