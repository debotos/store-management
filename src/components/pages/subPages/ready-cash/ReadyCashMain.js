import React, { Component } from "react";
import ReactCountdownClock from "react-countdown-clock";

import AppBarMain from "../../../ui-element/AppBarMain";
// import Navigation from "../Navigation";

class ReadyCashMain extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ready-cash-main-container">
        <AppBarMain title={"Ready Cash"} />

        <div>
          <h1>Ready Cash Main page</h1>
        </div>
      </div>
    );
  }
}

export default ReadyCashMain;
