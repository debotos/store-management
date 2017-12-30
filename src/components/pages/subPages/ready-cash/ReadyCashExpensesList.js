import React, { Component } from "react";
import { List, ListItem } from "material-ui/List";
// import Divider from "material-ui/Divider";
import numeral from "numeral";
// import SvgIcon from "material-ui/SvgIcon";
import moment from "moment";

class ReadyCashExpensesList extends Component {
  renderAmount = singleItem => {
    return (
      <span>
        <span style={{ color: "green" }}>
          <strong>{numeral(singleItem.amount).format("0,0.00")} &#x9f3;</strong>
        </span>
        &nbsp;Time:{" "}
        <span style={{ color: "orange" }}>
          {this.extractDate(singleItem.moment)}
        </span>
        <br />
      </span>
    );
  };
  extractDate = data => {
    var now = moment(data).format("dddd, MMMM Do YYYY, h:mm:ss a");
    now = now.substr(30, 41);
    // console.log(now);
    return now;
  };
  renderIncomeListItem = () => {
    return this.props.expenses.map((singleItem, index) => {
      return (
        <ListItem
          key={index}
          primaryText={this.renderAmount(singleItem)}
          secondaryText={
            <span>
              Title: <strong>{singleItem.title}</strong>
            </span>
          }
        />
      );
    });
  };
  render() {
    return (
      <div>
        <List>{this.renderIncomeListItem()}</List>
      </div>
    );
  }
}

export default ReadyCashExpensesList;
