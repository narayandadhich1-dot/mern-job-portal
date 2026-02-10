import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setApplicants } from "@/redux/applicationSlice";
import store from "@/redux/store";
import { useSelector } from "react-redux";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  useEffect(() => {
  const fetchAllApplicants = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
        { withCredentials: true }
      );

      dispatch(setApplicants(res.data.applicants));
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  fetchAllApplicants(); 
}, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants ({applicants.length})
        </h1>
        <ApplicantsTable applicants={applicants} />
      </div>
    </div>
  );
};

export default Applicants;
