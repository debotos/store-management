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
  handleColorChange = color => {
    this.setState({ color });
    console.log("Setting the color:", color);
  };
  constructor(props) {
    super(props);
    this.state = {
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
            <div className="container" style={{}}>
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
                  <h4>Turn on the toggle button to select color!</h4>
                )}
              </div>
              <div className="col-sm-6">
                <TextField
                  hintText="Length"
                  floatingLabelText="Place the Length "
                />{" "}
                <br />
                <TextField hintText="DIA" floatingLabelText="Place the DIA " />
                <br />
                <TextField
                  hintText="Price/Rate"
                  floatingLabelText="Place the Price/Rate "
                />
              </div>
            </div>
            <br />
            <div />
            <CardActions style={{ float: "right" }}>
              <FlatButton style={{ color: "red" }} label="Reset" />
              <FlatButton primary={true} label="Add" />
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

export default Sells;
