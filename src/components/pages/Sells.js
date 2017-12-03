import React, { Component } from "react";
import { Card, CardActions } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import Toggle from "material-ui/Toggle";
import { connect } from "react-redux";
import uuid from "uuid/v4";

import AppBarMain from "../ui-element/AppBarMain";
import ColorPicker from "../ui-element/ColorPicker";
import SellsTable from "./subPages/sells/SellsTable";
import { addSellItem } from "../../actions/sells/sells-actions";
import SnackBar from "../ui-element/SnackBar";
import CustomerDetailsForm from "./subPages/sells/CustomerDetailsForm";
// import Navigation from "../Navigation";

const items = [
  <MenuItem key={1} value="Debotos Das" primaryText="Debotos Das" />,
  <MenuItem key={2} value="Sourov Das" primaryText="Sourov Das" />,
  <MenuItem key={3} value="Ripon Das" primaryText="Ripon Das" />,
  <MenuItem key={5} value="Raisul Sohag vi" primaryText="Raisul Sohag vi" />,
  <MenuItem key={4} value="Akash Das" primaryText="Akash Das" />
];

class Sells extends Component {
  // SnackBar Functions
  handleActionTouchTap = () => {
    this.setState({
      snackBar: false
    });
  };

  handleRequestClose = () => {
    this.handleActionTouchTap();
  };

  showSnackBar = message => {
    this.setState({
      snackBar: true,
      snackBarMessage: message
    });
  };
  // End
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
      },
      snackBar: false,
      snackBarMessage: "",
      AllTotal: 0
    };
  }

  AllTotal = AllTotal => {
    this.setState({ AllTotal });
  };

  handleSubmit = () => {
    let color = this.state.toggle ? this.state.color : null;
    let sellsItemData = {
      id: uuid(),
      item: this.state.selectedItem,
      quantity: this.state.quantity,
      rate: this.state.rate,
      length: this.state.length,
      dia: this.state.dia,
      color,
      total: (
        parseFloat(this.state.quantity) * parseFloat(this.state.rate)
      ).toFixed(2)
    };
    this.props.addSellItem(sellsItemData);
    this.handleReset();
    this.showSnackBar("Item added to the list Successfully !");
  };

  render() {
    return (
      <div>
        {/* Main App Bar */}
        <AppBarMain />
        {/* Input Section */}
        <div className="container" style={{ marginTop: 15, marginBotton: 15 }}>
          <Card className="container" style={{ margin: 5, padding: 30 }}>
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
                onClick={this.handleSubmit}
              />
            </CardActions>
          </Card>
        </div>
        {/* Sells Table Section*/}
        <div>
          <SellsTable
            showSnackBar={this.showSnackBar}
            AllTotal={this.AllTotal}
          />
        </div>
        {/* Customer Details Getting Form */}
        <div>
          <CustomerDetailsForm
            sellsTable={this.props.sellsTable}
            AllTotal={this.state.AllTotal}
            showSnackBar={this.showSnackBar}
          />
        </div>
        <SnackBar
          snackBar={this.state.snackBar}
          snackBarMessage={this.state.snackBarMessage}
          handleActionTouchTap={this.handleActionTouchTap}
          handleRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSellItem: sellItemData => {
      dispatch(addSellItem(sellItemData));
    }
  };
};

const mapStateToProps = state => {
  return {
    sellsTable: state.sells
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sells);
