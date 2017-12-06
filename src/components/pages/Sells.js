import React, { Component } from "react";
import { Card } from "material-ui/Card";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { Tabs, Tab } from "material-ui/Tabs";
import SwipeableViews from "react-swipeable-views";

import Aluminium from "./subPages/sells/Forms/Aluminium";
import Glass from "./subPages/sells/Forms/Glass";
import SS from "./subPages/sells/Forms/SS";
import Others from "./subPages/sells/Forms/Others";
import AppBarMain from "../ui-element/AppBarMain";
import SnackBar from "../ui-element/SnackBar";
import CustomerDetailsForm from "./subPages/sells/CustomerDetailsForm";
import TableGenerator from './subPages/sells/Tables/TableGenerator'

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
              <div className="container" style={{marginBottom: 10}}>
                {this.state.selectedItem === "Thai Aluminium" && <Aluminium showSnackBar={this.showSnackBar}/>}
                {this.state.selectedItem === "Glass" && <Glass showSnackBar={this.showSnackBar}/>}
                {this.state.selectedItem === "SS" && <SS showSnackBar={this.showSnackBar}/>}
                {this.state.selectedItem === "Others" && <Others showSnackBar={this.showSnackBar}/>}
              </div>

              {/*Below div Sells Table Section*/}
              <TableGenerator showSnackBar={this.showSnackBar}/>
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


export default Sells;
