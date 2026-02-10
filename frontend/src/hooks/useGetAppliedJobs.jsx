import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllAppliedJobs } from "../redux/jobslice.js";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    console.log("FETCHED APPLICATIONS:", res.data.applications);
                    dispatch(setAllAppliedJobs(res.data.applications));
                }
            } catch (error) {
                console.log("Error in useGetAppliedJobs:", error);
            }
        };
        fetchAppliedJobs();
    }, [dispatch]); 
};

export default useGetAppliedJobs;