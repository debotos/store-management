import React, { Component } from "react";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import numeral from "numeral";
import SvgIcon from "material-ui/SvgIcon";
import moment from "moment";

class ReadyCashIncomeList extends Component {
  renderAmount = singleItem => {
    return (
      <p>
        <span style={{ color: "green" }}>
          <strong>{numeral(singleItem.amount).format("0,0.00")} &#x9f3;</strong>{" "}
        </span>
        &nbsp;From{" "}
        <SvgIcon style={{ width: 12, height: 12 }}>
          <path d="M22 3H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zM8 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H2v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1zm3.85-4h1.64L21 16l-1.99 1.99c-1.31-.98-2.28-2.38-2.73-3.99-.18-.64-.28-1.31-.28-2s.1-1.36.28-2c.45-1.62 1.42-3.01 2.73-3.99L21 8l-1.51 2h-1.64c-.22.63-.35 1.3-.35 2s.13 1.37.35 2z" />
        </SvgIcon>{" "}
        <strong>{singleItem.number}</strong> Via{" "}
        <strong>{singleItem.category.toUpperCase()}</strong>
        <br />
        Memo Number:{" "}
        <span style={{ color: "blue" }}>{singleItem.memoNumber}</span> &nbsp;
        <span>Name: {singleItem.name} </span>
      </p>
    );
  };
  extractDate = data => {
    var now = moment(data).format("dddd, MMMM Do YYYY, h:mm:ss a");
    now = now.substr(30, 41);
    // console.log(now);
    return now;
  };
  renderDetails = singleItem => {
    return (
      <p>
        <strong>
          E-mail: {singleItem.mail ? singleItem.mail : "Not Provided !"}&nbsp;Time:{" "}
          <span style={{ color: "orange" }}>
            {this.extractDate(singleItem.moment)}
          </span>
          <br />
          Address: {singleItem.address}
        </strong>
      </p>
    );
  };
  renderIncomeListItem = () => {
    return this.props.income.map((singleItem, index) => {
      if (singleItem.category === "others-income") {
        return (
          <ListItem
            key={index}
            primaryText={
              <span>
                <span style={{ color: "green" }}>
                  <strong>
                    {numeral(singleItem.amount).format("0,0.00")} &#x9f3;
                  </strong>
                </span>
                &nbsp;Via{" "}
                <strong>{singleItem.category.toUpperCase()}&nbsp;</strong>Time:{" "}
                <span style={{ color: "orange" }}>
                  {this.extractDate(singleItem.moment)}
                </span>
                <br />
              </span>
            }
            secondaryText={
              <span>
                Title: <strong>{singleItem.title}</strong>
              </span>
            }
            secondaryTextLines={2}
          />
        );
      } else {
        return (
          <ListItem
            key={index}
            primaryText={this.renderAmount(singleItem)}
            secondaryText={this.renderDetails(singleItem)}
            secondaryTextLines={2}
          />
        );
      }
    });
  };
  render() {
    return (
      <div>
        <List>{this.renderIncomeListItem()}</List>
      </div>
    );
  }
}

export default ReadyCashIncomeList;
