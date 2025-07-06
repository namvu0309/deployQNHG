import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Authmiddleware = (props) => {
  const token = localStorage.getItem("admin_token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{props.children}</>;
};

export default Authmiddleware;
