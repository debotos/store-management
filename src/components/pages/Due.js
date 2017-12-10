import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "material-ui/Card";
import TextField from "material-ui/TextField";

import AppBarMain from "../ui-element/AppBarMain";
import "../../style/due/due.css";
import { setDueTextFilter } from '../../actions/due/due-filter-actions';
import dueFilter from './subPages/due/utility-func/due-filter'
// import Navigation from "../Navigation";

class Due extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dueSearchText: ""
    }
  }
  handleDueSearch = (event) => {
    const dueSearchText = event.target.value;
    this.props.setDueTextFilter(dueSearchText)
  }
  render() {
    return (
      <div>
        <AppBarMain />
        <Card style={{ padding: 7, margin: 5, textAlign: "center" }}>
          <TextField
            type="number"
            floatingLabelText="Search Specific Due by Number"
            value={this.props.filter}
            onChange={this.handleDueSearch}
          />
        </Card>
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
                    <Card key={index} className="due-list-item">
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Due);
