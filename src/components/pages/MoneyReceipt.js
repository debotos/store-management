import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "material-ui/Card";
import TextField from "material-ui/TextField";
import SnackBar from "../ui-element/SnackBar";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import numeral from "numeral";

import AppBarMain from "../ui-element/AppBarMain";
import "../../style/due/due.css";
import { setDueTextFilter } from "../../actions/due/due-filter-actions";
import dueFilter from "./subPages/due/utility-func/due-filter";
import {
  startRemovePrevDue,
  startUpdatePrevDue
} from "../../actions/sells/prevDue-actions";
// import Navigation from "../Navigation";

const customDialogContentStyle = {
  width: "90%",
  maxWidth: "none",
  minHeight: "50%"
};

class MoneyReceipt extends Component {
  // Dialog
  closeEditDueModel = () => {
    this.setState({ showEditDueModel: false });
    this.setState({ dueDepositAmount: "" });
    this.setState({ newDewFromNow: "" });
  };
  showEditDueModel = () => {
    this.setState({ showEditDueModel: true });
  };
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

  handleDueSearch = event => {
    const dueSearchText = event.target.value;
    this.props.setDueTextFilter(dueSearchText);
  };
  handleDueDepositAmountChange = event => {
    const amount = event.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ dueDepositAmount: amount }));
      let currentDue = parseFloat(this.state.currentlySelectedDue).toFixed(2);
      let depositAmount = parseFloat(amount).toFixed(2);
      let newDewFromNow = parseFloat(currentDue - depositAmount).toFixed(2);
      if (parseFloat(currentDue) < parseFloat(depositAmount)) {
        this.setState({ newDewFromNow: `Wrong Amount [MAX: ${currentDue}]` });
      } else {
        this.setState({ newDewFromNow });
      }
    }
  };

  handleDelete = () => {
    this.closeEditDueModel();
    this.props.startRemovePrevDue(this.state.dueIdToRemove);
    this.showSnackBar("Due Deleted Successfully !");
  };

  handleUpdate = () => {
    let currentDue = parseFloat(this.state.currentlySelectedDue).toFixed(2);
    let depositAmount = parseFloat(this.state.dueDepositAmount).toFixed(2);
    if (parseFloat(currentDue) < parseFloat(depositAmount)) {
      this.showSnackBar("Error! Deposit can't be Bigger than Due.");
    } else {
      this.closeEditDueModel();
      this.props.startUpdatePrevDue(
        this.state.dueIdToRemove,
        this.state.dueNumberToUpdate,
        this.state.newDewFromNow
      );
      this.showSnackBar("Due Updated Successfully !");
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      showEditDueModel: false,
      dueSearchText: "",
      snackBar: false,
      snackBarMessage: "",
      dueDepositAmount: "",
      currentlySelectedDue: 0,
      dueIdToRemove: "",
      dueNumberToUpdate: "",
      newDewFromNow: ""
    };
  }

  render() {
    const DefaultActionsOfEditDueModel = [
      <FlatButton
        label="Delete"
        secondary={true}
        onClick={this.handleDelete}
      />,
      <FlatButton label="Cancel" onClick={this.closeEditDueModel} />,
      <FlatButton
        label="Update"
        primary={true}
        disabled={!this.state.dueDepositAmount ? true : false}
        onClick={this.handleUpdate}
      />
    ];
    return (
      <div className="money-receipt-main-container">
        <AppBarMain title={"Money Receipt"} />
        <div className="animated rollIn">
          <Card
            className="container"
            style={{ marginTop: 10, padding: 7, textAlign: "center" }}
          >
            <TextField
              autoFocus
              type="number"
              floatingLabelText="Search Specific Due by Number"
              value={this.props.filter}
              onChange={this.handleDueSearch}
            />
          </Card>
        </div>
        <Card className="container" style={{ marginTop: 10, padding: 5 }}>
          <div className="list-header">
            <div>
              <strong>Number</strong>
            </div>
            <div>
              <strong>Amount</strong>
            </div>
          </div>
          {/* code gose here */}
          <div className="list-body">
            {this.props.allDue.length === 0 ? (
              <div style={{ textAlign: "center" }}>
                <span style={{ color: "red", marginTop: 10 }}>
                  <b>No Due List</b>
                </span>
              </div>
            ) : (
              this.props.allDue.map((singleDue, index) => {
                return (
                  parseFloat(singleDue.amount) > 0 && (
                    <div key={index} className="animated rollIn">
                      <Card
                        className="due-list-item"
                        onClick={() => {
                          this.setState({ showEditDueModel: true });
                          this.setState({
                            currentlySelectedDue: parseFloat(
                              singleDue.amount
                            ).toFixed(2)
                          });
                          this.setState({ dueIdToRemove: singleDue.id });
                          this.setState({
                            dueNumberToUpdate: singleDue.number
                          });
                        }}
                      >
                        <div className="list-item">
                          <div>
                            <h3 className="list-item-number">
                              {singleDue.number}
                            </h3>
                          </div>
                          <h3 className="list-item-amount">
                            {numeral(parseFloat(singleDue.amount)).format(
                              "0,0.00"
                            )}{" "}
                            &#x9f3;
                          </h3>
                        </div>
                      </Card>
                    </div>
                  )
                );
              })
            )}
          </div>
        </Card>
        <Dialog
          title="Update/Remove Due"
          actions={DefaultActionsOfEditDueModel}
          modal={true}
          open={this.state.showEditDueModel}
          autoScrollBodyContent={true}
          repositionOnUpdate={false}
          autoDetectWindowHeight={false}
          contentStyle={customDialogContentStyle}
        >
          <div>
            <h5 style={{ color: "orange" }}>
              Previous Due:{" "}
              <strong>
                {numeral(parseFloat(this.state.currentlySelectedDue)).format(
                  "0,0.00"
                )}
              </strong>
            </h5>
            {this.state.newDewFromNow && this.state.newDewFromNow !== "NaN" ? (
              <h5 style={{ color: "red" }}>
                From Now:{" "}
                <strong>
                  {numeral(parseFloat(this.state.newDewFromNow)).format(
                    "0,0.00"
                  )}
                </strong>
              </h5>
            ) : (
              <div />
            )}
            <TextField
              onChange={this.handleDueDepositAmountChange}
              value={this.state.dueDepositAmount}
              type="number"
              hintText="Deposit Amount"
              floatingLabelText="Deposit Amount Here"
            />
          </div>
        </Dialog>
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

const mapStateToProps = state => {
  return {
    allDue: dueFilter(state.due, state.dueFilter)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDueTextFilter: text => {
      dispatch(setDueTextFilter(text));
    },
    startRemovePrevDue: id => {
      dispatch(startRemovePrevDue(id));
    },
    startUpdatePrevDue: (id, number, amount) => {
      dispatch(startUpdatePrevDue(id, number, amount));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoneyReceipt);
