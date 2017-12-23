import React, { Component } from "react";
import { Card } from "material-ui/Card";

class Form extends Component {
  render() {
    return (
      <div>
        <Card style={{ marginTop: 10, padding: 10 }}>
          <textarea>Write your text</textarea>
        </Card>
      </div>
    );
  }
}

export default Form;
