import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  return userInfo && userInfo.isAdmin ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoute;
