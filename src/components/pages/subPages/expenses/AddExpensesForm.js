import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import { Card, CardActions } from "material-ui/Card";

import { startAddExpense } from "../../../../actions/expenses/expenses-actions";

class AddExpensesForm extends Component {
  handleReset = () => {
    this.setState({ expensesTitle: "" });
    this.setState({ expensesAmount: "" });
    this.setState({ expensesDetails: "" });
    this.setState({ showAddExpensesModel: false });
    this.setState({ expensesDate: moment() });
  };
  handleSubmit = event => {
    const expense = {
      note: this.state.expensesTitle,
      description: this.state.expensesDetails,
      amount: parseFloat(this.state.expensesAmount, 10),
      createdAt: this.state.expensesDate.valueOf()
    };
    this.props.startAddExpense(expense);
    this.setState({ expensesTitle: "" });
    this.setState({ expensesAmount: "" });
    this.setState({ expensesDetails: "" });
    this.setState({ expensesDate: moment() });
    this.props.showSnackBar("Successfully Added !");
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ expensesDate: createdAt }));
    }
  };
  handleExpensesTitleChange = event => {
    const title = event.target.value;
    this.setState({ expensesTitle: title });
  };
  handleExpensesAmountChange = event => {
    const amount = event.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ expensesAmount: amount }));
    }
  };
  handleExpensesDetailsChange = event => {
    const details = event.target.value;
    this.setState({ expensesDetails: details });
  };
  constructor(props) {
    super(props);
    this.state = {
      calendarFocused: false,
      submitDisable: true,
      showAddExpensesModel: false,
      expensesTitle: "",
      expensesAmount: "",
      expensesDate: moment(),
      expensesDetails: ""
    };
  }
  render() {
    return (
      <div>
        <Card className="container" style={{ textAlign: "center" }}>
          <TextField
            autoFocus
            onChange={this.handleExpensesTitleChange}
            value={this.state.expensesTitle}
            hintText="Expenses Title"
            floatingLabelText="Expenses Title Here"
          />
          <TextField
            onChange={this.handleExpensesAmountChange}
            value={this.state.expensesAmount}
            type="number"
            hintText="Money / Amount"
            floatingLabelText="Expenses Amount Here"
          />
          <br />
          <TextField
            onChange={this.handleExpensesDetailsChange}
            value={this.state.expensesDetails}
            multiLine={true}
            rows={1}
            hintText="Expenses Details Here (optional) !"
          />
          <br />
          <div className="single-date-picker">
            <label>
              Select Data [Default: <b>Today</b>]
            </label>
            <br />
            <SingleDatePicker
              date={this.state.expensesDate}
              numberOfMonths={1}
              onDateChange={this.onDateChange}
              isOutsideRange={() => false}
              focused={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
            />
          </div>
          <CardActions>
            <FlatButton
              label="Reset"
              secondary={true}
              disabled={
                !this.state.expensesAmount &&
                !this.state.expensesTitle &&
                !this.state.expensesDate
                  ? true
                  : false
              }
              onClick={this.handleReset}
            />,
            <FlatButton
              label="Add Expense"
              primary={true}
              disabled={
                !this.state.expensesAmount ||
                !this.state.expensesTitle ||
                !this.state.expensesDate
                  ? true
                  : false
              }
              onClick={this.handleSubmit}
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    startAddExpense: expense => {
      dispatch(startAddExpense(expense));
    }
  };
};

export default connect(null, mapDispatchToProps)(AddExpensesForm);
