import React from "react";
import LatestJobCards from "../LatestJobCards";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { useNavigate } from "react-router-dom";



const LatestJob = () => {
  const navigate = useNavigate();
  const{allJobs} = useSelector(store => store.job)
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="font-bold text-4xl">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length === 0  ?  <span>NO JOB AVAILABLE </span> : allJobs.slice(0, 6).map((job) => (
          <LatestJobCards  key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default LatestJob;
