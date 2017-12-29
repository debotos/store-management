import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import OthersIncome from "./pages/OthersIncome";
import Bank from "./pages/Bank";
import Due from "./pages/Due";
import Employee from "./pages/Employee";
import Expenses from "./pages/Expenses";
import Fabrication from "./pages/Fabrication";
import MoneyReceipt from "./pages/MoneyReceipt";
import Pad from "./pages/Pad";
import ReadyCash from "./pages/ReadyCash";
import Salary from "./pages/Salary";
import Sell from "./pages/Sells";
import Stock from "./pages/Stock";
import NotFoundpage from "./pages/NotFoundpage";
import Home from "./Home";
import LoginPage from "./LoginPage";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

export const history = createHistory();

class MainRouter extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <PublicRoute path="/" component={LoginPage} exact={true} />
            <PrivateRoute path="/home" component={Home} exact={true} />
            <PrivateRoute
              path="/readycash"
              component={ReadyCash}
              exact={true}
            />
            <PrivateRoute path="/sell" component={Sell} exact={true} />
            <PrivateRoute
              path="/fabrication"
              component={Fabrication}
              exact={true}
            />
            <PrivateRoute
              path="/others-income"
              component={OthersIncome}
              exact={true}
            />

            <PrivateRoute path="/expenses" component={Expenses} exact={true} />
            {/* <Route path="/bank" component={Bank} exact={true} /> */}
            <PrivateRoute path="/due" component={Due} exact={true} />
            {/* <Route path="/employee" component={Employee} exact={true} /> */}
            <PrivateRoute
              path="/moneyreceipt"
              component={MoneyReceipt}
              exact={true}
            />
            <PrivateRoute path="/pad" component={Pad} exact={true} />
            {/* <Route path="/salary" component={Salary} exact={true} /> */}
            <PrivateRoute path="/stock" component={Stock} exact={true} />

            <Route component={NotFoundpage} exact={true} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default MainRouter;
