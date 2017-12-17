import React, { Component } from "react";
import { Card, CardActions, CardTitle } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import SelectField from "material-ui/SelectField";

import {
  startAddItemToStock,
  startRemoveItemToStock
} from "../../../../actions/stock/stock-action";
import { items } from "../../Sells";
import Aluminium from "./InForms/Aluminium";
import Glass from "./InForms/Glass";
import SS from "./InForms/SS";
import Others from "./InForms/Others";

class In extends Component {
  addStockItemName = () => {
    if (this.state.stockItemName) {
      let alreadyHaveThatItem = false;
      this.props.stock.forEach(singleItem => {
        if (singleItem.item === this.state.stockItemName) {
          alreadyHaveThatItem = true;
        }
      });
      if (!alreadyHaveThatItem) {
        const data = {
          item: this.state.stockItemName
        };
        this.props.startAddItemToStock(data);
        this.setState({ stockItemName: "" });
      } else {
        this.props.showSnackBar("Error ! Item Already Exists!");
      }
    } else {
      this.props.showSnackBar("Error !! Valid Input Please !");
    }
  };

  handleStockItemNameChange = event => {
    const stockItemName = event.target.value;
    this.setState({ stockItemName });
  };
  handleSelectedItemChange = (event, index, value) =>
    this.setState({ selectedItem: value });
  constructor(props) {
    super(props);
    this.state = {
      stockItemName: "",
      selectedItem: null
    };
  }

  render() {
    return (
      <div className="container" style={{ marginTop: 10 }}>
        {/* Stock Item Input Section */}
        <div
          className="container"
          style={{ textAlign: "center", marginTop: 5, marginBottom: 5 }}
        >
          <Card>
            <SelectField
              style={{ marginTop: 5 }}
              hintText="Select Item"
              value={this.state.selectedItem}
              onChange={this.handleSelectedItemChange}
            >
              {items}
            </SelectField>
          </Card>
        </div>
        <div className="container" style={{ marginBottom: 10 }}>
          {this.state.selectedItem === "Thai Aluminium" && (
            <Aluminium showSnackBar={this.props.showSnackBar} />
          )}
          {this.state.selectedItem === "Glass" && (
            <Glass showSnackBar={this.props.showSnackBar} />
          )}
          {this.state.selectedItem === "SS" && (
            <SS showSnackBar={this.props.showSnackBar} />
          )}
          {this.state.selectedItem === "Others" && (
            <Others showSnackBar={this.props.showSnackBar} />
          )}
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  stock: state.stock
});

const mapDispatchToProps = dispatch => ({
  startAddItemToStock: itemData => dispatch(startAddItemToStock(itemData)),
  startRemoveItemToStock: id => dispatch(startRemoveItemToStock(id))
});

export default connect(mapStatetoProps, mapDispatchToProps)(In);
