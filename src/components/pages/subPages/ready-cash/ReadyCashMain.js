import React, { Component } from "react";
import ReactCountdownClock from "react-countdown-clock";
import { Card, CardActions, CardTitle } from "material-ui/Card";
import numeral from "numeral";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import SvgIcon from "material-ui/SvgIcon";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

import AppBarMain from "../../../ui-element/AppBarMain";
import ReadyCashIncomeList from "./ReadyCashIncomeList";
import ReadyCashExpensesList from "./ReadyCashExpensesList";
import ReadyCashTotal from "./ReadyCashTotal";
import { ExpenseList } from "../expenses/ExpensesList";
import { startResetReadyCash } from "../../../../actions/ready-cash/ready-cash-actions";
import { startUpdateReadyCash } from "../../../../actions/ready-cash/ready-cash-amount-actions";
// import Navigation from "../Navigation";

class ReadyCashMain extends Component {
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleResetAllData = () => {
    this.handleClose();
    this.props.startResetReadyCash();
    this.props.startUpdateReadyCash(
      parseFloat(this.calculateIncomeTotal() - this.calculateExpensesTotal())
    );
  };
  calculateExpensesTotal = () => {
    let expensesTotal = 0;
    this.props.readyCash.expenses.forEach(singleItem => {
      expensesTotal = parseFloat(expensesTotal) + parseFloat(singleItem.amount);
    });
    return expensesTotal;
  };
  calculateIncomeTotal = () => {
    let incomeTotal = 0;
    this.props.readyCash.income.forEach(singleItem => {
      incomeTotal = parseFloat(incomeTotal) + parseFloat(singleItem.amount);
    });
    return incomeTotal;
  };
  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Reset"
        secondary={true}
        onClick={this.handleResetAllData}
      />
    ];
    return (
      <div>
        <AppBarMain title={"Ready Cash"} />
        {/* Title Bar */}

        <Card
          style={{
            padding: 5
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <div>
              <strong>
                Ready Cash {numeral(1000).format("0,0.00")} &#x9f3;
              </strong>
            </div>
            <div>
              <iframe
                src="http://free.timeanddate.com/clock/i61f8k1p/n942/fn14/ftb/tt0/tw1/tm3/tb2"
                frameBorder="0"
                width="192"
                height="18"
                title="Ready Cash Clock"
              />
            </div>
          </div>
        </Card>
        <br />
        {/* Main Section */}
        {this.props.readyCash.income.length > 0 ||
        this.props.readyCash.expenses.length > 0 ? (
          <div>
            <div className="container">
              <div className="row">
                <div className="col-sm-6" style={{ marginBottom: 10 }}>
                  <Card>
                    <CardTitle
                      title="Income Section"
                      subtitle="Get all details of today's Income"
                    />
                    <ReadyCashIncomeList income={this.props.readyCash.income} />
                  </Card>
                </div>
                <div className="col-sm-6">
                  <Card>
                    <CardTitle
                      title="Expenses Section"
                      subtitle="Get all details of today's Expenses"
                    />
                    <ReadyCashExpensesList
                      expenses={this.props.readyCash.expenses}
                    />
                  </Card>
                </div>
              </div>
            </div>
            <div className="container">
              <ReadyCashTotal readyCash={this.props.readyCash} />
            </div>
            <div className="container" style={{ textAlign: "center" }}>
              <RaisedButton
                onClick={this.handleOpen}
                label="Reset All Data"
                secondary={true}
                style={{ margin: 10 }}
                icon={
                  <SvgIcon>
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
                  </SvgIcon>
                }
              />
            </div>
          </div>
        ) : (
          <div style={{ color: "red", textAlign: "center", marginTop: 15 }}>
            <h4>Income and Expenses Is Empty !</h4>
          </div>
        )}

        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <span style={{ color: "red", fontWeight: "bold" }}>
            Are You Sure? Resetting All Data !!!
          </span>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    readyCash: state.readyCash
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startResetReadyCash: () => {
      dispatch(startResetReadyCash());
    },
    startUpdateReadyCash: amount => {
      dispatch(startUpdateReadyCash(amount));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadyCashMain);
