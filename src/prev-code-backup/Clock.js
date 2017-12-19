import React, { Component } from "react";
import { Card } from "material-ui/Card";

import AppBarMain from "./ui-element/AppBarMain";

class Home extends Component {
  getDate = () => {
    var time = new Date();
    time = time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true
    });
    let finalDate = `${Date()
      .substr(0, 15)
      .toString()} ${time}`;
    console.log(finalDate);
    return finalDate.toString();
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: this.getDate()
      });
    }, 1000);
  }
  constructor(props) {
    super(props);
    this.state = {
      time: null
    };
  }

  render() {
    return (
      <div>
        <AppBarMain />
        <div className="container" style={{ marginTop: 5 }}>
          <Card
            style={{
              textAlign: "center",
              justifyContent: "center",
              padding: 5,
              backgroundColor: "#AAAAAA"
            }}
          >
            <h1>{this.state.time}</h1>;
          </Card>
        </div>
      </div>
    );
  }
}

export default Home;
