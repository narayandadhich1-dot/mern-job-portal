import { setAllJobs } from "@/redux/jobslice";
import store from "@/redux/store";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const useGetAllJobs = () => {
  const disptach = useDispatch();
  const searchedQuery = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
          { withCredentials: true },
        );
        if (res.data.success) {
          disptach(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, []);
};
export default useGetAllJobs;
