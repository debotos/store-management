import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { orange500, blue500 } from "material-ui/styles/colors";
import DatePicker from "material-ui/DatePicker";

import AppBarMain from "../ui-element/AppBarMain";
import FloatingAddButton from "../ui-element/FloatingAddButton";
import TextField from "material-ui/TextField";

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitDisable: true,
      showAddExpensesModel: false,
      expensesTitle: "",
      expensesAmount: "",
      expensesDate: "",
      expensesDetails: ""
    };
  }

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

  handleExpensesDateChange = (event, date) => {
    this.setState({ expensesDate: date });
    console.log("date is:", date);
  };

  handleExpensesDetailsChange = event => {
    const details = event.target.value;
    this.setState({ expensesDetails: details });
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
        onClick={this.closeAddExpensesModel}
      />
    ];

    return (
      <div>
        <AppBarMain />
        <div className="container">
          <h1 style={{ textAlign: "center" }}>Record Expenses</h1>

          <FloatingAddButton showAddExpensesModel={this.showAddExpensesModel} />
        </div>
        <Dialog
          title="Add an Expense"
          actions={DefaultActionsOfAddExpensesModel}
          modal={true}
          open={this.state.showAddExpensesModel}
          autoScrollBodyContent={true}
          repositionOnUpdate={false}
        >
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
            hintText="Money / Amount"
            floatingLabelText="Expenses Amount Here"
            floatingLabelStyle={{ color: orange500 }}
            floatingLabelFocusStyle={{ color: blue500 }}
          />

          <TextField
            onChange={this.handleExpensesDetailsChange}
            value={this.state.expensesDetails}
            hintText="Expenses Details(optional)"
            floatingLabelText="Expenses Details Here"
            floatingLabelStyle={{ color: orange500 }}
            floatingLabelFocusStyle={{ color: blue500 }}
            multiLine={true}
            rows={2}
          />
          <DatePicker
            onChange={this.handleExpensesDateChange}
            hintText="Select Date"
            floatingLabelText="Date of Expenses Here"
            floatingLabelStyle={{ color: orange500 }}
            floatingLabelFocusStyle={{ color: blue500 }}
          />
        </Dialog>
      </div>
    );
  }
}

export default Expenses;
