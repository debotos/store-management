import React from "react";
import LoadingImage from "../assets/loader.gif";

const LoadingPage = () => (
  <div className="loader">
    <img className="loader-image" src={LoadingImage} alt="loading logo" />
  </div>
);

export default LoadingPage;
