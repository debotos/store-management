import { ADD_SELL_UNDER_CUSTOMER_HISTORY } from '../constants';

export const addSellUnderCustomerHistory = (data) => {
  return {
    type: ADD_SELL_UNDER_CUSTOMER_HISTORY,
    data
  }
}