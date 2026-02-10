import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);

  const [filters, setFilters] = useState({
    location: [],
    industry: [],
    salary: [],
  });

  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (allJobs.length > 0) {
      const filtered = allJobs.filter((job) => {
        const locationMatch =
          filters.location.length === 0 ||
          filters.location.some((loc) =>
            job.location.toLowerCase().includes(loc.toLowerCase())
          );

        const industryMatch =
          filters.industry.length === 0 ||
          filters.industry.some((ind) =>
            job.title.toLowerCase().includes(ind.toLowerCase())
          );

        const salaryMatch =
          filters.salary.length === 0 ||
          filters.salary.includes(job.salary);

        return locationMatch && industryMatch && salaryMatch;
      });
      setFilterJobs(filtered);
    } else {
      setFilterJobs([]);
    }
  }, [allJobs, filters]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard filters={filters} setFilters={setFilters} />
          </div>
          {filterJobs.length <= 0 ? (
            <div className="flex-1 flex justify-center items-center">
              <span className="text-xl font-semibold text-gray-500">No Jobs Found</span>
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <div key={job?._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;