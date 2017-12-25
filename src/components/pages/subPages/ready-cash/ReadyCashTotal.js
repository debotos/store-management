import React, { Component } from "react";
import { Card } from "material-ui/Card";

class ReadyCashTotal extends Component {
  calculateIncomeTotal = () => {
    let incomeTotal = 0;
    this.props.readyCash.income.forEach(singleItem => {
      incomeTotal = parseFloat(incomeTotal) + parseFloat(singleItem.amount);
    });
    return incomeTotal;
  };
  calculateExpensesTotal = () => {
    let expensesTotal = 0;
    this.props.readyCash.expenses.forEach(singleItem => {
      expensesTotal = parseFloat(expensesTotal) + parseFloat(singleItem.amount);
    });
    return expensesTotal;
  };
  render() {
    return (
      <Card>
        <h2>{this.calculateIncomeTotal()}</h2>
        <h2>{this.calculateExpensesTotal()}</h2>
      </Card>
    );
  }
}

export default ReadyCashTotal;
