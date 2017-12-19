import React, { Component } from "react";

import "../style/style.css";
import Navigation from "./Navigation";
import AppBarMain from "./ui-element/AppBarMain";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <AppBarMain />

        <div className="container" style={{ marginTop: 5 }}>
          <div
            className="analog-clock"
            style={{
              textAlign: "center",
              justifyContent: "center",
              padding: 5
            }}
          >
            <iframe
              src="http://free.timeanddate.com/clock/i614dqhc/n942/fn4/fs22/ftb/tt1"
              frameBorder="0"
              width="308"
              height="28"
              title="date"
            />
            <br />
            <iframe
              src="http://free.timeanddate.com/clock/i614crkr/n942/szw270/szh270/hoc222/hbw6/cf100/hgr0/hcw2/hcd88/fan2/fas20/fdi70/mqc000/mqs3/mql13/mqw4/mqd94/mhc000/mhs3/mhl13/mhw4/mhd94/mmc000/mml5/mmw1/mmd94/hwm2/hhs2/hhb18/hms2/hml80/hmb18/hmr7/hscf09/hss1/hsl90/hsr5"
              frameBorder="0"
              width="270"
              height="270"
              title="Analog Clock"
            />
            <br />
            <iframe
              src="http://free.timeanddate.com/clock/i614dbru/n942/fn3/fs48/tct/pct/ftb/th2"
              frameBorder="0"
              width="325"
              height="57"
              allowtransparency="true"
              title="Digital Clock"
            />
          </div>
        </div>
        <Navigation />
        <h1>Home.js</h1>
      </div>
    );
  }
}

export default Home;
