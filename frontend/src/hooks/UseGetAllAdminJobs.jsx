import { setAllAdminJobs } from "@/redux/jobslice"; // Fixed naming: JObs -> Jobs
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react"; 
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, { withCredentials: true });
                if (res.data.success) {
                    // This must match the name in your Redux slice exactly
                    dispatch(setAllAdminJobs(res.data.jobs)); 
                }
            } catch (error) {
                console.log("Error fetching admin jobs:", error);
            }
        };
        fetchAllAdminJobs();
    }, [dispatch]); 
};

export default useGetAllAdminJobs;