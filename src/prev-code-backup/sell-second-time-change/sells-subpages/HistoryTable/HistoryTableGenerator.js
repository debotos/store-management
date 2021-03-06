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

// {this.props.allTables} returning [Array of object]

class HistoryTableGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      <div>
        <Table height="150px" fixedHeader={true} fixedFooter={true}>
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
            {this.renderOthersTableRow(others)}
          </TableBody>
        </Table>
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
      <div>
        <Table height="150px" fixedHeader={true} fixedFooter={true}>
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
            {this.renderSSTableRow(ss)}
          </TableBody>
        </Table>
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
      <div>
        <Table height="150px" fixedHeader={true} fixedFooter={true}>
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
            {this.renderAluminiumTableRow(aluminium)}
          </TableBody>
        </Table>
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
      <div>
        <Table height="150px" fixedHeader={true} fixedFooter={true}>
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
            {this.renderGlassTableRow(glass)}
          </TableBody>
        </Table>
      </div>
    );
  };

  renderTable = () => {
    return this.props.allTables.map((singleSell, index) => {
      // {singleSell} is an [Object]
      // Destructuring the singleItem Object
      console.log("History i want to see ", singleSell)
      console.log("So i want an object but getting ==>> ", typeof singleSell)
      let { aluminium, glass, ss, others, date } = singleSell;
      // {aluminium, glass, ss, others} each one containing an [array of objects]
      console.log(glass);
      console.log(aluminium);
      console.log(ss);
      console.log(others);
      return (
        <div
          key={index}
          style={{ border: "3px solid  #00BCD4", margin: "3px" }}
        >
          <h2 style={{ textAlign: "center" }}>
            <strong>Date: {date}</strong>
          </h2>

          {(aluminium && (aluminium.length > 0)) && this.renderAluminiumTable(aluminium)}
          {(glass && (glass.length > 0)) && this.renderGlassTable(glass)}
          {(ss && (ss.length > 0)) && this.renderSSTable(ss)}
          {(others && (others.length > 0)) && this.renderOthersTable(others)}
        </div>
      );
    });
  };

  render() {
    return <div>{this.renderTable()}</div>;
  }
}

export default HistoryTableGenerator;
