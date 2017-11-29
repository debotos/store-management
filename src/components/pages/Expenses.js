import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { orange500, blue500 } from "material-ui/styles/colors";
// import DatePicker from "material-ui/DatePicker";
import FloatingAddButton from "../ui-element/FloatingAddButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import moment from "moment";
import { SingleDatePicker } from "react-dates";

import "../../style/expenses/expenses.css";
import AppBarMain from "../ui-element/AppBarMain";
import { startAddExpense } from "../../actions/expenses/expenses-actions";
import ExpenseDashboardPage from "./subPages/expenses/ExpensesDashboardPage";

const customDialogContentStyle = {
  width: "90%",
  maxWidth: "none",
  minHeight: "50%"
};

class Expenses extends Component {
  // Handling add expenses request
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
    this.setState({ showAddExpensesModel: false });
    this.setState({ expensesDate: moment() })
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onDateChange = createdAt => {
    if (createdAt) {
      console.log("created At", createdAt);
      this.setState(() => ({ expensesDate: createdAt }));
    }
  };
  closeAddExpensesModel = () => {
    this.setState({ showAddExpensesModel: false });
  };
  showAddExpensesModel = () => {
    this.setState({ showAddExpensesModel: true });
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
  // playing with other date picker
  // handleExpensesDateChange = (event, date) => {
  //   let data = date;
  //   if (typeof data !== 'string') {
  //     data = data.toString();
  // }
  //   console.log("date is:", date);
  //   console.log("type date is:", typeof date);
  //   const dataArray = date.split(" ");
  //   let day = dataArray[2];
  //   let year = dataArray[3];
  //   let month ;
  //   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  //   for(var singleMonth in months) {
  //     if(months[singleMonth] === dataArray[1]) {
  //       month = singleMonth;
  //       break;
  //     }
  //   }
  //   console.log('trimed value ', year, month, day)
  //   let momentDate = new Date(year, month, day);
  //   this.setState({expensesDate: moment(momentDate)})
  // };

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

  showEditableModel = () => {
    this.setState({ showAddExpensesModel: true });
  };

  render() {
    const DefaultActionsOfAddExpensesModel = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={this.closeAddExpensesModel}
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
    ];

    return (
      <div>
        <AppBarMain />
        <div className="container">
          <h1 style={{ textAlign: "center" }}>Record Expenses</h1>
          <ExpenseDashboardPage showEditableModel={this.showEditableModel} />
          <FloatingAddButton showAddExpensesModel={this.showAddExpensesModel} />
        </div>
        <Dialog
          title="Add an Expense"
          actions={DefaultActionsOfAddExpensesModel}
          modal={true}
          open={this.state.showAddExpensesModel}
          autoScrollBodyContent={true}
          repositionOnUpdate={false}
          contentStyle={customDialogContentStyle}
          autoDetectWindowHeight={false}
        >
          <div>
            <TextField
              onChange={this.handleExpensesTitleChange}
              value={this.state.expensesTitle}
              hintText="Expenses Title"
              floatingLabelText="Expenses Title Here"
              floatingLabelStyle={{ color: orange500 }}
              floatingLabelFocusStyle={{ color: blue500 }}
            />

            <TextField
              onChange={this.handleExpensesAmountChange}
              value={this.state.expensesAmount}
              type="number"
              hintText="Money / Amount"
              floatingLabelText="Expenses Amount Here"
              floatingLabelStyle={{ color: orange500 }}
              floatingLabelFocusStyle={{ color: blue500 }}
            />

            {/* <DatePicker
            onChange={this.handleExpensesDateChange}
            hintText="Select Date"
            value={this.state.expensesDate}
            floatingLabelText="Date of Expenses Here"
            floatingLabelStyle={{ color: orange500 }}
            floatingLabelFocusStyle={{ color: blue500 }}
          /> */}
            <br />
            <TextField
              onChange={this.handleExpensesDetailsChange}
              value={this.state.expensesDetails}
              hintText="Expenses Details(optional)"
              floatingLabelText="Expenses Details Here"
              floatingLabelStyle={{ color: orange500 }}
              floatingLabelFocusStyle={{ color: blue500 }}
              multiLine={true}
              rows={1}
            />
            <br />
            <div className="single-date-picker">
              <label style={{ color: "orange" }}>
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
          </div>
        </Dialog>
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

export default connect(null, mapDispatchToProps)(Expenses);
