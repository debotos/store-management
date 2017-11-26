import React, { Component } from "react";

import Navigation from "./Navigation";
import AppBarMain from "./ui-element/AppBarMain";

class Home extends Component {
  render() {
    return (
      <div>
        <AppBarMain />
        <Navigation />
        <h1>Home.js</h1>
      </div>
    );
  }
}

export default Home;
