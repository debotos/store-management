import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { Card } from "material-ui/Card";
import { connect } from "react-redux";

const selectItems = [
  <MenuItem key={1} value={1} primaryText="Never" />,
  <MenuItem key={2} value={2} primaryText="Every Night" />,
  <MenuItem key={3} value={3} primaryText="Weeknights" />,
  <MenuItem key={4} value={4} primaryText="Weekends" />,
  <MenuItem key={5} value={5} primaryText="Weekly" />
];

class SellsHistory extends Component {
  handleSelectChange = (event, index, value) =>
    this.setState({ selectValue: value });
  constructor(props) {
    super(props);
    this.state = {
      selectValue: null
    };
  }
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
      return <MenuItem key={index} value={singleItem} primaryText={singleItem} />
    })
  };
  render() {
    return (
      <div>
        <div
          className="container"
          style={{ textAlign: "center", marginTop: 5, marginBottom: 5 }}
        >
          <Card>
            <SelectField
              style={{ marginTop: 5 }}
              hintText="Select Customer"
              value={this.state.selectValue}
              onChange={this.handleSelectChange}
            >
              {this.makeMenuItemsByHistoyObject()}
              {/* {selectItems} */}
            </SelectField>
          </Card>
        </div>
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
