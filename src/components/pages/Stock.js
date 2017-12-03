import React, { Component } from "react";
import { Card, CardActions, CardTitle } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import SnackBar from "../ui-element/SnackBar";
import uuid from "uuid";
import Chip from "material-ui/Chip";
import { blue300, indigo900 } from "material-ui/styles/colors";

import {
  startAddItemToStock,
  startRemoveItemToStock
} from "../../actions/stock/stock-action";
import AppBarMain from "../ui-element/AppBarMain";
// import Navigation from "../Navigation";

class Stock extends Component {
  // Chip Functions
  handleChipRequestDelete = id => {
    this.props.startRemoveItemToStock(id);
  };

  handleChipTouchTap = id => {
    console.log("I got a click on a chip, ID = ", id);
  };
  // End Chip Functions
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
  addStockItemName = () => {
    if (this.state.stockItemName) {
      const data = {
        item: this.state.stockItemName
      };
      this.props.startAddItemToStock(data);
      // this.setState({stockItemName: ""})
    } else {
      this.showSnackBar("Error !! Valid Input Please !");
    }
  };

  handleStockItemNameChange = event => {
    const stockItemName = event.target.value;
    this.setState({ stockItemName });
  };

  renderChips = () => {
    return this.props.stock.map(singleItem => {
      return (
        <Chip
          key={singleItem.id}
          backgroundColor={blue300}
          onRequestDelete={() => this.handleChipRequestDelete(singleItem.id)}
          onClick={() => this.handleChipTouchTap(singleItem.id)}
          style={{ margin: 5 }}
        >
          <strong>{singleItem.item}</strong>
        </Chip>
      );
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      stockItemName: "",
      snackBar: false,
      snackBarMessage: ""
    };
  }

  render() {
    return (
      <div>
        <AppBarMain />
        {/* Stock Item Input Section */}
        <div className="container" style={{ marginTop: 10 }}>
          <Card>
            <CardTitle
              title="Add Item to Stock"
              subtitle="Stock Item will appear below"
            />
            <div style={{ textAlign: "center" }}>
              <TextField
                hintText="Item Name"
                floatingLabelText="Place Stock Item to add"
                value={this.state.stockItemName}
                onChange={this.handleStockItemNameChange}
              />
            </div>
            <CardActions style={{ textAlign: "center" }}>
              <RaisedButton label="Add" onClick={this.addStockItemName} />
              <RaisedButton
                onClick={() => this.setState({ stockItemName: "" })}
                label="Reset"
              />
            </CardActions>
          </Card>
        </div>
        {/* Stock Items that currently have */}
        <div className="container" style={{ marginTop: 10 }}>
          <Card>
            <CardTitle
              title="All Stock Items"
              subtitle="Stock Items that currently have listed here"
            />
            <div
              style={{
                padding: 10,
                display: "flex",
                flexWrap: "wrap"
              }}
            >
              {this.renderChips()}
            </div>
          </Card>
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

const mapStatetoProps = state => ({
  stock: state.stock
});

const mapDispatchToProps = dispatch => ({
  startAddItemToStock: itemData => dispatch(startAddItemToStock(itemData)),
  startRemoveItemToStock: id => dispatch(startRemoveItemToStock(id))
});

export default connect(mapStatetoProps, mapDispatchToProps)(Stock);
