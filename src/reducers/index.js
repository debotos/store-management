import { combineReducers } from 'redux';

import { bankReducer } from './bank-reducer';
import expensesReducer from './expenses/expenses-reducer';
import filtersReducer from './expenses/expenses-filters-reducer'

const RootReducer = combineReducers({
  bank: bankReducer,
  expenses: expensesReducer,
  filters: filtersReducer
});

export default RootReducer;