import React, { Component } from "react";
import { Card, CardActions } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import Toggle from "material-ui/Toggle";

import AppBarMain from "../ui-element/AppBarMain";
import ColorPicker from "../ui-element/ColorPicker";
// import Navigation from "../Navigation";

const items = [
  <MenuItem key={1} value={1} primaryText="Debotos Das" />,
  <MenuItem key={2} value={2} primaryText="Sourov Das" />,
  <MenuItem key={3} value={3} primaryText="Ripon Das" />,
  <MenuItem key={5} value={5} primaryText="Raisul Sohag vi" />,
  <MenuItem key={4} value={4} primaryText="Akash Das" />
];

class Sells extends Component {
  handleSelectedItemChange = (event, index, value) =>
    this.setState({ selectedItem: value });
  handleToggle = (event, isInputChecked) => {
    if (isInputChecked) {
      this.setState({ toggle: true });
    } else {
      this.setState({ toggle: false });
    }
  };
  handleReset = () => {
    this.setState({ quantity: "" });
    this.setState({ length: "" });
    this.setState({ dia: "" });
    this.setState({ rate: "" });
    this.setState({ toggle: false });
    this.setState({ selectedItem: null });
  };
  handleColorChange = color => {
    this.setState({ color });
    console.log("Setting the color:", color);
  };
  handleQuantyChange = event => {
    const quantity = event.target.value;
    console.log("i got the", quantity);
    if (!quantity || quantity.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ quantity });
    }
  };
  handleLengthChange = event => {
    const length = event.target.value;
    if (!length || length.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ length });
    }
  };

  handleDiaChange = event => {
    const dia = event.target.value;
    if (!dia || dia.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ dia });
    }
  };
  handleRateChange = event => {
    const rate = event.target.value;
    if (!rate || rate.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ rate });
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      rate: "",
      dia: "",
      length: "",
      quantity: "",
      selectedItem: null,
      toggle: false,
      color: {
        r: "0",
        g: "188",
        b: "212",
        a: "100"
      }
    };
  }

  render() {
    return (
      <div>
        {/* Main App Bar */}
        <AppBarMain />
        {/* Input Section */}
        <div className="container" style={{ marginTop: 10 }}>
          <Card className="container" style={{ margin: 5, padding: 15 }}>
            <h4>
              <b>Input Product Details</b>
            </h4>
            {/* All Fields */}
            <div>
              <div className="col-sm-6">
                <SelectField
                  value={this.state.selectedItem}
                  onChange={this.handleSelectedItemChange}
                  floatingLabelText="Product from stock"
                >
                  {items}
                </SelectField>
                <br />
                <TextField
                  type="number"
                  value={this.state.quantity}
                  onChange={this.handleQuantyChange}
                  hintText="Quantity"
                  floatingLabelText="Place the Quantity "
                />
                <br />
                <h4>Select Color</h4>
                <Toggle
                  defaultToggled={this.state.toggle}
                  onToggle={this.handleToggle}
                />
                {this.state.toggle ? (
                  <ColorPicker
                    color={this.state.color}
                    handleColorChange={this.handleColorChange}
                  />
                ) : (
                  <h4>Turn it on to select color!</h4>
                )}
              </div>
              <div className="col-sm-6">
                <TextField
                  type="number"
                  value={this.state.length}
                  onChange={this.handleLengthChange}
                  hintText="Length"
                  floatingLabelText="Place the Length "
                />{" "}
                <br />
                <TextField
                  type="number"
                  value={this.state.dia}
                  onChange={this.handleDiaChange}
                  hintText="DIA"
                  floatingLabelText="Place the DIA "
                />
                <br />
                <TextField
                  type="number"
                  value={this.state.rate}
                  onChange={this.handleRateChange}
                  hintText="Price/Rate"
                  floatingLabelText="Place the Price/Rate "
                />
              </div>
            </div>
            <br />
            <div />
            <CardActions style={{ float: "right" }}>
              <FlatButton
                disabled={
                  this.state.selectedItem ||
                  this.state.quantity ||
                  this.state.length ||
                  this.state.dia ||
                  this.state.rate
                    ? false
                    : true
                }
                secondary={true}
                label="Reset"
                onClick={this.handleReset}
              />
              <FlatButton
                disabled={
                  this.state.selectedItem &&
                  this.state.quantity &&
                  this.state.length &&
                  this.state.dia &&
                  this.state.rate
                    ? false
                    : true
                }
                primary={true}
                label="Add"
              />
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

export default Sells;
