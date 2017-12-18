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
    if (
      JSON.stringify(this.props.values) !== JSON.stringify(this.state.aluminium)
    ) {
      this.setState({ aluminium: this.props.values });
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      aluminium: this.props.values
    };
  }
  handleDelete = () => {
    this.handleClose();
    this.props.removeItemToStock(
      this.props.values.productCategoryToSell,
      this.props.values.id
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
            title={this.state.aluminium.productCode}
            subtitle="Aluminium Category"
            actAsExpander={true}
            showExpandableButton={true}
          />

          <CardText expandable={true}>
            Code: <strong>{this.state.aluminium.productCode}</strong> <br />
            Name: <strong>{this.state.aluminium.productName}</strong> <br />
            Company: <strong>{this.state.aluminium.companyName}</strong> <br />
            Color: <strong>{this.state.aluminium.color}</strong> <br />
            Length:{" "}
            <span style={{ color: "green" }}>
              <strong>{this.state.aluminium.length}</strong>
            </span>{" "}
            <br />
            Dia:{" "}
            <span style={{ color: "green" }}>
              <strong>{this.state.aluminium.dia}</strong>
            </span>{" "}
            <br />
            Quantity:{" "}
            <span style={{ color: "green" }}>
              <strong>{this.state.aluminium.quantity}</strong>
            </span>{" "}
            <br />
            Rate: <strong>{this.state.aluminium.rate}</strong>
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
