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
import TextField from "material-ui/TextField";
import Toggle from "material-ui/Toggle";
import { Card } from "material-ui/Card";

import "../../../../../style/sells/table.css";
import { removeSellItem } from "../../../../../actions/sells/sells-actions";

class TableGenerator extends Component {
  handleAluminiumDiscountToggle = (event, isInputChecked) => {
    if (isInputChecked) {
      this.setState({ aluminiumDiscountToggle: true });
    } else {
      this.setState({ aluminiumDiscountToggle: false });
      this.setState({ aluminiumDiscount: 0 });
    }
  };
  handleGlassDiscountToggle = (event, isInputChecked) => {
    if (isInputChecked) {
      this.setState({ glassDiscountToggle: true });
    } else {
      this.setState({ glassDiscountToggle: false });
      this.setState({ glassDiscount: 0 });
    }
  };
  handleSSDiscountToggle = (event, isInputChecked) => {
    if (isInputChecked) {
      this.setState({ ssDiscountToggle: true });
    } else {
      this.setState({ ssDiscountToggle: false });
      this.setState({ ssDiscount: 0 });
    }
  };
  handleOthersDiscountToggle = (event, isInputChecked) => {
    if (isInputChecked) {
      this.setState({ othersDiscountToggle: true });
    } else {
      this.setState({ othersDiscountToggle: false });
      this.setState({ othersDiscount: 0 });
    }
  };
  handleAluminiumRowClick = (row, column, event) => {
    this.setState({ ModalData: this.props.allSells.aluminium[row] });
    this.handleDetailsModelOpen();
  };
  handleGlassRowClick = (row, column, event) => {
    this.setState({ ModalData: this.props.allSells.glass[row] });
    this.handleDetailsModelOpen();
  };
  handleSSRowClick = (row, column, event) => {
    this.setState({ ModalData: this.props.allSells.ss[row] });
    this.handleDetailsModelOpen();
  };
  handleOthersRowClick = (row, column, event) => {
    this.setState({ ModalData: this.props.allSells.others[row] });
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
    return this.props.allSells.aluminium.map((singleItem, index) => {
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
    return this.props.allSells.glass.map((singleItem, index) => {
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
    return this.props.allSells.ss.map((singleItem, index) => {
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
    return this.props.allSells.others.map((singleItem, index) => {
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
    this.props.allSells.aluminium.forEach(singleSell => {
      if (singleSell.productCategoryToSell === "aluminium") {
        flag = true;
      }
    });
    return flag;
  };
  haveGlassType = () => {
    let flag = false;
    this.props.allSells.glass.forEach(singleSell => {
      if (singleSell.productCategoryToSell === "glass") {
        flag = true;
      }
    });
    return flag;
  };
  haveSSType = () => {
    let flag = false;
    this.props.allSells.ss.forEach(singleSell => {
      if (singleSell.productCategoryToSell === "ss") {
        flag = true;
      }
    });
    return flag;
  };
  haveOthersType = () => {
    let flag = false;
    this.props.allSells.others.forEach(singleSell => {
      if (singleSell.productCategoryToSell === "others") {
        flag = true;
      }
    });
    return flag;
  };
  handleDetailsModelDeleteAction = () => {
    const id = this.state.ModalData.id;
    const productCategoryToSell = this.state.ModalData.productCategoryToSell;
    this.props.removeSellItem(id, productCategoryToSell);
    this.handleDetailsModelClose();
  };
  handleAluminiumDiscountChange = event => {
    const aluminiumDiscount = event.target.value;
    if (!aluminiumDiscount || aluminiumDiscount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      if (aluminiumDiscount > 100 || aluminiumDiscount < 0) {
        this.props.showSnackBar("Wrong Input ! [max:100 & min:0]");
      } else {
        this.setState({ aluminiumDiscount });
      }
    }
  };
  handleGlassDiscountChange = event => {
    const glassDiscount = event.target.value;
    if (!glassDiscount || glassDiscount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      if (glassDiscount > 100 || glassDiscount < 0) {
        this.props.showSnackBar("Wrong Input ! [max:100 & min:0]");
      } else {
        this.setState({ glassDiscount });
      }
    }
  };
  handleSSDiscountChange = event => {
    const ssDiscount = event.target.value;
    if (!ssDiscount || ssDiscount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      if (ssDiscount > 100 || ssDiscount < 0) {
        this.props.showSnackBar("Wrong Input ! [max:100 & min:0]");
      } else {
        this.setState({ ssDiscount });
      }
    }
  };
  handleOthersDiscountChange = event => {
    const othersDiscount = event.target.value;
    if (!othersDiscount || othersDiscount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      if (othersDiscount > 100 || othersDiscount < 0) {
        this.props.showSnackBar("Wrong Input ! [max:100 & min:0]");
      } else {
        this.setState({ othersDiscount });
      }
    }
  };

  handleoveridefinallyAllTotal = event => {
    const finallyAllTotalField = event.target.value;
    this.setState({ finallyAllTotalField });
  };

  handleoverideTotalSumOfAluminium = event => {
    const overideTotalSumOfAluminium = event.target.value;
    this.setState({ overideTotalSumOfAluminium });
  };
  handleoverideTotalSumOfGlass = event => {
    const overideTotalSumOfGlass = event.target.value;
    this.setState({ overideTotalSumOfGlass });
  };
  handleoverideTotalSumOfSS = event => {
    const overideTotalSumOfSS = event.target.value;
    this.setState({ overideTotalSumOfSS });
  };
  handleoverideTotalSumOfOthers = event => {
    const overideTotalSumOfOthers = event.target.value;
    this.setState({ overideTotalSumOfOthers });
  };
  calculateAluminiumSUM = () => {
    let SUM = 0;
    this.props.allSells.aluminium.forEach(singleItem => {
      SUM = parseFloat(SUM) + parseFloat(singleItem.total);
    });
    let finalDiscountAmount =
      SUM.toFixed(2) *
      (this.state.aluminiumDiscount
        ? parseFloat(this.state.aluminiumDiscount)
        : 0) /
      100;
    // if (finalDiscountAmount !== 0 && finalDiscountAmount) {
    //   this.props.showSnackBar(`Discount amount = ${finalDiscountAmount}`);
    // }
    finalDiscountAmount = finalDiscountAmount.toFixed(2);
    let finalResult = (SUM.toFixed(2) - finalDiscountAmount).toFixed(2);
    return [finalDiscountAmount, finalResult];
  };
  calculateGlassSUM = () => {
    let SUM = 0;
    this.props.allSells.glass.forEach(singleItem => {
      SUM = parseFloat(SUM) + parseFloat(singleItem.total);
    });
    let finalDiscountAmount =
      SUM.toFixed(2) *
      (this.state.glassDiscount ? parseFloat(this.state.glassDiscount) : 0) /
      100;
    // if (finalDiscountAmount !== 0 && finalDiscountAmount) {
    //   this.props.showSnackBar(`Discount amount = ${finalDiscountAmount}`);
    // }
    finalDiscountAmount = finalDiscountAmount.toFixed(2);
    let finalResult = (SUM.toFixed(2) - finalDiscountAmount).toFixed(2);
    return [finalDiscountAmount, finalResult];
  };
  calculateSSSUM = () => {
    let SUM = 0;
    this.props.allSells.ss.forEach(singleItem => {
      SUM = parseFloat(SUM) + parseFloat(singleItem.total);
    });
    let finalDiscountAmount =
      SUM.toFixed(2) *
      (this.state.ssDiscount ? parseFloat(this.state.ssDiscount) : 0) /
      100;
    // if (finalDiscountAmount !== 0 && finalDiscountAmount) {
    //   this.props.showSnackBar(`Discount amount = ${finalDiscountAmount}`);
    // }
    finalDiscountAmount = finalDiscountAmount.toFixed(2);
    let finalResult = (SUM.toFixed(2) - finalDiscountAmount).toFixed(2);
    return [finalDiscountAmount, finalResult];
  };
  calculateOthersSUM = () => {
    let SUM = 0;
    this.props.allSells.others.forEach(singleItem => {
      SUM = parseFloat(SUM) + parseFloat(singleItem.total);
    });
    let finalDiscountAmount =
      SUM.toFixed(2) *
      (this.state.othersDiscount ? parseFloat(this.state.othersDiscount) : 0) /
      100;
    // if (finalDiscountAmount !== 0 && finalDiscountAmount) {
    //   this.props.showSnackBar(`Discount amount = ${finalDiscountAmount}`);
    // }
    finalDiscountAmount = finalDiscountAmount.toFixed(2);
    let finalResult = (SUM.toFixed(2) - finalDiscountAmount).toFixed(2);
    return [finalDiscountAmount, finalResult];
  };
  finallyAllTotal = () => {
    const aluminiumSum = this.state.overideTotalSumOfAluminium
      ? parseFloat(this.state.overideTotalSumOfAluminium)
      : parseFloat(this.calculateAluminiumSUM()[1]);
    const glassSum = this.state.overideTotalSumOfGlass
      ? parseFloat(this.state.overideTotalSumOfGlass)
      : parseFloat(this.calculateGlassSUM()[1]);
    const ssSum = this.state.overideTotalSumOfSS
      ? parseFloat(this.state.overideTotalSumOfSS)
      : parseFloat(this.calculateSSSUM()[1]);
    const othersSum = this.state.overideTotalSumOfOthers
      ? parseFloat(this.state.overideTotalSumOfOthers)
      : parseFloat(this.calculateOthersSUM()[1]);

    let total = (aluminiumSum + glassSum + ssSum + othersSum).toFixed(2);
    if (this.state.finallyAllTotalField) {
      let sendTotalValue = parseFloat(this.state.finallyAllTotalField).toFixed(
        2
      );
      this.props.setAllTotal(sendTotalValue);
      return sendTotalValue;
    } else {
      this.props.setAllTotal(total);
      return total;
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      aluminiumDiscount: null,
      glassDiscount: null,
      ssDiscount: null,
      othersDiscount: null,
      detailsModelOpen: false,
      ModalData: "",
      aluminiumDiscountToggle: false,
      glassDiscountToggle: false,
      ssDiscountToggle: false,
      othersDiscountToggle: false,
      overideTotalSumOfAluminium: "",
      overideTotalSumOfGlass: "",
      overideTotalSumOfSS: "",
      overideTotalSumOfOthers: "",
      finallyAllTotalField: ""
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
          <div style={{ border: "2px solid  #00BCD4", margin: "3px" }}>
            <Table
              height="200px"
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
                <TableRow
                  style={{
                    padding: 5,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center"
                  }}
                >
                  <TableRowColumn>
                    <Toggle
                      style={{ marginTop: 8 }}
                      defaultToggled={this.state.aluminiumDiscountToggle}
                      onToggle={this.handleAluminiumDiscountToggle}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.aluminiumDiscountToggle && (
                      <div>
                        <TextField
                          style={{ marginBottom: 10 }}
                          type="number"
                          value={this.state.aluminiumDiscount}
                          onChange={this.handleAluminiumDiscountChange}
                          hintText="Discount (%)"
                        />
                      </div>
                    )}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.aluminiumDiscountToggle && (
                      <h3 style={{ marginTop: 8 }}>
                        Discount ={" "}
                        {this.calculateAluminiumSUM()[0] && (
                          <b>{this.calculateAluminiumSUM()[0]}</b>
                        )}
                      </h3>
                    )}
                  </TableRowColumn>

                  <TableRowColumn>
                    <h3 style={{ marginTop: 8 }}>
                      Result ={" "}
                      {this.calculateAluminiumSUM()[1] !== 0 &&
                      this.calculateAluminiumSUM()[1] ? (
                        <b>{this.calculateAluminiumSUM()[1]}</b>
                      ) : (
                        <b style={{ color: "red" }}>?</b>
                      )}
                    </h3>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      style={{ marginBottom: 10 }}
                      type="number"
                      value={this.state.overideTotalSumOfAluminium}
                      onChange={this.handleoverideTotalSumOfAluminium}
                      hintText="Finally"
                    />
                  </TableRowColumn>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
        {/* Aluminium Table div stop */}
        {/* Glass Table Row Start*/}
        {this.haveGlassType() && (
          <div style={{ border: "2px solid  #00BCD4", margin: "3px" }}>
            <Table
              height="200px"
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
                <TableRow
                  style={{
                    padding: 5,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center"
                  }}
                >
                  <TableRowColumn>
                    <Toggle
                      style={{ marginTop: 8 }}
                      defaultToggled={this.state.glassDiscountToggle}
                      onToggle={this.handleGlassDiscountToggle}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.glassDiscountToggle && (
                      <div>
                        <TextField
                          style={{ marginBottom: 10 }}
                          type="number"
                          value={this.state.glassDiscount}
                          onChange={this.handleGlassDiscountChange}
                          hintText="Discount (%)"
                          className="table-footer-discount"
                        />
                      </div>
                    )}
                  </TableRowColumn>

                  <TableRowColumn>
                    {this.state.glassDiscountToggle && (
                      <h3 style={{ marginTop: 8 }}>
                        Discount ={" "}
                        {this.calculateGlassSUM()[0] && (
                          <b>{this.calculateGlassSUM()[0]}</b>
                        )}
                      </h3>
                    )}
                  </TableRowColumn>
                  <TableRowColumn>
                    <h3 style={{ marginTop: 8 }}>
                      Result ={" "}
                      {this.calculateGlassSUM()[1] !== 0 &&
                      this.calculateGlassSUM()[1] ? (
                        <b>{this.calculateGlassSUM()[1]}</b>
                      ) : (
                        <b style={{ color: "red" }}>?</b>
                      )}
                    </h3>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      style={{ marginBottom: 10 }}
                      type="number"
                      value={this.state.overideTotalSumOfGlass}
                      onChange={this.handleoverideTotalSumOfGlass}
                      hintText="Finally"
                    />
                  </TableRowColumn>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
        {/* Glass Table Row Stop */}
        {/* SS Table Row Start */}
        {this.haveSSType() && (
          <div style={{ border: "2px solid  #00BCD4", margin: "3px" }}>
            <Table
              height="200px"
              fixedHeader={true}
              fixedFooter={true}
              onCellClick={this.handleSSRowClick}
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
                <TableRow
                  style={{
                    padding: 5,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center"
                  }}
                >
                  <TableRowColumn>
                    <Toggle
                      style={{ marginTop: 8 }}
                      defaultToggled={this.state.ssDiscountToggle}
                      onToggle={this.handleSSDiscountToggle}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.ssDiscountToggle && (
                      <div>
                        <TextField
                          style={{ marginBottom: 10 }}
                          type="number"
                          value={this.state.ssDiscount}
                          onChange={this.handleSSDiscountChange}
                          hintText="Discount (%)"
                          className="table-footer-discount"
                        />
                      </div>
                    )}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.ssDiscountToggle && (
                      <h3 style={{ marginTop: 8 }}>
                        Discount ={" "}
                        {this.calculateSSSUM()[0] && (
                          <b>{this.calculateSSSUM()[0]}</b>
                        )}
                      </h3>
                    )}
                  </TableRowColumn>
                  <TableRowColumn>
                    <h3 style={{ marginTop: 8 }}>
                      Result ={" "}
                      {this.calculateSSSUM()[1] !== 0 &&
                      this.calculateSSSUM()[1] ? (
                        <b>{this.calculateSSSUM()[1]}</b>
                      ) : (
                        <b style={{ color: "red" }}>?</b>
                      )}
                    </h3>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      style={{ marginBottom: 10 }}
                      type="number"
                      value={this.state.overideTotalSumOfSS}
                      onChange={this.handleoverideTotalSumOfSS}
                      hintText="Finally"
                    />
                  </TableRowColumn>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
        {/* SS Table Row Stop */}
        {/* Others Table Row Start */}
        {this.haveOthersType() && (
          <div style={{ border: "3px solid  #00BCD4", margin: "3px" }}>
            <Table
              height="200px"
              fixedHeader={true}
              fixedFooter={true}
              onCellClick={this.handleOthersRowClick}
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
                <TableRow
                  style={{
                    padding: 5,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center"
                  }}
                >
                  <TableRowColumn>
                    <Toggle
                      style={{ marginTop: 8 }}
                      defaultToggled={this.state.othersDiscountToggle}
                      onToggle={this.handleOthersDiscountToggle}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.othersDiscountToggle && (
                      <div>
                        <TextField
                          style={{ marginBottom: 10 }}
                          type="number"
                          value={this.state.othersDiscount}
                          onChange={this.handleOthersDiscountChange}
                          hintText="Discount (%)"
                          className="table-footer-discount"
                        />
                      </div>
                    )}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.othersDiscountToggle && (
                      <h3 style={{ marginTop: 8 }}>
                        Discount ={" "}
                        {this.calculateOthersSUM()[0] && (
                          <b>{this.calculateOthersSUM()[0]}</b>
                        )}
                      </h3>
                    )}
                  </TableRowColumn>
                  <TableRowColumn>
                    <h3 style={{ marginTop: 8 }}>
                      Result ={" "}
                      {this.calculateOthersSUM()[1] !== 0 &&
                      this.calculateOthersSUM()[1] ? (
                        <b>{this.calculateOthersSUM()[1]}</b>
                      ) : (
                        <b style={{ color: "red" }}>?</b>
                      )}
                    </h3>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      style={{ marginBottom: 10 }}
                      type="number"
                      value={this.state.overideTotalSumOfOthers}
                      onChange={this.handleoverideTotalSumOfOthers}
                      hintText="Finally"
                    />
                  </TableRowColumn>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
        {/* Others Table Row Stop */}
        {/* Finally All Table Total */}
        {(this.props.allSells.aluminium.length > 0 ||
          this.props.allSells.glass.length > 0 ||
          this.props.allSells.ss.length > 0 ||
          this.props.allSells.others.length > 0) && (
          <Card
            className="container"
            style={{
              textAlign: "center",
              marginTop: 10
            }}
          >
            <span
              style={{
                marginRight: 15,
                fontSize: "30px",
                color: "#00CD00"
              }}
            >
              <strong>Totally = {this.finallyAllTotal()}</strong>
            </span>
            <TextField
              style={{
                color: "#00CD00"
              }}
              type="number"
              value={this.state.finallyAllTotalField}
              onChange={this.handleoveridefinallyAllTotal}
              hintText="Overide Final Result"
            />
          </Card>
        )}

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
    removeSellItem: (id, productCategoryToSell) => {
      dispatch(removeSellItem(id, productCategoryToSell));
    }
  };
};

const mapStateToProps = state => {
  return {
    allSells: state.sells
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableGenerator);
