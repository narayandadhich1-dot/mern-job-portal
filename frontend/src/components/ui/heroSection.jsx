import React, { useState } from "react";
import { Button } from "./button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobslice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (e) => {
    e.preventDefault(); 
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="px-4 mx-auto py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          No.1 Job Hunt Platform
        </span>

        <h1 className="text-5xl font-bold">
          Search, Apply <br />& Get Your{" "}
          <span className="text-[#6A38C2]">Dream Job</span>
        </h1>
        <p className="text-lg text-gray-600">
          Find the perfect job that matches your skills and experience.
        </p>
        <form 
          onSubmit={searchJobHandler} 
          className="flex w-[40%] shadow-lg border border-gray-200 pl-4 rounded-full items-center gap-4 mx-auto h-14"
        >
          <input
            type="text"
            placeholder="Search for Jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full h-full text-base"
          />
          <Button type="submit" className="rounded-full h-12 w-12 mr-1 cursor-pointer bg-[#6A38C2]">
            <Search className="h-5 w-5 text-white" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;