import React, { Component } from "react";
import { List, ListItem } from "material-ui/List";
// import Divider from "material-ui/Divider";
import numeral from "numeral";
// import SvgIcon from "material-ui/SvgIcon";
import moment from "moment";
import FloatingActionButton from "material-ui/FloatingActionButton";
import SvgIcon from "material-ui/SvgIcon";
import { connect } from "react-redux";

import { startRemoveAnEntryToReadyCash } from "../../../../actions/ready-cash/ready-cash-actions";

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
    var now = moment(data).format("LTS");
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
          rightIconButton={
            <div style={{ marginRight: 20, marginTop: 4, cursor: "pointer" }}>
              <FloatingActionButton
                mini={true}
                secondary={true}
                onClick={() =>
                  this.handleListItemDelete(singleItem.id, singleItem.type)
                }
              >
                <SvgIcon>
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
                </SvgIcon>
              </FloatingActionButton>
            </div>
          }
        />
      );
    });
  };
  handleListItemDelete = (id, type) => {
    this.props.startRemoveAnEntryToReadyCash(id, type);
  };
  render() {
    return (
      <div>
        <List>{this.renderIncomeListItem()}</List>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startRemoveAnEntryToReadyCash: (id, type) => {
      dispatch(startRemoveAnEntryToReadyCash(id, type));
    }
  };
};

export default connect(null, mapDispatchToProps)(ReadyCashExpensesList);
