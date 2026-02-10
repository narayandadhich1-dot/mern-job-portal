import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not logged in OR is not a recruiter, redirect to home
    if (user === null || user.role !== "recruiter") {
      navigate("/");
    }
  }, [user, navigate]); // Added dependencies for reliability

  // The return must be INSIDE the component function
  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;