import React, { Component } from "react";
import { Card } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";

class Glass extends Component {
  handleReset = () => {
    this.setState({ productName: "" });
    this.setState({ sft: "" });
    this.setState({ rate: "" });
  };
  handleProductNameChange = event => {
    const productName = event.target.value;
    this.setState({ productName });
  };
  handleSFTChange = event => {
    const sft = event.target.value;
    this.setState({ sft });
  };
  handleRateChange = event => {
    const rate = event.target.value;
    this.setState({ rate });
  };
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      sft: "",
      rate: ""
    };
  }
  
  render() {
    return (
      <Card
        style={{
          marginTop: 10,
          paddingLeft: 40,
          paddingRight: 40,
          paddingBottom: 20
        }}
      >
        {/* All Fields */}
        <div>
          <TextField
            value={this.state.productName}
            onChange={this.handleProductNameChange}
            hint="Product Name"
            floatingLabelText="Place Product Name"
          />
          <TextField
            type="number"
            value={this.state.sft}
            onChange={this.handleSFTChange}
            hintText="SFT"
            floatingLabelText="Place the SFT "
          />

          <TextField
            type="number"
            value={this.state.rate}
            onChange={this.handleRateChange}
            hintText="Price/Rate"
            floatingLabelText="Place the Price/Rate "
          />
          <FlatButton
            style={{ marginLeft: 10, marginTop: 5 }}
            disabled={
              this.state.productName || this.state.sft || this.state.rate
                ? false
                : true
            }
            secondary={true}
            label="Reset"
            onClick={this.handleReset}
          />
          <FlatButton
            disabled={
              this.state.productName && this.state.sft && this.state.rate
                ? false
                : true
            }
            primary={true}
            label="Add"
            onClick={this.handleSubmit}
          />
        </div>
      </Card>
    );
  }
}

export default Glass;
