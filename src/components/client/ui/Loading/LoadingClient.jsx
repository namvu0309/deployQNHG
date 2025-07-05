import React from "react";
import "./LoadingClient.scss";
import logo from "@assets/client/images/header/logo.png";

const LoadingClient = ({ progress }) => {
  return (
    <div className="loading-content">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="count" id="loading-process-count">
        {progress}%
      </div>
    </div>
  );
};

export default LoadingClient;
