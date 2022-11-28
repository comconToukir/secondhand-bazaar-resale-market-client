import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import { UserContext } from "../../../contexts/UserContext/UserContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();

  if (loading) return <Loading />;

  if (user) return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
