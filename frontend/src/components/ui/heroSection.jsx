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
    <div className="relative h-[90vh] w-full flex items-center justify-center text-center bg-cover bg-center bg-no-repeat" 
         style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')",
            backgroundAttachment: "fixed" 
         }}>
      
      {/* Overlay: Dark at top for Navbar visibility, White at bottom to blend with content */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/20 to-white z-0"></div>

      <div className="relative z-10 flex flex-col gap-5 max-w-4xl px-4 mt-20"> {/* Increased mt to 20 for better spacing */}
        <span className="px-4 mx-auto py-2 rounded-full bg-white/10 backdrop-blur-lg text-white border border-white/20 font-medium shadow-sm">
          No.1 Job Hunt Platform
        </span>

        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
          Search, Apply <br />& Get Your{" "}
          <span className="text-[#9b72e9]">Dream Job</span>
        </h1>
        
        <p className="text-lg text-gray-100 font-medium drop-shadow-sm max-w-2xl mx-auto">
          Find the perfect job that matches your skills and experience.
        </p>

        <form 
          onSubmit={searchJobHandler} 
          className="flex w-full md:w-[90%] lg:w-[80%] shadow-2xl bg-white border border-gray-100 pl-6 rounded-full items-center gap-4 mx-auto h-16 mt-6 transition-all focus-within:ring-2 focus-within:ring-[#6A38C2]/50"
        >
          <input
            type="text"
            placeholder="Search for Jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full h-full text-base bg-transparent text-gray-800"
          />
          <Button type="submit" className="rounded-full h-12 w-12 mr-2 cursor-pointer bg-[#6A38C2] hover:bg-[#5a2fb0] transition-all flex items-center justify-center">
            <Search className="h-5 w-5 text-white" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;