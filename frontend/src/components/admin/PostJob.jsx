import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies = [] } = useSelector((store) => store.company);
  const changeEventHandler = (e) => {
    const { name, value } = e.target;

    if (name === "salary" || name === "experience" || name === "position") {
      setInput({
        ...input,
        [name]: value === "" ? "" : Number(value),
      });
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }
  };

  const selectChangeHandler = (value) => {
    setInput({ ...input, companyId: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Submitting Payload:", input);

    if (!input.companyId) {
      toast.error("Please select a company before posting.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data?.success) {
        toast.success(res.data?.message || "Job posted successfully");
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error("Post Job Error:", error.response?.data);
      toast.error(
        error.response?.data?.message ||
          "All fields are required or invalid data.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-start min-h-screen bg-gray-50 py-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-4xl bg-white border border-gray-200 rounded-xl shadow-lg p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>Job Title</Label>
              <Input
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="e.g. Frontend Developer"
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="e.g. Full-time"
              />
            </div>

            <div className="md:col-span-2">
              <Label>Description</Label>
              <Input
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Describe the role..."
              />
            </div>

            <div className="md:col-span-2">
              <Label>Requirements</Label>
              <Input
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="e.g. React, Node.js"
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="e.g. Remote / Bangalore"
              />
            </div>
            <div>
              <Label>Salary (LPA)</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="e.g. 6"
              />
            </div>
            <div>
              <Label>Experience (Years)</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="e.g. 2"
              />
            </div>

            <div>
              <Label>Open Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>

            {companies.length > 0 && (
              <div className="md:col-span-2">
                <Label>Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company._id}
                          className="cursor-pointer"
                        >
                          {company?.name ||
                            company?.companyName ||
                            "Unnamed Company"}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="mt-8">
            {loading ? (
              <Button className="w-full mt-4" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full mt-4">
                Post Job
              </Button>
            )}
          </div>

          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first before posting a job.
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default PostJob;
