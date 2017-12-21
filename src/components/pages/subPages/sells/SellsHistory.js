import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { Card } from "material-ui/Card";
import { connect } from "react-redux";

import HistoryTableGenerator from "./HistoryTable/HistoryTableGenerator";

class SellsHistory extends Component {
  handleSelectChange = (event, index, value) =>
    this.setState({ selectValue: value });
  makeMenuItemsByHistoyObject = () => {
    const history = this.props.sellsHistory;
    const customerNumbers = [];
    let objectSize = Object.keys(history).length;
    if (objectSize > 0) {
      for (let number in history) {
        customerNumbers.push(number);
      }
    }
    return customerNumbers.map((singleItem, index) => {
      return (
        <MenuItem key={index} value={singleItem} primaryText={singleItem} />
      );
    });
  };
  constructor(props) {
    super(props);
    this.state = {
      selectValue: null
    };
  }
  renderTableUsingHistory = phone => {
    const searchingFor = phone;
    const history = this.props.sellsHistory;
    let objectSize = Object.keys(history).length;

    let flag = false;
    let historyINeed;
    if (objectSize > 0 && phone) {
      for (let numberKey in history) {
        if (numberKey.toString() === searchingFor.toString()) {
          flag = true;
          historyINeed = history[numberKey];
        }
      }
    }
    if (flag) {
      return <HistoryTableGenerator allTables={historyINeed.history} />;
    }
  };
  render() {
    return (
      <div>
        <div
          className="container"
          style={{ textAlign: "center", marginTop: 5, marginBottom: 5 }}
        >
          {Object.keys(this.props.sellsHistory).length > 0 ? (
            <Card>
              <SelectField
                style={{ marginTop: 5 }}
                hintText="Select Customer"
                value={this.state.selectValue}
                onChange={this.handleSelectChange}
              >
                {this.makeMenuItemsByHistoyObject()}
              </SelectField>
            </Card>
          ) : (
            <div style={{ color: "red", fontWeight: "bold" }}>
              No Sells History Found !
            </div>
          )}
        </div>
        {/* Showing the tables */}
        <div>{this.renderTableUsingHistory(this.state.selectValue)}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sellsHistory: state.sellsHistory
  };
};

export default connect(mapStateToProps, null)(SellsHistory);
