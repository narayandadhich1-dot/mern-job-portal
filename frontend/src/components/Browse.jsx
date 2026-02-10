import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";

const Browse = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  const filteredJobs = allJobs.filter((job) =>
    job.title.toLowerCase().includes(searchedQuery.toLowerCase())
  );


  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({filteredJobs.length})
        </h1>

        {filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No jobs found for this category
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-4 mt-5">
            {filteredJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
