import { ADD_BANK, REMOVE_BANK } from './constants';

export const addBank = (name, account_number) => {
  return {
    type: ADD_BANK,
    data: {
      bank_name: name,
      bank_account_number: account_number,
      amount: 0
    }
  }
}

export const removeBank = (account_number) => {
  return {
    type: REMOVE_BANK,
    data: {
      bank_account_number: account_number
    }
  }
}