import React, { Component } from "react";
import TextField from "material-ui/TextField";
import { Card, CardActions, CardHeader } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import { connect } from "react-redux";

import { addBank } from "../../../../actions/bank-actions";
import AddBankImage from "../../../../../src/assets/images/bankAdd.ico";
import "../../../../style/Bank/bank.css";

class AddBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankName: "",
      accountNumber: "",
      submitEnable: true
    };
  }

  handleBankName = event => {
    const bankName = event.target.value.trim();
    if (bankName.length > 0) {
      this.setState({ bankName });
      if (this.state.accountNumber.length > 0) {
        this.setState({ submitEnable: false });
      }
    }
  };

  handleAccountNumber = event => {
    const accountNumber = event.target.value.trim();
    if (accountNumber.length > 0) {
      this.setState({ accountNumber });
      if (this.state.bankName.length > 0) {
        this.setState({ submitEnable: false });
      }
    }
  };

  handleSubmit = event => {
    this.setState({ submitEnable: true });
    const bankName = this.state.bankName;
    const accountNumber = this.state.accountNumber;
    this.props.showSnackBar(`${bankName} added Successfully !`);
    console.log(`[AddBank.js] State is : ${bankName} ${accountNumber}`);
    // Now adding a bank
    this.props.addBank(bankName, accountNumber);
    this.setState({ bankName: "", accountNumber: "" });
  };

  render() {
    return (
      <div>
        <Card className="bank-add-card">
          <CardHeader
            title="Add a Bank"
            subtitle="NOTE: Both field is required"
            avatar={AddBankImage}
          />
          <TextField
            value={this.state.bankName}
            onChange={this.handleBankName}
            hintText="Bank Name Here"
          />
          <br />
          <TextField
            value={this.state.accountNumber}
            onChange={this.handleAccountNumber}
            hintText="Bank Account Number"
          />
          <CardActions>
            <FlatButton
              onClick={this.handleSubmit}
              disabled={this.state.submitEnable}
              label="Add Bank"
              primary={true}
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("[AddBank.js] state: ", state.bank);
  return {
    banks: state.bank
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addBank: (name, account_number) => {
      dispatch(addBank(name, account_number));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBank);
