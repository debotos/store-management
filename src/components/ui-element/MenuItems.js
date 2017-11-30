import React from "react";
import { Link } from "react-router-dom";
import MenuItem from "material-ui/MenuItem";
import { history } from "../Router";

export default props => (
  <div>
    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push("/");
      }}
    >
      <Link to="/">Home</Link>
    </MenuItem>
    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push("/bank");
      }}
    >
    <Link to="/bank">Bank</Link>
    </MenuItem>

    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push("/due");
      }}
    >
      <Link to="/due">Due</Link>
    </MenuItem>
    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push("/employee");
      }}
    >
      <Link to="/employee">Employee</Link>
    </MenuItem>
    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push("/expenses");
      }}
    >
      <Link to="/expenses">Expenses</Link>
    </MenuItem>
    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push("/fabrication");
      }}
    >
      <Link to="/fabrication">Fabrication</Link>
    </MenuItem>
    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push("/moneyreceipt");
      }}
    >
      <Link to="/moneyreceipt">Money Receipt</Link>
    </MenuItem>
    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push("/pad");
      }}
    >
      <Link to="/pad">Pad</Link>
    </MenuItem>
    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push("/readycash");
      }}
    >
      <Link to="/readycash">Ready Cash</Link>
    </MenuItem>
    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push("/salary");
      }}
    >
      <Link to="/salary">Salary</Link>
    </MenuItem>
    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push("/sell");
      }}
    >
      <Link to="/sell">Sells</Link>
    </MenuItem>
    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push("/stock");
      }}
    >
      <Link to="/stock">Stock</Link>
    </MenuItem>
  </div>
);
