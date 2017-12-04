import React, { Component } from "react";

import AppBarMain from "../ui-element/AppBarMain";
import NotFoundPageImage from "../../assets/images/not-found-page.svg";
// import Navigation from "../Navigation";

class NotFoundpage extends Component {
  render() {
    return (
      <div>
        <AppBarMain />
        <div style={{ textAlign: "center" }}>
          <h1>SORRY !!</h1>
          <h2 style={{ color: "red" }}>Page Not Found !</h2>
          <h3>
            Please Check your <strong>URL</strong> !
          </h3>
          <img
            style={{ marginTop: 10 }}
            src={NotFoundPageImage}
            alt="Not Found Page Image"
          />
        </div>
      </div>
    );
  }
}

export default NotFoundpage;
