import React, { Component } from "react";
import { Card } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";

import { updateStockItem } from "../../../../../actions/stock/stock-action";

class Aluminium extends Component {
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
  handleProductNameChange = event => {
    const productName = event.target.value;
    this.setState({ productName });
  };
  handleCompanyNameChange = event => {
    const companyName = event.target.value;
    this.setState({ companyName });
  };
  handleColorChange = event => {
    const color = event.target.value;
    this.setState({ color });
  };
  friendlyHandleReset = () => {
    this.setState({ length: "" });
    this.setState({ quantity: "" });
    this.setState({ dia: "" });
  };
  constructor(props) {
    super(props);
    this.state = {
      companyName: this.props.values.companyName,
      color: this.props.values.color,
      length: "",
      dia: "",
      productName: this.props.values.productName,
      quantity: "",
      rate: this.props.values.rate
    };
  }
  handleStockIn = () => {
    let Data = {
      id: this.props.values.id,
      productCode: this.props.values.productCode,
      productCategoryToSell: this.props.values.productCategoryToSell,
      companyName: this.state.companyName,
      color: this.state.color,
      length: (
        parseFloat(this.state.length) + parseFloat(this.props.values.length)
      ).toFixed(2),
      dia: (
        parseFloat(this.state.dia) + parseFloat(this.props.values.dia)
      ).toFixed(2),
      productName: this.state.productName,
      quantity: (
        parseFloat(this.state.quantity) + parseFloat(this.props.values.quantity)
      ).toFixed(2),
      rate: this.state.rate
    };
    //Dispatch the function to add the details to the store
    this.props.updateStockItem(Data);
    this.friendlyHandleReset();
    this.props.showSnackBar("In Action Successfully !");
  };
  render() {
    return (
      <Card
        style={{
          marginTop: 10,
          padding: 13,
          paddingBottom: 20
        }}
      >
        {/* All Fields */}
        <div>
          <TextField
            value={this.state.productName}
            onChange={this.handleProductNameChange}
            hint="Product Name"
            floatingLabelText="Update Product Name"
          />
          <TextField
            value={this.state.companyName}
            onChange={this.handleCompanyNameChange}
            hint="Company Name"
            floatingLabelText="Update Company Name"
          />
          <TextField
            value={this.state.color}
            onChange={this.handleColorChange}
            hint="Color Name"
            floatingLabelText="Update Color Name"
          />
          <TextField
            type="number"
            value={this.state.length}
            onChange={this.handleLengthChange}
            hintText="Length"
            floatingLabelText={`Add Length (Now: ${this.props.values.length})`}
          />
          <TextField
            type="number"
            value={this.state.dia}
            onChange={this.handleDiaChange}
            hintText="DIA"
            floatingLabelText={`Add DIA (Now: ${this.props.values.dia})`}
          />
          <TextField
            type="number"
            value={this.state.quantity}
            onChange={this.handleQuantyChange}
            hintText="Quantity"
            floatingLabelText={`Add Quantity (Now: ${
              this.props.values.quantity
            })`}
          />
          <TextField
            type="number"
            value={this.state.rate}
            onChange={this.handleRateChange}
            hintText="Price/Rate"
            floatingLabelText="Update the Price/Rate "
          />
          <div style={{ textAlign: "center", marginTop: 5 }}>
            <FlatButton
              disabled={
                this.state.companyName &&
                this.state.productName &&
                this.state.quantity &&
                this.state.length &&
                this.state.dia &&
                this.state.rate
                  ? false
                  : true
              }
              primary={true}
              label="In"
              onClick={this.handleStockIn}
            />
          </div>
        </div>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateStockItem: data => dispatch(updateStockItem(data))
});

export default connect(null, mapDispatchToProps)(Aluminium);
