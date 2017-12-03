import React, { Component } from "react";
import { Card, CardActions } from "material-ui/Card";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";

import GENERATE_PDF from "./PDF";

class CustomerDetailsForm extends Component {
  handleReset = () => {
    this.setState({ name: "" });
    this.setState({ number: "" });
    this.setState({ mail: "" });
    this.setState({ address: "" });
  };
  handleName = event => {
    const name = event.target.value;
    this.setState({ name });
  };
  handleNumber = event => {
    const number = event.target.value;
    if (!number || number.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ number });
    }
  };
  handleMail = event => {
    const mail = event.target.value;
    this.setState({ mail });
  };
  handleAddress = event => {
    const address = event.target.value;
    this.setState({ address });
  };
  collectAllData = () => ({
    customer: {
      name: this.state.name,
      number: this.state.number,
      mail: this.state.mail,
      address: this.state.address
    },
    sellingItems: this.props.sellsTable,
    allTotal: this.props.AllTotal
  });

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      number: "",
      mail: "",
      address: ""
    };
  }
  handleGeneratePDF = () => {
    const data = this.collectAllData();
    GENERATE_PDF(data);
  };
  render() {
    return (
      <div className="container" style={{ marginTop: 15, marginBotton: 15 }}>
        <Card className="container" style={{ margin: 5, padding: 40 }}>
          <h4>
            <b>Input Customer Details</b>
          </h4>
          {/* All Fields */}
          <div>
            <div className="col-sm-6">
              <TextField
                value={this.state.name}
                onChange={this.handleName}
                hintText="Name here"
                floatingLabelText="Place the Customer Name "
              />
              <br />
              <TextField
                value={this.state.number}
                onChange={this.handleNumber}
                hintText="Phone Number"
                floatingLabelText="Place Customer Contact no "
              />
            </div>
            <div className="col-sm-6">
              <TextField
                type="mail"
                value={this.state.mail}
                onChange={this.handleMail}
                hintText="E-mail Address"
                floatingLabelText="Email Address Here"
              />
              <br />
              <TextField
                value={this.state.address}
                onChange={this.handleAddress}
                hintText="Address here"
                floatingLabelText="Place the Address "
              />
            </div>
          </div>
          <CardActions style={{ float: "right" }}>
            <FlatButton
              disabled={
                this.state.name ||
                this.state.number ||
                this.state.mail ||
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
                this.state.number &&
                this.state.mail &&
                this.state.address
                  ? false
                  : true
              }
              primary={true}
              label="Generate PDF"
              onClick={this.handleGeneratePDF}
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default CustomerDetailsForm;

// &&
// this.props.sellsTable[0]
