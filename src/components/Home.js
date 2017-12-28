import React, { Component } from "react";

import "../style/style.css";
import { Link } from "react-router-dom";
import AppBarMain from "./ui-element/AppBarMain";
import { Card } from "material-ui/Card";

const styles = {
  button: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 3,
    paddingBottom: 3,
    margin: 5
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  }
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <AppBarMain />
        <div class="animated bounceInUp">
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

          <h1 style={{ textAlign: "center" }} class="animated infinite pulse">
            Store Management Software
          </h1>
          <Card className="container">
            <div style={styles.wrapper}>
              <Link to="/">
                <Card style={styles.button}>
                  <h4>Home</h4>
                </Card>
              </Link>
              <Link to="/readycash">
                <Card style={styles.button}>
                  <h4>Ready Cash</h4>
                </Card>
              </Link>
              <Link to="/sell">
                <Card style={styles.button}>
                  <h4>Sells</h4>
                </Card>
              </Link>
              <Link to="/fabrication">
                <Card style={styles.button}>
                  <h4>Fabrication</h4>
                </Card>
              </Link>
              <Link to="/others-income">
                <Card style={styles.button}>
                  <h4>Others Income</h4>
                </Card>
              </Link>
              {/* <Link to="/bank">Bank</Link> */}
              <Link to="/expenses">
                <Card style={styles.button}>
                  <h4>Expenses</h4>
                </Card>
              </Link>
              <Link to="/due">
                <Card style={styles.button}>
                  <h4>Due</h4>
                </Card>
              </Link>
              {/* <Link to="/employee">Employee</Link> */}
              <Link to="/moneyreceipt">
                <Card style={styles.button}>
                  <h4>Money Receipt</h4>
                </Card>
              </Link>
              <Link to="/pad">
                <Card style={styles.button}>
                  <h4>Pad</h4>
                </Card>
              </Link>
              {/* <Link to="/salary">Salary</Link> */}
              <Link to="/stock">
                <Card style={styles.button}>
                  <h4>Stock</h4>
                </Card>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Home;
