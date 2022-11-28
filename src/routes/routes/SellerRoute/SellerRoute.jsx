import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import { UserContext } from "../../../contexts/UserContext/UserContext";
import useCheckRole from './../../../hooks/useCheckRole';

const SellerRoute = ({ children }) => {
  const location = useLocation();

  const { user, loading } = useContext(UserContext);
  const [role, isRoleLoading] = useCheckRole(user.email);

  if (loading || isRoleLoading) return <Loading />;

  if (role === "seller") return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default SellerRoute;