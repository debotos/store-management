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
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { connect } from "react-redux";

import { startDeleteSellUnderCustomerHistory } from "../../../../../actions/sells/sells-history-actions";

const uuidv4 = require("uuid/v4");
// {this.props.allTables} returning [Array of object]

class HistoryTableGenerator extends Component {
  handleOpen = () => {
    this.setState({ modelOpen: true });
  };

  handleClose = () => {
    this.setState({ modelOpen: false });
  };

  handleFinalOpen = () => {
    this.setState({ finalModelOpen: true });
  };

  handleFinalClose = () => {
    this.setState({ finalModelOpen: false });
  };
  constructor(props) {
    super(props);
    this.state = {
      modelOpen: false,
      modelData: "",
      finalModelOpen: false,
      finalModelData: "",
      date: "",
      customer: ""
    };
  }
  // Give me an array of object whose type is others and i will render a tabel
  renderOthersTableRow = others => {
    let id = 0;
    return others.map((singleItem, index) => {
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
    });
  };
  renderOthersTable = others => {
    return (
      <div key={uuidv4()}>
        <Table
          bodyStyle={{ overflow: "visible", width: "-fit-content" }}
          height="200px"
          style={{ tableLayout: "auto" }}
          fixedHeader={false}
          fixedFooter={false}
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
              <TableHeaderColumn tooltip="Product Name">Name</TableHeaderColumn>
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
            {this.renderOthersTableRow(others.table)}
          </TableBody>
        </Table>
        <div style={{ textAlign: "center", margin: 5 }}>
          <FlatButton
            label="More Details"
            onClick={() => this.handleDetailsButton(others.attribute)}
          />
        </div>
      </div>
    );
  };
  // Give me an array of object whose type is ss and i will render a tabel
  renderSSTableRow = ss => {
    let id = 0;
    return ss.map((singleItem, index) => {
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
    });
  };
  renderSSTable = ss => {
    return (
      <div key={uuidv4()}>
        <Table
          bodyStyle={{ overflow: "visible", width: "-fit-content" }}
          height="200px"
          style={{ tableLayout: "auto" }}
          fixedHeader={false}
          fixedFooter={false}
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
              <TableHeaderColumn tooltip="Product Name">Name</TableHeaderColumn>
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
            {this.renderSSTableRow(ss.table)}
          </TableBody>
        </Table>
        <div style={{ textAlign: "center", margin: 5 }}>
          <FlatButton
            label="More Details"
            onClick={() => this.handleDetailsButton(ss.attribute)}
          />
        </div>
      </div>
    );
  };
  // Give me an array of object whose type is aluminium and i will render a tabel
  renderAluminiumTableRow = aluminium => {
    let id = 0;
    return aluminium.map((singleItem, index) => {
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
    });
  };

