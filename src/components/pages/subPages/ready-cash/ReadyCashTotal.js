import React, { Component } from "react";
import { Card } from "material-ui/Card";
import numeral from "numeral";

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
      <Card
        style={{
          marginTop: 10,
          marginBottom: 10,
          padding: 10,
          textAlign: "center"
        }}
      >
        <div className="row">
          <div className="col-sm-6" style={{ marginBottom: 10 }}>
            <Card style={{ padding: 10 }}>
              <h2>
                {numeral(parseFloat(this.calculateIncomeTotal())).format(
                  "0,0.00"
                )}{" "}
                &#x9f3;
              </h2>
            </Card>
          </div>
          <div className="col-sm-6">
            <Card style={{ padding: 10 }}>
              <h2>
                {numeral(parseFloat(this.calculateExpensesTotal())).format(
                  "0,0.00"
                )}{" "}
                &#x9f3;
              </h2>
            </Card>
          </div>
        </div>

        <Card style={{ padding: 10 }}>
          <h2>
            {numeral(
              parseFloat(
                this.calculateIncomeTotal() - this.calculateExpensesTotal()
              )
            ).format("0,0.00")}{" "}
            &#x9f3;
          </h2>
        </Card>
      </Card>
    );
  }
}

export default ReadyCashTotal;
