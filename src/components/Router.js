import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import Bank from './pages/Bank';
import Due from './pages/Due';
import Employee from './pages/Employee';
import Expenses from './pages/Expenses';
import Fabrication from './pages/Fabrication';
import MoneyReceipt from './pages/MoneyReceipt';
import Pad from './pages/Pad';
import ReadyCash from './pages/ReadyCash';
import Salary from './pages/Salary';
import Sell from './pages/Sells';
import Stock from './pages/Stock';
import NotFoundpage from './pages/NotFoundpage';
import Home from './Home';

export const history = createHistory();

class MainRouter extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/bank" component={Bank} />
            <Route path="/due" component={Due} />
            <Route path="/employee" component={Employee} />
            <Route path="/expenses" component={Expenses} />
            <Route path="/fabrication" component={Fabrication} />
            <Route path="/moneyreceipt" component={MoneyReceipt} />
            <Route path="/pad" component={Pad} />
            <Route path="/readycash" component={ReadyCash} />
            <Route path="/salary" component={Salary} />
            <Route path="/sell" component={Sell} />
            <Route path="/stock" component={Stock} />
            <Route component={NotFoundpage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default MainRouter;
