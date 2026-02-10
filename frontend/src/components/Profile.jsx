import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobsTable from "./AppliedJobsTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";
const Profile = () => {
  useGetAppliedJobs();

const jobState = useSelector(store => store.job);
console.log("JOB SLICE STATE:", jobState);

  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-sm">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 border">
              <AvatarImage
                src={user?.profile?.profilePicture || "https://github.com/shadcn.png"}
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-bold text-2xl text-gray-800">{user?.fullname || "User Name"}</h1>
              <p className="text-gray-600 mt-1">{user?.profile?.bio || "No bio added yet"}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant="outline" size="icon" className="rounded-full">
            <Pen className="h-4 w-4" />
          </Button>
        </div>

        <div className="my-8 space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="h-5 w-5 text-gray-400" />
            <span>{user?.email || "Email not available"}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Contact className="h-5 w-5 text-gray-400" />
            <span>{user?.phoneNumber || "Phone not available"}</span>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-semibold text-lg mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((item, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-400 italic">No skills added yet.</span>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t">
          <Label className="text-md font-bold block mb-2">Resume</Label>
          {user?.profile?.resume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
            >
              <span className="underline underline-offset-4">
                {user?.profile?.resumeOriginalName || "View Uploaded Resume"}
              </span>
            </a>
          ) : (
            <span className="text-gray-400 italic">No resume uploaded yet.</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="font-bold text-xl my-5 px-2">Applied Jobs</h1>
        <AppliedJobsTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;