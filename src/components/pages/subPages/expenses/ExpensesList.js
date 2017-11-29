import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "./utility-func/expenses";

export const ExpenseList = props => (
  <div className="content-container">
    <div className="list-body">
      {props.expenses.length === 0 ? (
        <div className="list-item list-item-message">
          <span>No expenses</span>
        </div>
      ) : (
        props.expenses.map(expense => {
          return <ExpenseListItem key={expense.id} {...expense} />;
        })
      )}
    </div>
  </div>
);

const mapStateToProps = state => ({
  expenses: selectExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps, null)(ExpenseList);
