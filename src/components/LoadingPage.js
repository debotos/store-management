import React from "react";
import LoadingImage from "../assets/loader.gif";

const LoadingPage = props => (
  <div className="loader">
    <div>{props.result}</div>
    <br />
    <img className="loader-image" src={LoadingImage} alt="loading logo" />
  </div>
);

export default LoadingPage;
