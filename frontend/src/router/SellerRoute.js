import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SellerRoute = ({ component: Component, ...rest }) => {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  return userInfo && userInfo.isSeller ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
};

export default SellerRoute;
