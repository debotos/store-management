import React, { Component } from "react";
import { Card, CardActions } from "material-ui/Card";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import isEmail from "validator/lib/isEmail";
import { connect } from "react-redux";
import Dialog from "material-ui/Dialog";

import GENERATE_PDF from "./PDF";
import { addSellUnderCustomerHistory } from "../../../../actions/sells/sells-history-actions";
import { addPrevDue } from "../../../../actions/sells/prevDue-actions";

class CustomerDetailsForm extends Component {
  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };
  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };
  handleReset = () => {
    this.setState({ name: "" });
    this.setState({ number: "" });
    this.setState({ mail: "" });
    this.setState({ deposit: "" });
    this.setState({ address: "" });
  };
  handleName = event => {
    const name = event.target.value;
    this.setState({ name });
  };
  handleMail = event => {
    const mail = event.target.value;
    this.setState({ mail });
  };
  handleAddress = event => {
    const address = event.target.value;
    this.setState({ address });
  };
  calculateAllTotal = () => {
    let Total = 0;
    this.props.sellsTables.total.forEach(singleTotal => {
      Total += parseFloat(singleTotal);
    });
  };
  handleDeposit = event => {
    const deposit = event.target.value;
    this.setState({ deposit });
  };
  handleNumber = event => {
    const number = event.target.value;
    if (!number || number.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ number });
    }
  };
  userAlreadyExists = () => {
    const searchingFor = this.state.number;
    let flag = false;
    let prevDue = 0;
    this.props.due.forEach(singleItem => {
      if (singleItem.number.toString() === searchingFor.toString()) {
        console.log("Existing user");
        flag = true;
        prevDue = singleItem.amount;
      }
    });
    return [flag, prevDue];
  };
  getPrevDue = () => {
    if (this.userAlreadyExists()) {
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      name: "",
      number: "",
      mail: "",
      address: "",
      deposit: "",
      allTotal: this.props.allTotal,
      modelData: ""
    };
  }
  collectSellsData = () => ({
    number: this.state.number,
    allTotal: this.props.allTotal,
    date: Date().substr(0, 15),
    customer: {
      name: this.state.name,
      number: this.state.number,
      mail: this.state.mail,
      address: this.state.address
    },
    history: this.props.sellsTables
  });
  handleSaveAndGeneratePDF = () => {
    if (this.state.mail) {
      if (isEmail(this.state.mail)) {
        // GENERATE_PDF(data);
      } else {
        this.props.showSnackBar("Error ! Invalid Email !");
      }
    } else {
      // GENERATE_PDF(data);
      let allTotalWithPrevDue =
        parseFloat(this.props.allTotal) +
        parseFloat(this.userAlreadyExists()[1]);
      let deposit = this.state.deposit;
      let newDue = allTotalWithPrevDue - parseFloat(deposit);
      this.props.addPrevDue(this.state.number, newDue);
      console.log("History Saving ", this.collectSellsData());
      console.log("History Saving in store");
      this.props.addSellUnderCustomerHistory(this.collectSellsData());
      const modelData = {
        allTotal: this.props.allTotal,
        prevDue: this.userAlreadyExists()[1],
        totalWithDue: allTotalWithPrevDue,
        depositNow: deposit,
        newDue
      };
      this.setState({ modelData });
      this.handleDialogOpen();
    }
  };
  showModelData = modelData => {
    const {
      allTotal,
      prevDue,
      totalWithDue,
      depositNow,
      newDue
    } = this.state.modelData;
    return (
      <div>
        All Table Total: {allTotal}
        <br />
        <strong>Previous Due: </strong>
        <b style={{ color: "red" }}>
          {parseFloat(prevDue).toFixed(2) === parseFloat(0).toFixed(2)
            ? "No Previous Due"
            : parseFloat(prevDue).toFixed(2)}
        </b>
        <br />
        All Total + Previous Due: {totalWithDue}
        <br />
        Deposit Now: {depositNow}
        <br />
        <strong>New Due From Now: </strong>
        <b style={{ color: "red" }}>
          {parseFloat(newDue).toFixed(2) === parseFloat(0).toFixed(2)
            ? "No Due"
            : parseFloat(newDue).toFixed(2)}
        </b>
        <br />
      </div>
    );
  };
  render() {
    const dialogActions = [
      <FlatButton
        label="Okey"
        primary={true}
        onClick={this.handleDialogClose}
      />
    ];
    return (
      <div className="container" style={{ marginTop: 15, marginBotton: 15 }}>
        <Card className="container" style={{ margin: 5, padding: 30 }}>
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
                type="number"
                value={this.state.number}
                onChange={this.handleNumber}
                hintText="Phone Number"
                floatingLabelText="Phone (Unique) "
              />
              <TextField
                type="number"
                value={this.state.deposit}
                onChange={this.handleDeposit}
                hintText="Deposit"
                floatingLabelText="Deposit Amount"
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
                this.state.name && this.state.number && this.state.address
                  ? false
                  : true
              }
              primary={true}
              label="Save & Get PDF"
              onClick={this.handleSaveAndGeneratePDF}
            />
          </CardActions>
        </Card>
        <Dialog
          title="Addetional Information:"
          actions={dialogActions}
          modal={true}
          open={this.state.dialogOpen}
        >
          {this.showModelData()}
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSellUnderCustomerHistory: data => {
      dispatch(addSellUnderCustomerHistory(data));
    },
    addPrevDue: (number, amount) => {
      dispatch(addPrevDue(number, amount));
    }
  };
};

const mapStateToProps = state => {
  return {
    sellsTables: state.sells,
    sellsHistory: state.sellsHistory,
    due: state.due
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CustomerDetailsForm
);
