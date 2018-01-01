import React from "react";
import LoadingImage from "../assets/loader.gif";

const LoadingPage = () => (
  <div className="loader">
    <br />
    <img className="loader-image" src={LoadingImage} alt="loading logo" />
  </div>
);

export default LoadingPage;
