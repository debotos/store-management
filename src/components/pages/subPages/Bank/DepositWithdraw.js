import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardActions, CardHeader } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";

import BankImage from "../../../../../src/assets/images/bankMoney.ico";
import "../../../../style/Bank/bank.css";

class DepositWithdraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bank_account_number: "",
      amount: "",
      balance: ""
    };
    this.getBalance();
  }

  handleDeposit = event => {
    this.getBalance();
  };

  handleWithdraw = event => {};

  handleAmount = event => {
    const amount = event.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  handleChange = (event, index, value) => {
    const setBankAccountToState = val => {
      return new Promise((resolve, reject) => {
        resolve(val);
      });
    };
    setBankAccountToState(value)
      .then(val => {
        this.setState({ bank_account_number: val });
      })
      .then(() => {
        this.getBalance();
      });
  };

  getBalance = () => {
    const account_number = this.state.bank_account_number;
    let balance;
    if (account_number !== "") {
      const banks = this.props.banks;
      for (let bank of banks) {
        if (bank.hasOwnProperty("bank_account_number")) {
          if (bank["bank_account_number"] === account_number) {
            balance = bank["amount"];
            this.setState({ balance });
          }
        }
      }
    }
  };

  render() {
    return (
      <Card className="deposit-withdraw-card">
        <CardHeader
          title="select bank for Balance"
          subtitle="Select a bank"
          avatar={BankImage}
        />

        <h3>
          Balance:{" "}
          {this.state.balance !== "" &&
          this.state.balance !== "undefined" &&
          this.props.banks.length > 0 ? (
            this.state.balance
          ) : (
            <b style={{ color: "red" }}>Select ?</b>
          )}
        </h3>

        {this.props.banks.length > 0 ? (
          <div>
            <DropDownMenu
              value={
                this.state.bank_account_number === ""
                  ? ""
                  : this.state.bank_account_number
              }
              onChange={this.handleChange}
            >
              {this.props.banks.map(bank => {
                return (
                  <MenuItem
                    key={bank.bank_account_number}
                    value={bank.bank_account_number}
                    label={bank.bank_account_number}
                    primaryText={bank.bank_name}
                  />
                );
              })}
            </DropDownMenu>
          </div>
        ) : (
          <h3 style={{ color: "red" }}>First add a Bank !</h3>
        )}
        <TextField
          value={this.state.amount}
          disabled={this.props.banks.length > 0 ? false : true}
          onChange={this.handleAmount}
          hintText="Amount here to Add or Remove"
          floatingLabelText="Amount here to Add or Remove"
        />
        <CardActions>
          <RaisedButton
            disabled={
              this.props.banks.length > 0 && this.state.amount !== ""
                ? false
                : true
            }
            onClick={this.handleDeposit}
            label="Deposit"
            primary={true}
          />
          <RaisedButton
            disabled={
              this.props.banks.length > 0 && this.state.amount !== ""
                ? false
                : true
            }
            onClick={this.handleWithdraw}
            label="Withdraw"
            secondary={true}
          />
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  console.log("[AddBank.js] state: ", state.bank);
  return {
    banks: state.bank
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     addBank: (name, account_number) => {
//       dispatch(addBank(name, account_number));
//     }
//   };
// };

export default connect(mapStateToProps, null)(DepositWithdraw);
