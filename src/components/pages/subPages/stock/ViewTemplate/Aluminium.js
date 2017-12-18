import React, { Component } from "react";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux";

import { removeItemToStock } from "../../../../../actions/stock/stock-action";

class Aluminium extends Component {
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidUpdate = () => {
    if (this.props.values.productCode !== this.state.productCode) {
      this.setState({ productCode: this.props.values.productCode }),
        this.setState({ companyName: this.props.values.companyName }),
        this.setState({ color: this.props.values.color }),
        this.setState({ length: this.props.values.length }),
        this.setState({ dia: this.props.values.dia }),
        this.setState({ productName: this.props.values.productName }),
        this.setState({ quantity: this.props.values.quantity }),
        this.setState({ rate: this.props.values.rate });
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      productCode: this.props.values.productCode,
      companyName: this.props.values.companyName,
      color: this.props.values.color,
      length: this.props.values.length,
      dia: this.props.values.dia,
      productName: this.props.values.productName,
      quantity: this.props.values.quantity,
      rate: this.props.values.rate
    };
  }
  handleDelete = () => {
    this.handleClose();
    this.props.removeItemToStock(
      this.state.aluminium.productCategoryToSell,
      this.state.aluminium.id
    );
    this.props.showSnackBar("Successfully Deleted !");
  };

  render() {
    const actions = [
      <FlatButton label="No" primary={true} onClick={this.handleClose} />,
      <FlatButton label="Yes" primary={true} onClick={this.handleDelete} />
    ];
    return (
      <div>
        <Card>
          <CardHeader
            title={this.state.productCode}
            subtitle="Aluminium Category"
            actAsExpander={true}
            showExpandableButton={true}
          />

          <CardText expandable={true}>
            Code: <strong>{this.state.productCode}</strong> <br />
            Name: <strong>{this.state.productName}</strong> <br />
            Company: <strong>{this.state.companyName}</strong> <br />
            Color: <strong>{this.state.color}</strong> <br />
            Length:{" "}
            <span style={{ color: "green" }}>
              <strong>{this.state.length}</strong>
            </span>{" "}
            <br />
            Dia:{" "}
            <span style={{ color: "green" }}>
              <strong>{this.state.dia}</strong>
            </span>{" "}
            <br />
            Quantity:{" "}
            <span style={{ color: "green" }}>
              <strong>{this.state.quantity}</strong>
            </span>{" "}
            <br />
            Rate: <strong>{this.state.rate}</strong>
          </CardText>

          <CardActions>
            <RaisedButton
              secondary={true}
              onClick={this.handleOpen}
              label="Remove From Stock"
            />
          </CardActions>
        </Card>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Warning! You want to Delete?
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeItemToStock: (category, id) => {
      dispatch(removeItemToStock(category, id));
    }
  };
};

export default connect(null, mapDispatchToProps)(Aluminium);
