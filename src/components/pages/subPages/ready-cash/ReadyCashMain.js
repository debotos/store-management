import React, { Component } from "react";
import ReactCountdownClock from "react-countdown-clock";
import { Card, CardActions, CardTitle } from "material-ui/Card";
import numeral from "numeral";
import { connect } from "react-redux";

import AppBarMain from "../../../ui-element/AppBarMain";
import ReadyCashIncomeList from "./ReadyCashIncomeList";
import ReadyCashExpensesList from "./ReadyCashExpensesList";
import ReadyCashTotal from "./ReadyCashTotal";
import { ExpenseList } from "../expenses/ExpensesList";
// import Navigation from "../Navigation";

class ReadyCashMain extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    readyCash: state.readyCash
  };
};

export default connect(mapStateToProps, null)(ReadyCashMain);
