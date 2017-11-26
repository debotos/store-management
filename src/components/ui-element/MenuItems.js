import React from "react";
import { Link } from "react-router-dom";
import MenuItem from "material-ui/MenuItem";

export default () => (
  <div>
    <MenuItem onClick={this.handleClose}>
      <Link to="/">Home</Link>
    </MenuItem>
    <MenuItem onClick={this.handleClose}>
      <Link to="/bank">Bank</Link>
    </MenuItem>
    <MenuItem onClick={this.handleClose}>
      <Link to="/due">Due</Link>
    </MenuItem>
    <MenuItem onClick={this.handleClose}>
      <Link to="/employee">Employee</Link>
    </MenuItem>
    <MenuItem onClick={this.handleClose}>
      <Link to="/expenses">Expenses</Link>
    </MenuItem>
    <MenuItem onClick={this.handleClose}>
      <Link to="/fabrication">Fabrication</Link>
    </MenuItem>
    <MenuItem onClick={this.handleClose}>
      <Link to="/moneyreceipt">Money Receipt</Link>
    </MenuItem>
    <MenuItem onClick={this.handleClose}>
      <Link to="/pad">Pad</Link>
    </MenuItem>
    <MenuItem onClick={this.handleClose}>
      <Link to="/readycash">Ready Cash</Link>
    </MenuItem>
    <MenuItem onClick={this.handleClose}>
      <Link to="/salary">Salary</Link>
    </MenuItem>
    <MenuItem onClick={this.handleClose}>
      <Link to="/sell">Sell</Link>
    </MenuItem>
    <MenuItem onClick={this.handleClose}>
      <Link to="/stock">Stock</Link>
    </MenuItem>
  </div>
);
