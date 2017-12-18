import React, { Component } from "react";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux";

import { removeItemToStock } from "../../../../../actions/stock/stock-action";

class SS extends Component {
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidUpdate = () => {
    if (this.props.values.productCode !== this.state.ss.productCode) {
      this.setState({ ss: this.props.values });
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      ss: this.props.values
    };
  }
  handleDelete = () => {
    this.handleClose();
    this.props.removeItemToStock(
      this.state.ss.productCategoryToSell,
      this.state.ss.id
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
            title={this.state.ss.productCode}
            subtitle="SS Category"
            actAsExpander={true}
            showExpandableButton={true}
          />

          <CardText expandable={true}>
            Code: <strong>{this.state.ss.productCode}</strong> <br />
            Name: <strong>{this.state.ss.productName}</strong> <br />
            Company: <strong>{this.state.ss.companyName}</strong> <br />
            Length:{" "}
            <span style={{ color: "green" }}>
              <strong>{this.state.ss.length}</strong>
            </span>{" "}
            <br />
            Thickness: <strong>{this.state.ss.thickness}</strong>
            <br />
            Quantity:{" "}
            <span style={{ color: "green" }}>
              <strong>{this.state.ss.quantity}</strong>
            </span>{" "}
            <br />
            Rate: <strong>{this.state.ss.rate}</strong>
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

export default connect(null, mapDispatchToProps)(SS);
