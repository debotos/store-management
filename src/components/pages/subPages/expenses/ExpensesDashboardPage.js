import React from "react";
import ExpenseList from "./ExpensesList";
import ExpenseListFilters from "./ExpensesListFilters";
import ExpensesSummary from "./ExpensesSummary";
import { Card } from "material-ui/Card";

const ExpenseDashboardPage = props => (
  <div>
    <Card className="expenses-summary-card">
      <ExpensesSummary />
    </Card>

    <Card className="expenses-list-filter-card">
      <ExpenseListFilters />
    </Card>

    <Card className="expenses-list-card">
      
      <div className="list-header">
        <div><strong>Expenses</strong></div>
        <div><strong>Amount</strong></div>
      </div>
      
      
      <ExpenseList />
    </Card>
  </div>
);

export default ExpenseDashboardPage;
