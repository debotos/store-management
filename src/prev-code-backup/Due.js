import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "material-ui/Card";

import AppBarMain from "../ui-element/AppBarMain";
import "../../style/due/due.css";
// import Navigation from "../Navigation";

class Due extends Component {
  render() {
    return (
      <div>
        <AppBarMain />
        <Card style={{ padding: 7, margin: 5, textAlign: "center" }}>
          <h2>All Due in One Place</h2>
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
                    <div key={index}>
                      <Card className="due-list-item">
                        <div className="list-item">
                          <div>
                            <h3 className="list-item-number">
                              {singleDue.number}
                            </h3>
                          </div>
                          <h3 className="list-item-amount">
                            {singleDue.amount} &#x9f3;
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allDue: state.due
  };
};

export default connect(mapStateToProps, null)(Due);
