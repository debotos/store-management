import React, { Component } from "react";
import { Card } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";

import { updateStockItem } from "../../../../../actions/stock/stock-action";

class Others extends Component {
  handleProductNameChange = event => {
    const productName = event.target.value;
    this.setState({ productName });
  };
  handleQuantityChange = event => {
    const quantity = event.target.value;
    this.setState({ quantity });
  };
  handleRateChange = event => {
    const rate = event.target.value;
    this.setState({ rate });
  };
  friendlyHandleReset = () => {
    this.setState({ quantity: "" });
  };
  componentDidUpdate = () => {
    if (this.props.values.productCode !== this.state.productCode) {
      this.setState({ productCode: this.props.values.productCode });
      this.setState({ productName: this.props.values.productName });
      this.setState({ rate: this.props.values.rate });
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      productCode: this.props.values.productCode,
      productName: this.props.values.productName,
      quantity: "",
      rate: this.props.values.rate
    };
  }
  handleStockIn = () => {
    let Data = {
      id: this.props.values.id,
      productCategoryToSell: this.props.values.productCategoryToSell,
      productName: this.state.productName,
      quantity: (
        parseFloat(this.state.quantity) + parseFloat(this.props.values.quantity)
      ).toFixed(2),
      rate: this.state.rate,
      productCode: this.props.values.productCode
    };
    //Dispatch the function to add the details to the store
    this.props.updateStockItem(Data);
    this.friendlyHandleReset();
    this.props.showSnackBar("In Action Successfully !");
  };
  handleStockOut = () => {
    let Data = {
      id: this.props.values.id,
      productCategoryToSell: this.props.values.productCategoryToSell,
      productName: this.state.productName,
      quantity: (
        parseFloat(this.props.values.quantity) - parseFloat(this.state.quantity)
      ).toFixed(2),
      rate: this.state.rate,
      productCode: this.props.values.productCode
    };
    //Dispatch the function to add the details to the store
    this.props.updateStockItem(Data);
    this.friendlyHandleReset();
    this.props.showSnackBar("Out Action Successfully !");
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
            type="number"
            value={this.state.quantity}
            onChange={this.handleQuantityChange}
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
                this.state.productName && this.state.quantity && this.state.rate
                  ? false
                  : true
              }
              secondary={true}
              label="Out"
              onClick={this.handleStockOut}
            />
            <FlatButton
              disabled={
                this.state.productName && this.state.quantity && this.state.rate
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

export default connect(null, mapDispatchToProps)(Others);
