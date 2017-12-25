import React, { Component } from "react";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import numeral from "numeral";

class ReadyCashIncomeList extends Component {
  renderAmount = singleItem => {
    return (
      <span style={{ color: "green" }}>
        {numeral(singleItem.amount).format("0,0.00") + " Taka"}
      </span>
    );
  };
  renderIncomeListItem = () => {
    return this.props.income.map((singleItem, index) => {
      return (
        <ListItem
          primaryText={singleItem.number}
          secondaryText={this.renderAmount(singleItem)}
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

export default ReadyCashIncomeList;
