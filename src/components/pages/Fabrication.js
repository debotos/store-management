import React, { Component } from "react";

import AppBarMain from "../ui-element/AppBarMain";
import Form from "./subPages/fabrication/Form";
// import "../../style/fabrication/fabrication.css";

class Fabrication extends Component {
  render() {
    return (
      <div className="fabrication-main-container">
        <AppBarMain title={"Fabrication"} />
        <div className="container">
          <Form />
        </div>
      </div>
    );
  }
}

export default Fabrication;
