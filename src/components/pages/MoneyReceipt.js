import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "material-ui/Card";
import TextField from "material-ui/TextField";
import SnackBar from "../ui-element/SnackBar";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

import AppBarMain from "../ui-element/AppBarMain";
import "../../style/due/due.css";
import { setDueTextFilter } from '../../actions/due/due-filter-actions';
import dueFilter from './subPages/due/utility-func/due-filter';
import { startRemovePrevDue } from '../../actions/sells/prevDue-actions';
// import Navigation from "../Navigation";

class MoneyReceipt extends Component {
  // Dialog
  closeEditDueModel = () => {
    this.setState({ showEditDueModel: false });
    this.setState({ dueDepositAmount: "" });
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
  handleDueSearch = (event) => {
    const dueSearchText = event.target.value;
    this.props.setDueTextFilter(dueSearchText)
  }
  handleDueDepositAmountChange = (event) => {
    const amount = event.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ dueDepositAmount: amount }));
    }
  }
  handleDelete = () => {
    this.closeEditDueModel();
    this.props.startRemovePrevDue(this.state.dueIdToRemove);
    this.showSnackBar("Due Delete Successful !");
  };

  handleUpdate = () => {
    const data = {

    };
    this.closeEditDueModel();
    this.showSnackBar("Due Update Successful !");
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
      dueIdToRemove: ""
    }
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
      disabled={
        !this.state.dueDepositAmount
          ? true
          : false
      }
      onClick={this.handleUpdate}
    />
    ];
    return (
      <div>
        <AppBarMain />
        <Card
          style={{ padding: 7, margin: 5, textAlign: "center" }}
        >
          <TextField
            type="number"
            floatingLabelText="Search Specific Due by Number"
            value={this.props.filter}
            onChange={this.handleDueSearch}
          />
        </Card>
        <Card className="container" style={{ marginTop: 10, padding: 5 }} >
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
                      <Card key={index} className="due-list-item"
                        onClick={() => {
                          this.setState({ showEditDueModel: true })
                          this.setState({ currentlySelectedDue: parseFloat(singleDue.amount).toFixed(2) })
                          this.setState({ dueIdToRemove: singleDue.id })
                        }
                        } >
                        <div className="list-item">
                          <div>
                            <h3 className="list-item-number">
                              {singleDue.number}
                            </h3>
                          </div>
                          <h3 className="list-item-amount">
                            {parseFloat(singleDue.amount).toFixed(2)} &#x9f3;
                        </h3>
                        </div>
                      </Card>
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
        >
          <h5 style={{ color: 'red' }}>Due Have: <strong>{this.state.currentlySelectedDue}</strong></h5>
          <TextField
            onChange={this.handleDueDepositAmountChange}
            value={this.state.dueDepositAmount}
            type="number"
            hintText="Deposit Amount"
            floatingLabelText="Deposit Amount Here"
          />
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

const mapDispatchToProps = (dispatch) => {
  return {
    setDueTextFilter: (text) => {
      dispatch(setDueTextFilter(text))
    },
    startRemovePrevDue: (id) => {
      dispatch(startRemovePrevDue(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoneyReceipt);
