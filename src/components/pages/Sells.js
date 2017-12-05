import React, { Component } from "react";
import { Card, CardActions } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import Toggle from "material-ui/Toggle";
import { connect } from "react-redux";
import uuid from "uuid/v4";
import { Tabs, Tab } from "material-ui/Tabs";
import SwipeableViews from "react-swipeable-views";

import Aluminium from "./subPages/sells/Forms/Aluminium";
import Glass from "./subPages/sells/Forms/Glass";
import SS from "./subPages/sells/Forms/SS";
import Others from "./subPages/sells/Forms/Others";
import AppBarMain from "../ui-element/AppBarMain";
import SellsTable from "./subPages/sells/SellsTable";
import { addSellItem } from "../../actions/sells/sells-actions";
import SnackBar from "../ui-element/SnackBar";
import CustomerDetailsForm from "./subPages/sells/CustomerDetailsForm";

const tabStyles = {
  slide: {
    padding: 10
  }
};

const items = [
  <MenuItem key={1} value="Thai Aluminium" primaryText="Thai Aluminium" />,
  <MenuItem key={2} value="Glass" primaryText="Glass" />,
  <MenuItem key={3} value="SS" primaryText="SS" />,
  <MenuItem key={4} value="Others" primaryText="Others" />
];

class Sells extends Component {
  // SnackBar Functions
  handleActionTouchTap = () => {
    this.setState({
      snackBar: false
    });
  };

  handleRequestClose = () => {
    this.handleActionTouchTap();
  };

  showSnackBar = message => {
    this.setState({
      snackBar: true,
      snackBarMessage: message
    });
  };
  // End
  handleSelectedItemChange = (event, index, value) =>
    this.setState({ selectedItem: value });

  handleTabChange = value => {
    this.setState({
      slideIndex: value
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      selectedItem: null,
      snackBar: false,
      snackBarMessage: ""
    };
  }

  render() {
    return (
      <div>
        {/* Main App Bar */}
        <AppBarMain />
        {/* Tab Section */}

        <div>
          <Tabs
            className="container"
            style={{ marginTop: 10 }}
            onChange={this.handleTabChange}
            value={this.state.slideIndex}
          >
            <Tab label="Sell" value={0} />
            <Tab label="History" value={1} />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleTabChange}
          >
            {/* First Tab Started */}
            <div>
              <div
                className="container"
                style={{ textAlign: "center", marginTop: 5, marginBottom: 5 }}
              >
                <Card>
                  <SelectField
                    value={this.state.selectedItem}
                    onChange={this.handleSelectedItemChange}
                  >
                    {items}
                  </SelectField>
                </Card>
              </div>
              <div className="container">
                {this.state.selectedItem === "Thai Aluminium" && <Aluminium />}
                {this.state.selectedItem === "Glass" && <Glass />}
                {this.state.selectedItem === "SS" && <SS />}
                {this.state.selectedItem === "Others" && <Others />}
              </div>

              {/*Below div Sells Table Section*/}
              {/* <div>
                <SellsTable
                  showSnackBar={this.showSnackBar}
                  AllTotal={this.AllTotal}
                />
              </div> */}
              {/* Below div is Customer Details Getting Form */}
              {/* <div>
                <CustomerDetailsForm
                  sellsTable={this.props.sellsTable}
                  AllTotal={this.state.AllTotal}
                  showSnackBar={this.showSnackBar}
                />
              </div> */}
            </div>
            {/* End of the First Tab */}
            {/* Second Tab Started */}
            <div style={tabStyles.slide}>I am second tab</div>
          </SwipeableViews>
        </div>

        <SnackBar
          snackBar={this.state.snackBar}
          snackBarMessage={this.state.snackBarMessage}
          handleActionTouchTap={this.handleActionTouchTap}
          handleRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSellItem: sellItemData => {
      dispatch(addSellItem(sellItemData));
    }
  };
};

const mapStateToProps = state => {
  return {
    sellsTable: state.sells,
    stock: state.stock
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sells);
