import React, { Component } from "react";
import AppBarMain from "../ui-element/AppBarMain";
import "../../style/pad/pad.css";
import RaisedButton from "material-ui/RaisedButton";
import { Card } from "material-ui/Card";
import {
  COMPANY_NAME,
  COMPANY_ADDRESS,
  COMPANY_PHONE_NUMBER
} from "../global/global";
// import Navigation from "../Navigation";
var PrintTemplate = require("react-print");

class Pad extends Component {
  print = () => {
    window.print();
  };
  constructor(props) {
    super(props);
    this.state = {
      note: ""
    };
  }
  onNoteChange = event => {
    const note = event.target.value;
    this.setState({ note });
  };
  render() {
    return (
      <div className="background">
        <div id="react-no-print">
          <AppBarMain title={"Your Pad"} />
          <div className="container">
            <Card style={{ borderRadius: "20px", marginTop: 10, padding: 5 }}>
              <h3 style={{ textAlign: "center" }}>Pad</h3>
            </Card>
          </div>
          <div style={{ marginTop: 10 }} className="container">
            <Card style={{ padding: 15, borderRadius: "20px" }}>
              <textarea
                className="textarea"
                placeholder="Add your note "
                value={this.state.note}
                onChange={this.onNoteChange}
              />
            </Card>
          </div>
          <div style={{ textAlign: "center", marginTop: 10, marginBottom: 20 }}>
            <RaisedButton onClick={this.print} label="print" />
          </div>
        </div>
        <br />
        <div id="print-mount">
          <PrintTemplate>
            <div>
              <h1 style={{ textAlign: "center" }}>{COMPANY_NAME}</h1>
              <h3 style={{ textAlign: "center" }}>PAD</h3>
              <div className="header">
                <div>
                  {/* Left part */}
                  <strong>For All Kinds of - </strong>
                  <br />
                  Glass SS Pipe<br />
                  Thai Aluminium<br />
                  False Celling<br />
                  Accessories
                </div>
                {/* middle part */}

                {/* Right part */}
                <div>
                  <strong>show Room & Sales Center</strong>
                  <br />
                  {COMPANY_ADDRESS.substr(0, 28)}
                  <br />
                  {COMPANY_ADDRESS.substr(29, 36)}
                  <br />
                  phone numbers:<br />
                  {COMPANY_PHONE_NUMBER.map((singleNumber, index) => (
                    <span key={index}>
                      {singleNumber}
                      <br />
                    </span>
                  ))}
                </div>
              </div>
              <hr />
              <br />
              <div className="content" style={{ fontSize: "x-large" }}>
                {this.state.note}
              </div>
            </div>
          </PrintTemplate>
        </div>
      </div>
    );
  }
}

export default Pad;
