import React, { Component } from 'react';
import { Card, CardActions } from "material-ui/Card";


class BalanceSheet extends Component {
  render() {
    return(
      <div>
      <Card className="container" style={{ margin: 5, padding: 15 }}>
            <h4>
              <b>Input Details</b>
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
    )
  }
}

export default BalanceSheet;