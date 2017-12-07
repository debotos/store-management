import React, { Component } from "react";
import { Card, CardActions } from "material-ui/Card";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import isEmail from "validator/lib/isEmail";
import { connect } from "react-redux";

import GENERATE_PDF from "./PDF";
import { addSellUnderCustomerHistory } from '../../../../actions/sells/sells-history-actions'

class CustomerDetailsForm extends Component {
  handleReset = () => {
    this.setState({ name: "" });
    this.setState({ number: "" });
    this.setState({ mail: "" });
    this.setState({ deposit: "" });
    this.setState({ address: "" });
  };
  handleName = event => {
    const name = event.target.value;
    this.setState({ name });
  };
  handleMail = event => {
    const mail = event.target.value;
    this.setState({ mail });
  };
  handleAddress = event => {
    const address = event.target.value;
    this.setState({ address });
  };
  calculateAllTotal = () => {
    let Total = 0;
    this.props.sellsTables.total.forEach(singleTotal => {
      Total += parseFloat(singleTotal);
    });
  }
  handleDeposit = (event) => {
    const deposit  = event.target.value;
    this.setState({deposit});
  }
  setPrevDue = () => {
    const due = (parseFloat(this.props.allTotal) - parseFloat(this.state.deposit)).toFixed(2);
    return due;
  }
  customerAlreadyExists = (number) => {
    const searchingFor = number;
    const sellsHistory = this.props.sellsHistory;
    let prevDue = 0;
    let have = false;
    for (let number in sellsHistory) {
      if(number === searchingFor) {
        prevDue = sellsHistory[number].prevDue;
        console.log('From customerAlreadyExists() ', prevDue)
        have = true;
      }
    }
    return [have, prevDue]
  }
  funcForUtility = () => {
    let number = this.state.number;
    if(this.customerAlreadyExists(number)[0]) {
      let total = parseFloat(this.props.allTotal);
      console.log('Total All ', total)
      let prevDue = parseFloat(this.customerAlreadyExists()[1])
      console.log('Due Previous ',this.customerAlreadyExists()[1])
      let allTotalWithDue = total + prevDue;
      console.log('Total with prev due ', allTotalWithDue)
      this.setState({allTotalWithDue})
      this.setState({alreadyUser: true})
    }
  }
  handleNumber = event => {
    const number = event.target.value;
    if (!number || number.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ number });
      if(this.customerAlreadyExists(number)[0]) {
        let total = parseFloat(this.props.allTotal);
        console.log('Total All ', total)
        let prevDue = parseFloat(this.customerAlreadyExists()[1])
        console.log('Due Previous ',prevDue)
        let allTotalWithDue = total + prevDue;
        console.log('Total with prev due ', allTotalWithDue)
        this.setState({allTotalWithDue})
        this.setState({alreadyUser: true})
      }
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      number: "",
      mail: "",
      address: "",
      deposit: 0,
      prevDue: 0,
      allTotalWithDue: 0,
      alreadyUser: false
    };
  }

  collectAllData = () => ({
    number: this.state.number,
    history: {
      customer: {
        name: this.state.name,
        number: this.state.number,
        mail: this.state.mail,
        address: this.state.address
      },
      sellingItems: this.props.sellsTables,
      allTotal: this.props.allTotal
    },
    prevDue: this.setPrevDue()
  });

  handleSaveAndGeneratePDF = () => {
    this.funcForUtility();
    const data = this.collectAllData();
    this.props.addSellUnderCustomerHistory(data);
    if (this.state.mail) {
      if (isEmail(this.state.mail)) {
        // GENERATE_PDF(data);
      } else {
        this.props.showSnackBar("Error ! Invalid Email !");
      }
    } else {

      // GENERATE_PDF(data);
    }
  };
  render() {
    return (
      <div className="container" style={{ marginTop: 15, marginBotton: 15 }}>
        <Card className="container" style={{ margin: 5, padding: 30 }}>
          <h4>
            <b>Input Customer Details</b>
          </h4>
          {
            this.state.alreadyUser ?
            <p>User exists. Due = {this.state.allTotalWithDue}</p>: <p>Not Existing</p>
          }
          {/* All Fields */}
          <div>
            <div className="col-sm-6">
              <TextField
                value={this.state.name}
                onChange={this.handleName}
                hintText="Name here"
                floatingLabelText="Place the Customer Name "
              />
              <br />
              <TextField
                type="number"
                value={this.state.number}
                onChange={this.handleNumber}
                hintText="Phone Number"
                floatingLabelText="Phone (Unique) "
              />
              <TextField
                type="number"
                value={this.state.deposit}
                onChange={this.handleDeposit}
                hintText="Deposit"
                floatingLabelText="Deposit Amount"
              />
            </div>
            <div className="col-sm-6">
              <TextField
                type="mail"
                value={this.state.mail}
                onChange={this.handleMail}
                hintText="E-mail Address"
                floatingLabelText="Email Address Here"
              />
              <br />
              <TextField
                value={this.state.address}
                onChange={this.handleAddress}
                hintText="Address here"
                floatingLabelText="Place the Address "
              />
            </div>
          </div>
          <CardActions style={{ float: "right" }}>
            <FlatButton
              disabled={
                this.state.name ||
                this.state.number ||
                this.state.mail ||
                this.state.address
                  ? false
                  : true
              }
              secondary={true}
              label="Reset"
              onClick={this.handleReset}
            />
            <FlatButton
              disabled={
                this.state.name &&
                this.state.number &&
                this.state.address 
                  ? false
                  : true
              }
              primary={true}
              label="GET PDF"
              onClick={this.handleSaveAndGeneratePDF}
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSellUnderCustomerHistory: (data) => {
      dispatch(addSellUnderCustomerHistory(data));
    }
  };
};

const mapStateToProps = state => {
  return {
    sellsTables: state.sells,
    sellsHistory: state.sellsHistory
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailsForm);
