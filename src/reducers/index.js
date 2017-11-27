import { combineReducers } from 'redux';

import { bankReducer } from './bank-reducer';

const RootReducer = combineReducers({
  bank: bankReducer
});

export default RootReducer;