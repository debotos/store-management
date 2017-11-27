import React, { Component } from "react";
import { Card, CardActions, CardHeader } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

import RemoveBankImage from "../../../../../src/assets/images/bankRemove.jpg";
import "../../../../style/Bank/bank.css";

class RemoveBank extends Component {
  render() {
    return (
      <Card className="bank-remove-card">
        <CardHeader
          title="Remove a Bank"
          subtitle="select a bank to remove"
          avatar={RemoveBankImage}
        />

        <CardActions>
          <FlatButton label="Remove Bank" primary={true} />
        </CardActions>
      </Card>
    );
  }
}

export default RemoveBank;
