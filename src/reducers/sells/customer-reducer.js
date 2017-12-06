import { ADD_A_CUSTOMER, REMOVE_CUSTOMERS } from "../../actions/constants";

const sellsReducerDefaultCustomers = [];

export const customerReducer = (
  state = sellsReducerDefaultCustomers,
  action
) => {
  switch (action.type) {
    case ADD_A_CUSTOMER:
      return [...state, action.data];
    case REMOVE_CUSTOMERS:
      return sellsReducerDefaultCustomers;
    default:
      return state;
  }
};
