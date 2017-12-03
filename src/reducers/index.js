import { combineReducers } from "redux";

import { bankReducer } from "./bank/bank-reducer";
import expensesReducer from "./expenses/expenses-reducer";
import filtersReducer from "./expenses/expenses-filters-reducer";
import { sellsReducer, customerReducer } from "./sells/sells-reducer";
import { stockReducer } from './stock/stock-reducer';

const RootReducer = combineReducers({
  bank: bankReducer,
  expenses: expensesReducer,
  filters: filtersReducer,
  sells: sellsReducer,
  selling_to_customers: customerReducer,
  stock: stockReducer
});

export default RootReducer;
