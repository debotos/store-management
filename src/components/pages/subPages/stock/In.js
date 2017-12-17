import React, { Component } from "react";
import { Card } from "material-ui/Card";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";

import { items } from "../../Sells";
import Aluminium from "./InForms/Aluminium";
import Glass from "./InForms/Glass";
import SS from "./InForms/SS";
import Others from "./InForms/Others";

class In extends Component {
  handleSelectedCategoryChange = (event, index, value) =>
    this.setState({ selectedCategory: value });
  handleSelectedItemChange = (event, index, value) =>
    this.setState({ selectedItem: value });
  renderItemsBasedOnSelectedCategory = () => {
    let items = [];
    let selectedCategory = this.state.selectedCategory;
    if (selectedCategory) {
      let stock = this.props.stock;
      for (let stockCategory in stock) {
        if (
          stockCategory.toString() === selectedCategory.toString().toLowerCase()
        ) {
          items = stock[stockCategory].map((singleItem, index) => {
            return (
              <MenuItem
                key={index}
                value={singleItem.productCode}
                primaryText={singleItem.productCode}
              />
            );
          });
        }
      }
    }
    if (items.length > 0) {
      return items;
    } else {
      return null;
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: null,
      selectedItem: null
    };
  }
  render() {
    return (
      <div>
        <div
          className="container"
          style={{ textAlign: "center", marginTop: 5, marginBottom: 5 }}
        >
          <Card>
            {/* Select Category */}
            <SelectField
              style={{ marginTop: 5 }}
              hintText="Select Category"
              value={this.state.selectedCategory}
              onChange={this.handleSelectedCategoryChange}
            >
              {items}
            </SelectField>
            {/* Select Item */}
            {this.renderItemsBasedOnSelectedCategory() ? (
              <SelectField
                style={{ marginTop: 5 }}
                hintText="Select Item Code"
                value={this.state.selectedItem}
                onChange={this.handleSelectedItemChange}
              >
                {this.renderItemsBasedOnSelectedCategory()}
              </SelectField>
            ) : (
              <div style={{ color: "red", padding: 10 }}>
                First Add Item to Stock then Select Category !
              </div>
            )}
          </Card>
          {/* Form to In */}
          {this.renderItemsBasedOnSelectedCategory() &&
            this.state.selectedItem && (
              <div style={{ marginBottom: 10 }}>
                {this.state.selectedCategory === "Thai Aluminium" && (
                  <Aluminium showSnackBar={this.props.showSnackBar} />
                )}
                {this.state.selectedCategory === "Glass" && (
                  <Glass showSnackBar={this.props.showSnackBar} />
                )}
                {this.state.selectedCategory === "SS" && (
                  <SS showSnackBar={this.props.showSnackBar} />
                )}
                {this.state.selectedCategory === "Others" && (
                  <Others showSnackBar={this.props.showSnackBar} />
                )}
              </div>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stock
  };
};

export default connect(mapStateToProps, null)(In);
