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
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

import "../../../../../style/sells/table.css";
import { removeSellItem } from "../../../../../actions/sells/sells-actions";

class TableGenerator extends Component {
  handleAluminiumRowClick = (row, column, event) => {
    console.log('row, column, event', row, column, event)
    this.setState({ ModalData: this.props.allSells[row] });
    this.handleDetailsModelOpen();
  };
  handleGlassRowClick = (row, column, event) => {
    console.log('row, column, event', row, column, event)
    this.setState({ ModalData: this.props.allSells[row] });
    this.handleDetailsModelOpen();
  };
  handleDetailsModelOpen = () => {
    this.setState({ detailsModelOpen: true });
  };
  handleDetailsModelClose = () => {
    this.setState({ detailsModelOpen: false });
  };
  showDetailsToModel = productCategoryToSell => {
    if (productCategoryToSell === "aluminium") {
      return (
        <div>
          Item: <strong>{this.state.ModalData.productName}</strong> <br />{" "}
          Company: <strong>{this.state.ModalData.companyName}</strong> <br />{" "}
          Length: <strong>{this.state.ModalData.length}</strong> <br /> Dia:{" "}
          <strong>{this.state.ModalData.dia}</strong> <br /> Color:{" "}
          <strong>{this.state.ModalData.color}</strong> <br /> Quantity:{" "}
          <strong>{this.state.ModalData.quantity}</strong> <br /> Rate:{" "}
          <strong>{this.state.ModalData.rate}</strong> <br />
          Total: <strong>{this.state.ModalData.total}</strong> <br />
        </div>
      );
    }
    if (productCategoryToSell === "glass") {
      return (
        <div>
          Item: <strong>{this.state.ModalData.productName}</strong> <br /> SFT:{" "}
          <strong>{this.state.ModalData.sft}</strong> <br />
          Rate: <strong>{this.state.ModalData.rate}</strong> <br />
          Total: <strong>{this.state.ModalData.total}</strong>
        </div>
      );
    }
    if (productCategoryToSell === "ss") {
      return (
        <div>
          Item: <strong>{this.state.ModalData.productName}</strong> <br />{" "}
          Company: <strong>{this.state.ModalData.companyName}</strong> <br />{" "}
          Length: <strong>{this.state.ModalData.length}</strong> <br />{" "}
          Thickness: <strong>{this.state.ModalData.thickness}</strong> <br />Quantity:{" "}
          <strong>{this.state.ModalData.quantity}</strong> <br /> Rate:{" "}
          <strong>{this.state.ModalData.rate}</strong> <br />
          Total: <strong>{this.state.ModalData.total}</strong> <br />
        </div>
      );
    }
    if (productCategoryToSell === "others") {
      return (
        <div>
          Item: <strong>{this.state.ModalData.productName}</strong> <br />{" "}
          Quantity: <strong>{this.state.ModalData.quantity}</strong> <br />
          Rate: <strong>{this.state.ModalData.rate}</strong> <br />
          Total: <strong>{this.state.ModalData.total}</strong>
        </div>
      );
    }
  };
  renderAluminiumTableRow = () => {
    let id = 0;
    return this.props.allSells.map((singleItem, index) => {
      if (singleItem.productCategoryToSell === "aluminium") {
        id += 1;
        return (
          <TableRow key={index}>
            <TableRowColumn>{id}</TableRowColumn>
            <TableRowColumn>{singleItem.productName}</TableRowColumn>
            <TableRowColumn>{singleItem.companyName}</TableRowColumn>
            <TableRowColumn>{singleItem.length}</TableRowColumn>
            <TableRowColumn>{singleItem.dia}</TableRowColumn>
            <TableRowColumn>{singleItem.color}</TableRowColumn>
            <TableRowColumn>{singleItem.quantity}</TableRowColumn>
            <TableRowColumn>{singleItem.rate}</TableRowColumn>
            <TableRowColumn>{singleItem.total}</TableRowColumn>
          </TableRow>
        );
      }
    });
  };
  renderGlassTableRow = () => {
    let id = 0;
    return this.props.allSells.map((singleItem, index) => {
      if (singleItem.productCategoryToSell === "glass") {
        id += 1;
        return (
          <TableRow key={index}>
            <TableRowColumn>{id}</TableRowColumn>
            <TableRowColumn>{singleItem.productName}</TableRowColumn>
            <TableRowColumn>{singleItem.sft}</TableRowColumn>
            <TableRowColumn>{singleItem.rate}</TableRowColumn>
            <TableRowColumn>{singleItem.total}</TableRowColumn>
          </TableRow>
        );
      }
    });
  };
  renderSSTableRow = () => {
    let id = 0;
    return this.props.allSells.map((singleItem, index) => {
      if (singleItem.productCategoryToSell === "ss") {
        id += 1;
        return (
          <TableRow key={index}>
            <TableRowColumn>{id}</TableRowColumn>
            <TableRowColumn>{singleItem.productName}</TableRowColumn>
            <TableRowColumn>{singleItem.companyName}</TableRowColumn>
            <TableRowColumn>{singleItem.length}</TableRowColumn>
            <TableRowColumn>{singleItem.thickness}</TableRowColumn>
            <TableRowColumn>{singleItem.quantity}</TableRowColumn>
            <TableRowColumn>{singleItem.rate}</TableRowColumn>
            <TableRowColumn>{singleItem.total}</TableRowColumn>
          </TableRow>
        );
      }
    });
  };
  renderOthersTableRow = () => {
    let id = 0;
    return this.props.allSells.map((singleItem, index) => {
      if (singleItem.productCategoryToSell === "others") {
        id += 1;
        return (
          <TableRow key={index}>
            <TableRowColumn>{id}</TableRowColumn>
            <TableRowColumn>{singleItem.productName}</TableRowColumn>
            <TableRowColumn>{singleItem.quantity}</TableRowColumn>
            <TableRowColumn>{singleItem.rate}</TableRowColumn>
            <TableRowColumn>{singleItem.total}</TableRowColumn>
          </TableRow>
        );
      }
    });
  };
  haveAluminiumType = () => {
    let flag = false;
    this.props.allSells.forEach(singleSell => {
      if (singleSell.productCategoryToSell === "aluminium") {
        flag = true;
      }
    });
    return flag;
  };
  haveGlassType = () => {
    let flag = false;
    this.props.allSells.forEach(singleSell => {
      if (singleSell.productCategoryToSell === "glass") {
        flag = true;
      }
    });
    return flag;
  };
  haveSSType = () => {
    let flag = false;
    this.props.allSells.forEach(singleSell => {
      if (singleSell.productCategoryToSell === "ss") {
        flag = true;
      }
    });
    return flag;
  };
  haveOthersType = () => {
    let flag = false;
    this.props.allSells.forEach(singleSell => {
      if (singleSell.productCategoryToSell === "others") {
        flag = true;
      }
    });
    return flag;
  };
  handleDetailsModelDeleteAction = () => {
    const id = this.state.ModalData.id;
    this.props.removeSellItem(id);
    this.handleDetailsModelClose();
  };
  constructor(props) {
    super(props);
    this.state = {
      discount: 0,
      detailsModelOpen: false,
      ModalData: ""
    };
  }
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
        {/* Aluminium Table div start */}
        {this.haveAluminiumType() && (
          <div>
            <Table
              height="300px"
              fixedHeader={true}
              fixedFooter={true}
              onCellClick={this.handleAluminiumRowClick}
            >
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn
                    colSpan="9"
                    tooltip="List of Aluminium Sells Table"
                    style={{ textAlign: "center" }}
                  >
                    <h2>Aluminium Sells Table</h2>
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Product Name">
                    Name
                  </TableHeaderColumn>
                  <TableHeaderColumn tooltip="Product Company">
                    Company
                  </TableHeaderColumn>
                  <TableHeaderColumn tooltip="Product Length">
                    Length
                  </TableHeaderColumn>
                  <TableHeaderColumn tooltip="Product Dia">
                    Dia
                  </TableHeaderColumn>
                  <TableHeaderColumn tooltip="Product Color">
                    Color
                  </TableHeaderColumn>
                  <TableHeaderColumn tooltip="Product Quantity">
                    Quantity
                  </TableHeaderColumn>
                  <TableHeaderColumn tooltip="Product Rate / Price">
                    Rate
                  </TableHeaderColumn>
                  <TableHeaderColumn tooltip="Price x Quantity">
                    Total
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover={true}>
                {this.renderAluminiumTableRow()}
              </TableBody>
              <TableFooter>
                <TableRow>
                  {/* <TableRowColumn colSpan="9" className="table-footer">
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
                </TableRowColumn> */}
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
        {/* Aluminium Table div stop */}
        {/* Glass Table Row Start*/}
        {this.haveGlassType() && (
          <div>
            <Table
              height="300px"
              fixedHeader={true}
              fixedFooter={true}
              onCellClick={this.handleGlassRowClick}
            >
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn
                    colSpan="5"
                    tooltip="List of Glass Sells Table"
                    style={{ textAlign: "center" }}
                  >
                    <h2>Glass Sells Table</h2>
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Product Name">
                    Name
                  </TableHeaderColumn>
                  <TableHeaderColumn tooltip="Product SFT">
                    SFT
                  </TableHeaderColumn>
                  <TableHeaderColumn tooltip="Product Rate / Price">
                    Rate
                  </TableHeaderColumn>
                  <TableHeaderColumn tooltip="SFT x Rate">
                    Total
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover={true}>
                {this.renderGlassTableRow()}
              </TableBody>
              <TableFooter>
                <TableRow>
                  {/* <TableRowColumn colSpan="5" className="table-footer">
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
                </TableRowColumn> */}
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
        {/* Glass Table Row Stop */}
        {/* SS Table Row Start */}
        {this.haveSSType() && (
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
                    tooltip="List of SS Sells Table"
                    style={{ textAlign: "center" }}
                  >
                    <h2>SS Sells Table</h2>
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Product Name">
                    Name
                  </TableHeaderColumn>
                  <TableHeaderColumn tooltip="Product Company">
                    Company
                  </TableHeaderColumn>
                  <TableHeaderColumn tooltip="Product Length">
                    Length
                  </TableHeaderColumn>
                  <TableHeaderColumn tooltip="Product Thickness">
                    Thickness
                  </TableHeaderColumn>
                  <TableHeaderColumn tooltip="Product Quantity">
                    Quantity
                  </TableHeaderColumn>
                  <TableHeaderColumn tooltip="Product Rate / Price">
                    Rate
                  </TableHeaderColumn>
                  <TableHeaderColumn tooltip="Price x Quantity">
                    Total
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover={true}>
                {this.renderSSTableRow()}
              </TableBody>
              <TableFooter>
                <TableRow>
                  {/* <TableRowColumn colSpan="8" className="table-footer">
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
                </TableRowColumn> */}
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
        {/* SS Table Row Stop */}
        {/* Others Table Row Start */}
        {this.haveOthersType() && (
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
                    colSpan="5"
                    tooltip="List of Others Sells Table"
                    style={{ textAlign: "center" }}
                  >
                    <h2>Others Sells Table</h2>
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Product Name">
                    Name
                  </TableHeaderColumn>
                  <TableHeaderColumn tooltip="Product Quantity">
                    Quantity
                  </TableHeaderColumn>
                  <TableHeaderColumn tooltip="Product Rate / Price">
                    Rate
                  </TableHeaderColumn>
                  <TableHeaderColumn tooltip="Price x Quantity">
                    Total
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover={true}>
                {this.renderOthersTableRow()}
              </TableBody>
              <TableFooter>
                <TableRow>
                  {/* <TableRowColumn colSpan="5" className="table-footer">
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
                </TableRowColumn> */}
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
        {/* Others Table Row Stop */}
        {/* Model to Delete and Details */}
        <div>
          <Dialog
            title="Details : "
            actions={detailsModalActions}
            modal={false}
            open={this.state.detailsModelOpen}
            onRequestClose={this.handleDetailsModelClose}
          >
            {this.showDetailsToModel(
              this.state.ModalData.productCategoryToSell
            )}
          </Dialog>
        </div>
        {/* Model code End */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeSellItem: id => {
      dispatch(removeSellItem(id));
    }
  };
};

const mapStateToProps = state => {
  return {
    allSells: state.sells
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableGenerator);
