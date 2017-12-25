import { combineReducers } from "redux";

import { bankReducer } from "./bank/bank-reducer";
import expensesReducer from "./expenses/expenses-reducer";
import filtersReducer from "./expenses/expenses-filters-reducer";
import { sellsReducer } from "./sells/sells-reducer";
import { stockReducer } from "./stock/stock-reducer";
import { sellsHistoryReducer } from "./sells/sells-history-reducer";
import { prevDueReducer } from "./sells/prevDue-reducer";
import dueFilterReducer from "./due/due-filter-reducer";
import memoNoReducer from "./sells/memo-no-reducer";
import { tableReducer } from "./sells/table-reducers";
import { readyCashReducer } from "./ready-cash/ready-cash-reducers";

const RootReducer = combineReducers({
  bank: bankReducer,
  expenses: expensesReducer,
  filters: filtersReducer,
  sells: sellsReducer,
  stock: stockReducer,
  sellsHistory: sellsHistoryReducer,
  due: prevDueReducer,
  dueFilter: dueFilterReducer,
  memoNumber: memoNoReducer,
  sellsTable: tableReducer,
  readyCash: readyCashReducer
});

export default RootReducer;
