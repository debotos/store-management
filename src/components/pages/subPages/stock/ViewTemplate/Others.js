import React, { Component } from "react";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux";

import { startRemoveItemToStock } from "../../../../../actions/stock/stock-action";

class Others extends Component {
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidUpdate = () => {
    if (
      JSON.stringify(this.props.values) !== JSON.stringify(this.state.others)
    ) {
      this.setState({ others: this.props.values });
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      others: this.props.values
    };
  }
  handleDelete = () => {
    this.handleClose();
    this.props.startRemoveItemToStock(
      this.state.others.productCategoryToSell,
      this.state.others.id
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
            title={this.state.others.productCode}
            subtitle="Others Category"
            actAsExpander={true}
            showExpandableButton={true}
          />

          <CardText expandable={true}>
            Code: <strong>{this.state.others.productCode}</strong> <br />
            Name: <strong>{this.state.others.productName}</strong> <br />
            Quantity:{" "}
            <span style={{ color: "blue" }}>
              <strong>{this.state.others.quantity}</strong>
            </span>{" "}
            <br />
            Rate: <strong>{this.state.others.rate}</strong>
            <br />
            Amount (Quantity x Rate):{" "}
            <span style={{ color: "green" }}>
              <strong>
                {(
                  parseFloat(this.state.others.quantity) *
                  parseFloat(this.state.others.rate)
                ).toFixed(2)}{" "}
                &#x9f3;
              </strong>
            </span>{" "}
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
    startRemoveItemToStock: (category, id) => {
      dispatch(startRemoveItemToStock(category, id));
    }
  };
};

export default connect(null, mapDispatchToProps)(Others);