  renderAluminiumTable = aluminium => {
    return (
      <div key={uuidv4()}>
        <Table
          bodyStyle={{ overflow: "visible", width: "-fit-content" }}
          height="200px"
          style={{ tableLayout: "auto" }}
          fixedHeader={false}
          fixedFooter={false}
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
              <TableHeaderColumn tooltip="Product Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="Product Company">
                Company
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Product Length">
                Length
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Product Dia">Dia</TableHeaderColumn>
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
            {this.renderAluminiumTableRow(aluminium.table)}
          </TableBody>
        </Table>
        <div style={{ textAlign: "center", margin: 5 }}>
          <FlatButton
            label="More Details"
            onClick={() => this.handleDetailsButton(aluminium.attribute)}
          />
        </div>
      </div>
    );
  };
  // Give me an array of object whose type is glass and i will render a tabel
  renderGlassTableRow = glass => {
    let id = 0;
    return glass.map((singleItem, index) => {
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
    });
  };
  renderGlassTable = glass => {
    return (
      <div key={uuidv4()}>
        <Table
          bodyStyle={{ overflow: "visible", width: "-fit-content" }}
          height="200px"
          style={{ tableLayout: "auto" }}
          fixedHeader={false}
          fixedFooter={false}
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
              <TableHeaderColumn tooltip="Product Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="Product SFT">SFT</TableHeaderColumn>
              <TableHeaderColumn tooltip="Product Rate / Price">
                Rate
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="SFT x Rate">Total</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {this.renderGlassTableRow(glass.table)}
          </TableBody>
        </Table>
        <div style={{ textAlign: "center", margin: 5 }}>
          <FlatButton
            label="More Details"
            onClick={() => this.handleDetailsButton(glass.attribute)}
          />
        </div>
      </div>
    );
  };
  handleDetailsButton = attribute => {
    this.setState({ modelData: attribute });
    this.handleOpen();
  };
  getAndShowModelData = () => {
    let modelData = this.state.modelData;
    return (
      <div>
        <strong>All Total = {modelData.allCellTotal}</strong> <br />
        <strong>Discount = {modelData.discount} %</strong>
        <br />
        <strong>Discount Amount = {modelData.discountAmount} </strong>
        <br />
        <strong>After Discount = {modelData.afterDiscountTotal} </strong>
        <br />
        <strong>Friendly Discount = {modelData.friendlyDiscount} </strong>
        <br />
        <strong>
          After Friendly Discount = {modelData.afterFriendlyDiscountTotal}{" "}
        </strong>
        <br />
        <strong>Finally Total = {modelData.atLastTotalAll}</strong> <br />
      </div>
    );
  };
  handleFinalDetailsButton = (data, date, customer) => {
    this.setState({ finalModelData: data });
    this.setState({ date });
    this.setState({ customer });
    this.handleFinalOpen();
  };
  getAndShowFinalModelData = () => {
    let finalModelData = this.state.finalModelData;
    let { deposit, prevDue, totalWithDue, newDue } = this.state.customer;
    return (
      <div>
        <strong>
          All Table Total = {finalModelData.total} <br />
          Friendly Discount = {finalModelData.finalFriendlyDiscount} <br />
          <span style={{ color: "green" }}>
            After Friendly Discount = {finalModelData.finalTotal}
          </span>{" "}
          <br />
          <span style={{ color: "red" }}>
            [{this.state.date}] At the time of Saving History Previous Due is ={" "}
            {prevDue}
          </span>{" "}
          <br />
          <span style={{ color: "green" }}>
            Amount After Friendly Discount + Previous Due [ BILL HAVE TO PAY ] ={" "}
            {totalWithDue}
          </span>{" "}
          <br />
          <span style={{ color: "blue" }}>Deposited = {deposit}</span> <br />
          <span style={{ color: "red" }}>
            At the time of Saving History Left with Due = {newDue}{" "}
          </span>
        </strong>
      </div>
    );
  };
  renderTable = () => {
    return this.props.allTables.map((singleSell, index) => {
      // {singleSell} is an [Object]
      // Destructuring the singleItem Object
      let { aluminium, glass, ss, others, date } = singleSell.items;
      // {aluminium, glass, ss, others} each one containing an [array of objects]
      let AluminiumTable = [];
      let GlassTable = [];
      let SSTable = [];
      let OthersTable = [];

      if (aluminium && aluminium.length > 0) {
        aluminium.forEach(singleItem => {
          AluminiumTable.push(this.renderAluminiumTable(singleItem));
        });
      }

      if (glass && glass.length > 0) {
        glass.forEach(singleItem => {
          GlassTable.push(this.renderGlassTable(singleItem));
        });
      }

      if (ss && ss.length > 0) {
        ss.forEach(singleItem => {
          SSTable.push(this.renderSSTable(singleItem));
        });
      }

      if (others && others.length > 0) {
        others.forEach(singleItem => {
          OthersTable.push(this.renderOthersTable(singleItem));
        });
      }

      return (
        <div key={index} style={{ margin: "2px" }}>
          <Card>
            <CardHeader
              title={`${this.toTitleCase(singleSell.customer.name)} ${
                singleSell.customer.number
              } ${singleSell.customer.mail}`}
              subtitle={`Memo No: ${singleSell.memoNumber} Date: ${date}`}
              actAsExpander={true}
              showExpandableButton={true}
            />

            <CardText expandable={true}>
              {AluminiumTable}
              {GlassTable}
              {SSTable}
              {OthersTable}
            </CardText>

            <CardActions>
              <RaisedButton
                style={{ margin: 5 }}
                label="Final Sell Details"
                onClick={() =>
                  this.handleFinalDetailsButton(
                    singleSell.allTotal,
                    date,
                    singleSell.customer
                  )
                }
              />
              <RaisedButton
                style={{ margin: 5 }}
                primary={true}
                label="Print"
              />
              <RaisedButton
                style={{ margin: 5 }}
                secondary={true}
                label="Delete"
                onClick={() =>
                  this.handleSellHistoryDelete(
                    singleSell.id,
                    singleSell.customer.number
                  )
                }
              />
            </CardActions>
          </Card>
        </div>
      );
    });
  };
  handleSellHistoryDelete = (id, number) => {
    this.props.startDeleteSellUnderCustomerHistory(id, number);
  };
  toTitleCase = str => {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  render() {
    const actions = [
      <FlatButton label="Okey" primary={true} onClick={this.handleClose} />
    ];
    const finalActions = [
      <FlatButton label="Okey" primary={true} onClick={this.handleFinalClose} />
    ];
    return (
      <div>
        {this.renderTable()}
        <div>
          <Dialog
            title="Table Details"
            actions={actions}
            modal={true}
            open={this.state.modelOpen}
          >
            {this.getAndShowModelData()}
          </Dialog>
          <Dialog
            title="Final Details Of This Sell"
            actions={finalActions}
            modal={true}
            open={this.state.finalModelOpen}
          >
            {this.getAndShowFinalModelData()}
          </Dialog>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startDeleteSellUnderCustomerHistory: (id, number) => {
      dispatch(startDeleteSellUnderCustomerHistory(id, number));
    }
  };
};

export default connect(null, mapDispatchToProps)(HistoryTableGenerator);
