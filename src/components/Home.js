import React, { Component } from "react";

import "../style/style.css";
import { Link } from "react-router-dom";
import AppBarMain from "./ui-element/AppBarMain";
import { Card, CardActions } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import Toggle from "material-ui/Toggle";

import { startUpdateStoreInfo } from "../actions/storeInfo/store-info-actions";
import SnackBar from "./ui-element/SnackBar";

const styles = {
  button: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 3,
    paddingBottom: 3,
    margin: 5,
    backgroundColor: "#B3E5FC"
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  link: {
    textDecoration: "none"
  }
};

class Home extends Component {
  // SnackBar Functions
  handleActionTouchTap = () => {
    this.setState({
      snackBar: false
    });
  };

  handleRequestClose = () => {
    this.handleActionTouchTap();
  };

  showSnackBar = message => {
    this.setState({
      snackBar: true,
      snackBarMessage: message
    });
  };
  // End
  handleToggle = (event, toggled) => {
    this.setState({
      toggle: toggled
    });
  };
  handleReset = () => {
    this.setState({ name: "" });
    this.setState({ number1: "" });
    this.setState({ number2: "" });
    this.setState({ number3: "" });
    this.setState({ address: "" });
    this.setState({ password: "" });
  };
  handleNumber1 = event => {
    const number1 = event.target.value;
    if (!number1 || number1.match(/^\d{1,}(\.\d{0})?$/)) {
      this.setState({ number1 });
    }
  };
  handleNumber2 = event => {
    const number2 = event.target.value;
    if (!number2 || number2.match(/^\d{1,}(\.\d{0})?$/)) {
      this.setState({ number2 });
    }
  };
  handleNumber3 = event => {
    const number3 = event.target.value;
    if (!number3 || number3.match(/^\d{1,}(\.\d{0})?$/)) {
      this.setState({ number3 });
    }
  };
  handleName = event => {
    const name = event.target.value;
    this.setState({ name });
  };
  handleAddress = event => {
    const address = event.target.value;
    this.setState({ address });
  };
  handlePassword = event => {
    const password = event.target.value;
    this.setState({ password });
  };
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      snackBar: false,
      snackBarMessage: "",
      name: this.props.storeInfo.name,
      number1: this.props.storeInfo.number1,
      number2: this.props.storeInfo.number2,
      number3: this.props.storeInfo.number3,
      address: this.props.storeInfo.address,
      password: this.props.storeInfo.password
    };
  }
  handleUpdateStoreInfo = () => {
    let StoreInformation = {
      name: this.state.name,
      number1: this.state.number1,
      number2: this.state.number2,
      number3: this.state.number3,
      address: this.state.address,
      password: this.state.password
    };
    // console.log("Sending Call for update store info..");
    this.props.startUpdateStoreInfo(StoreInformation);
    this.showSnackBar("Info Successfully Updated.");
  };
  render() {
    return (
      <div>
        <AppBarMain />
        <div className="animated bounceInUp">
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
                src="https://free.timeanddate.com/clock/i614dqhc/n942/fn4/fs22/ftb/tt1"
                frameBorder="0"
                width="308"
                height="28"
                title="date"
              />
              <br />
              <iframe
                src="https://free.timeanddate.com/clock/i614crkr/n942/szw270/szh270/hoc222/hbw6/cf100/hgr0/hcw2/hcd88/fan2/fas20/fdi70/mqc000/mqs3/mql13/mqw4/mqd94/mhc000/mhs3/mhl13/mhw4/mhd94/mmc000/mml5/mmw1/mmd94/hwm2/hhs2/hhb18/hms2/hml80/hmb18/hmr7/hscf09/hss1/hsl90/hsr5"
                frameBorder="0"
                width="270"
                height="270"
                title="Analog Clock"
              />
              <br />
              <iframe
                src="https://free.timeanddate.com/clock/i614dbru/n942/fn3/fs48/tct/pct/ftb/th2"
                frameBorder="0"
                width="325"
                height="57"
                allowtransparency="true"
                title="Digital Clock"
              />
            </div>
          </div>

          <h1 style={{ textAlign: "center" }}>Store Management Software</h1>
        </div>
        <div className="container">
          <Card style={{ backgroundColor: "#4DB6AC" }}>
            <div style={styles.wrapper}>
              <Link style={styles.link} to="/home">
                <Card className="animated infinite pulse" style={styles.button}>
                  <h4>Home</h4>
                </Card>
              </Link>
              <Link style={styles.link} to="/readycash">
                <Card className="animated infinite pulse" style={styles.button}>
                  <h4>Ready Cash</h4>
                </Card>
              </Link>
              <Link style={styles.link} to="/sell">
                <Card className="animated infinite pulse" style={styles.button}>
                  <h4>Sells</h4>
                </Card>
              </Link>
              <Link style={styles.link} to="/fabrication">
                <Card className="animated infinite pulse" style={styles.button}>
                  <h4>Fabrication</h4>
                </Card>
              </Link>
              <Link style={styles.link} to="/others-income">
                <Card className="animated infinite pulse" style={styles.button}>
                  <h4>Others Income</h4>
                </Card>
              </Link>
              {/* <Link to="/bank">Bank</Link> */}
              <Link style={styles.link} to="/expenses">
                <Card className="animated infinite pulse" style={styles.button}>
                  <h4>Expenses</h4>
                </Card>
              </Link>
              <Link style={styles.link} to="/due">
                <Card className="animated infinite pulse" style={styles.button}>
                  <h4>Due</h4>
                </Card>
              </Link>
              {/* <Link to="/employee">Employee</Link> */}
              <Link style={styles.link} to="/moneyreceipt">
                <Card className="animated infinite pulse" style={styles.button}>
                  <h4>Money Receipt</h4>
                </Card>
              </Link>
              <Link style={styles.link} to="/pad">
                <Card className="animated infinite pulse" style={styles.button}>
                  <h4>Pad</h4>
                </Card>
              </Link>
              {/* <Link to="/salary">Salary</Link> */}
              <Link style={styles.link} to="/stock">
                <Card className="animated infinite pulse" style={styles.button}>
                  <h4>Stock</h4>
                </Card>
              </Link>
              <Link style={styles.link} to="/advance">
                <Card className="animated infinite pulse" style={styles.button}>
                  <h4>Advance</h4>
                </Card>
              </Link>
            </div>
          </Card>
        </div>
        {/* Toggle Section */}
        <div
          style={{ marginLeft: "47%", marginRight: "47%", marginTop: "10px" }}
        >
          <Toggle
            onToggle={this.handleToggle}
            defaultToggled={this.state.toggle}
          />
        </div>
        {/* Form Section */}
        {this.state.toggle && (
          <div className="container">
            <Card style={{ padding: 10, marginTop: 10, marginBottom: 10 }}>
              <h4 style={{ textAlign: "center" }}>
                <strong>Place The Details for PDF :</strong>
              </h4>
              <div style={{ marginLeft: 20 }}>
                <TextField
                  value={this.state.name}
                  onChange={this.handleName}
                  hintText="COMPANY NAME"
                  floatingLabelText="COMPANY NAME"
                />

                <TextField
                  type="number"
                  value={this.state.number1}
                  onChange={this.handleNumber1}
                  hintText="Phone Number One"
                  floatingLabelText="Phone 1 (Unique) "
                />

                <TextField
                  type="number"
                  value={this.state.number2}
                  onChange={this.handleNumber2}
                  hintText="Phone Number Two"
                  floatingLabelText="Phone 2 (Unique) "
                />

                <TextField
                  type="number"
                  value={this.state.number3}
                  onChange={this.handleNumber3}
                  hintText="Phone Number Three"
                  floatingLabelText="Phone 3 (Unique) "
                />

                <TextField
                  value={this.state.address}
                  onChange={this.handleAddress}
                  hintText="COMPANY ADDRESS"
                  floatingLabelText="COMPANY ADDRESS "
                  fullWidth={true}
                />
                <TextField
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePassword}
                  hintText="Store Password Here"
                  floatingLabelText="Password Here"
                />
              </div>
              <CardActions>
                <FlatButton
                  disabled={
                    this.state.name ||
                    this.state.number1 ||
                    this.state.number2 ||
                    this.state.number3 ||
                    this.state.address
                      ? false
                      : true
                  }
                  secondary={true}
                  label="Reset"
                  onClick={this.handleReset}
                />
                <FlatButton
                  disabled={
                    this.state.name &&
                    this.state.number1 &&
                    this.state.number2 &&
                    this.state.address
                      ? false
                      : true
                  }
                  primary={true}
                  label="Save For PDF"
                  onClick={this.handleUpdateStoreInfo}
                />
              </CardActions>
            </Card>
          </div>
        )}
        <SnackBar
          snackBar={this.state.snackBar}
          snackBarMessage={this.state.snackBarMessage}
          handleActionTouchTap={this.handleActionTouchTap}
          handleRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    storeInfo: state.storeInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startUpdateStoreInfo: data => {
      dispatch(startUpdateStoreInfo(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
