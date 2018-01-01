// At index.js
noInternet().then(offline => {
  let result;
  if (offline) {
    // no internet
    result = (
      <h4 className="animated infinite pulse" id="no-internet-message">
        No Internet Connection Found !
      </h4>
    );
    ReactDOM.render(
      <LoadingPage result={result} />,
      document.getElementById("root")
    );
  } else {
    // internet have
    result = "";
    ReactDOM.render(
      <LoadingPage result={result} />,
      document.getElementById("root")
    );
  }
});

// At LoadingPage.js

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
