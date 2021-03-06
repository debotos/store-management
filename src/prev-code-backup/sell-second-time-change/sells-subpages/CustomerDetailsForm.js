import React, { Component } from "react";
import { Card, CardActions } from "material-ui/Card";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import isEmail from "validator/lib/isEmail";
import { connect } from "react-redux";
import Dialog from "material-ui/Dialog";

import GENERATE_PDF from "./PDF";
import { startIncrementMemoNumber } from "../../../../actions/sells/memo-no-actions";
import { removeAllSellsItem } from "../../../../actions/sells/sells-actions";
import { startAddSellUnderCustomerHistory } from "../../../../actions/sells/sells-history-actions";
import { startAddPrevDue } from "../../../../actions/sells/prevDue-actions";

class CustomerDetailsForm extends Component {
  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };
  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
    this.props.removeAllSellsItem();
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
    if (!deposit || deposit.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ deposit });
    }
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
    customer: {
      name: this.state.name,
      number: this.state.number,
      mail: this.state.mail,
      address: this.state.address
    },
    history: this.props.sellsTables
  });

  handleSaveAndGeneratePDF = () => {
    let allTotalWithPrevDue =
      parseFloat(this.props.allTotal) + parseFloat(this.userAlreadyExists()[1]);
    if (this.state.mail) {
      if (isEmail(this.state.mail)) {
        if (parseFloat(allTotalWithPrevDue) >= parseFloat(this.state.deposit)) {
          let deposit = parseFloat(this.state.deposit).toFixed(2);
          let newDue = (allTotalWithPrevDue - parseFloat(deposit)).toFixed(2);
          this.props.startAddPrevDue(this.state.number, newDue);
          console.log("History Saving in store");
          this.props.startAddSellUnderCustomerHistory(this.collectSellsData());
          const modelData = {
            allTotal: this.props.allTotal,
            prevDue: this.userAlreadyExists()[1],
            totalWithDue: allTotalWithPrevDue,
            depositNow: deposit,
            newDue
          };
          this.setState({ modelData });
          this.handleDialogOpen();
          const dataForPDF = {
            tables: this.props.sellsTables,
            customer: {
              name: this.state.name,
              number: this.state.number,
              mail: this.state.mail,
              address: this.state.address,
              allTotal: this.props.allTotal,
              prevDue: this.userAlreadyExists()[1],
              totalWithDue: allTotalWithPrevDue,
              depositNow: deposit,
              newDue
            },
            memoNumber: this.props.memoNumber
          };

          GENERATE_PDF(dataForPDF);

          this.handleReset();
          this.props.startIncrementMemoNumber();
        } else {
          this.props.showSnackBar("Error! Valid Deposit Please!");
        }
      } else {
        this.props.showSnackBar("Error ! Invalid Email !");
      }
    } else {
      if (parseFloat(allTotalWithPrevDue) >= parseFloat(this.state.deposit)) {
        let deposit = parseFloat(this.state.deposit).toFixed(2);
        let newDue = (allTotalWithPrevDue - parseFloat(deposit)).toFixed(2);
        this.props.startAddPrevDue(this.state.number, newDue);
        console.log("History Saving in store");
        this.props.startAddSellUnderCustomerHistory(this.collectSellsData());
        const modelData = {
          allTotal: this.props.allTotal,
          prevDue: this.userAlreadyExists()[1],
          totalWithDue: allTotalWithPrevDue,
          depositNow: deposit,
          newDue
        };
        this.setState({ modelData });
        this.handleDialogOpen();
        const dataForPDF = {
          tables: this.props.sellsTables,
          customer: {
            name: this.state.name,
            number: this.state.number,
            mail: this.state.mail,
            address: this.state.address,
            allTotal: this.props.allTotal,
            prevDue: this.userAlreadyExists()[1],
            totalWithDue: allTotalWithPrevDue,
            depositNow: deposit,
            newDue
          },
          memoNumber: this.props.memoNumber
        };

        GENERATE_PDF(dataForPDF);

        this.handleReset();
        this.props.startIncrementMemoNumber();
      } else {
        this.props.showSnackBar("Error! Valid Deposit Please!");
      }
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
      <div>
        <div className="container" style={{ marginTop: 10, marginBottom: 10 }}>
          <Card style={{ padding: 40 }}>
            <h4>
              <b>Input Customer Details</b>
            </h4>
            {/* All Fields */}

            <TextField
              value={this.state.name}
              onChange={this.handleName}
              hintText="Name here"
              floatingLabelText="Place the Customer Name "
            />

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
          </Card>
        </div>
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
    startAddSellUnderCustomerHistory: data => {
      dispatch(startAddSellUnderCustomerHistory(data));
    },
    startAddPrevDue: (number, amount) => {
      dispatch(startAddPrevDue(number, amount));
    },
    startIncrementMemoNumber: () => {
      dispatch(startIncrementMemoNumber());
    },
    removeAllSellsItem: () => {
      dispatch(removeAllSellsItem());
    }
  };
};

const mapStateToProps = state => {
  return {
    sellsTables: state.sells,
    sellsHistory: state.sellsHistory,
    due: state.due,
    memoNumber: state.memoNumber.memoNumber
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CustomerDetailsForm
);
