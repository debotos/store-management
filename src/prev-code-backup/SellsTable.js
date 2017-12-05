import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import { connect } from "react-redux";
import reactCSS from "reactcss";
import TextField from "material-ui/TextField";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

import "../../../../style/sells/table.css";
import { removeSellItem } from '../../../../actions/sells/sells-actions'

class TableComponent extends Component {
  setColorProperty = color => {
    if (color) {
      return <ColorPicker color={color} />;
    } else {
      return "No Selection";
    }
  };

  handleRowClick = (row, column, event) => {
    this.setState({ ModalData: this.props.sellItems[row] });
    this.handleDetailsModelOpen();
  };
  handleDetailsModelOpen = () => {
    this.setState({ detailsModelOpen: true });
  };
  handleDetailsModelClose = () => {
    this.setState({ detailsModelOpen: false });
  };
  renderTableRow = () => {
    return this.props.sellItems.map((singleItem, index) => {
      return (
        <TableRow key={index}>
          <TableRowColumn>{index + 1}</TableRowColumn>
          <TableRowColumn>{singleItem.item}</TableRowColumn>
          <TableRowColumn>
            {singleItem.color ? (
              <ColorPicker color={singleItem.color} />
            ) : (
              "No Color Selected"
            )}
          </TableRowColumn>
          <TableRowColumn>{singleItem.length}</TableRowColumn>
          <TableRowColumn>{singleItem.dia}</TableRowColumn>
          <TableRowColumn>{singleItem.quantity}</TableRowColumn>
          <TableRowColumn>{singleItem.rate}</TableRowColumn>
          <TableRowColumn>{singleItem.total}</TableRowColumn>
        </TableRow>
      );
    });
  };

  calculateSUM = () => {
    let SUM = 0;
    // eslint-disable-next-line
    this.props.sellItems.map((singleItem, index) => {
      SUM = parseFloat(SUM) + parseFloat(singleItem.total);
    });
    let finalDiscountAmount =
      SUM.toFixed(2) *
      (this.state.discount ? parseFloat(this.state.discount) : 0) /
      100;
    if (finalDiscountAmount !== 0 && finalDiscountAmount) {
      this.props.showSnackBar(`Discount amount = ${finalDiscountAmount}`);
    }
    let finalResult = (SUM.toFixed(2) - finalDiscountAmount).toFixed(2);
    this.props.AllTotal(finalResult); // Setting up the all total
    return finalResult;
  };

  handleDiscountChange = event => {
    const discount = event.target.value;
    if (!discount || discount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      if (discount > 100 || discount < 0) {
        this.props.showSnackBar("Wrong Input ! [max:100 & min:0]");
      } else {
        this.setState({ discount });
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      discount: 0,
      detailsModelOpen: false,
      ModalData: ""
    };
  }

  handleDetailsModelDeleteAction = () => {
    const id = this.state.ModalData.id;
    this.props.removeSellItem(id);
    this.handleDetailsModelClose();
  };

  render() {
    const detailsModalActions = [
      <FlatButton
        label="Delete"
        secondary={true}
        onClick={this.handleDetailsModelDeleteAction}
      />,
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleDetailsModelClose}
      />
    ];
    return (
      <div>
        <Table
          height="300px"
          fixedHeader={true}
          fixedFooter={true}
          onCellClick={this.handleRowClick}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn
                colSpan="8"
                tooltip="List of Sells Item at a glance in below table"
                style={{ textAlign: "center" }}
              >
                <h2>List of Sells Item</h2>
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="Item Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="Item Color">Color</TableHeaderColumn>
              <TableHeaderColumn tooltip="Item Length">
                Length
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Item Dia">Dia</TableHeaderColumn>
              <TableHeaderColumn tooltip="Item Quantity">
                Quantity
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Item Rate / Price">
                Rate
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Price x Quantity">
                Total
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {this.renderTableRow()}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableRowColumn colSpan="8" className="table-footer">
                <TextField
                  type="number"
                  value={this.state.discount}
                  onChange={this.handleDiscountChange}
                  hintText="Discount (%)"
                  className="table-footer-discount"
                />
                <h3>
                  SUM ={" "}
                  {this.calculateSUM() !== 0 && this.calculateSUM() ? (
                    <b>{this.calculateSUM()}</b>
                  ) : (
                    <b style={{ color: "red" }}>?</b>
                  )}
                </h3>
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
        <Dialog
          title="Details : "
          actions={detailsModalActions}
          modal={false}
          open={this.state.detailsModelOpen}
          onRequestClose={this.handleDetailsModelClose}
        >
          Item: <strong>{this.state.ModalData.item}</strong> <br /> Length:{" "}
          <strong>{this.state.ModalData.length}</strong> <br /> Dia:{" "}
          <strong>{this.state.ModalData.dia}</strong> <br /> Color:{" "}
          <strong>{this.setColorProperty(this.state.ModalData.color)}</strong>{" "}
          <br /> Quantity: <strong>{this.state.ModalData.quantity}</strong>{" "}
          <br /> Rate: <strong>{this.state.ModalData.rate}</strong> <br />
          Total: <strong>{this.state.ModalData.total}</strong> <br />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sellItems: state.sells
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeSellItem: (id) => {
      dispatch(removeSellItem(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);

// Color Picker Class

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.color
    };
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "40px",
          height: "30px",
          borderRadius: "2px",
          background: `rgba(${this.props.color.r}, ${this.props.color.g}, ${
            this.props.color.b
          }, ${this.props.color.a})`
        },
        swatch: {
          marginTop: "3px",
          padding: "10px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer"
        },
        popover: {
          position: "absolute",
          zIndex: "2"
        }
      }
    });

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
      </div>
    );
  }
}
