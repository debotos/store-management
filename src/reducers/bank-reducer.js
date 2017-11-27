import { ADD_BANK, REMOVE_BANK } from '../actions/constants';

const addBankDefaultState = [];

export const bankReducer = (state = addBankDefaultState, action) => {
  switch(action.type) {
    case ADD_BANK:
      return [...state, action.data];
    case REMOVE_BANK:
      return state.filter((singleBank) => singleBank.bank_account_number !== action.data.bank_account_number)
    default:
      return state;
  }
}