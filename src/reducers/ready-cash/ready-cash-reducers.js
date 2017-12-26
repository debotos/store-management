import {
  ADD_AN_ENTRY_TO_READY_CASH,
  SET_READY_CASH,
  RESET_READY_CASH
} from "../../actions/constants";

let readyCashDefaultReducer = {
  income: [],
  expenses: []
};

export const readyCashReducer = (state = readyCashDefaultReducer, action) => {
  switch (action.type) {
    case ADD_AN_ENTRY_TO_READY_CASH:
      if (action.data.type === "income") {
        return {
          ...state,
          income: [action.data, ...state.income]
        };
      }
      if (action.data.type === "expenses") {
        return {
          ...state,
          expenses: [action.data, ...state.expenses]
        };
      }
    case RESET_READY_CASH:
      return readyCashDefaultReducer;
    case SET_READY_CASH:
      if (
        !action.data.hasOwnProperty("income") &&
        !action.data.hasOwnProperty("expenses")
      ) {
        return state;
      }
      if (
        !action.data.hasOwnProperty("income") &&
        action.data.hasOwnProperty("expenses")
      ) {
        return { income: [], expenses: action.data.expenses };
      }
      if (
        action.data.hasOwnProperty("income") &&
        !action.data.hasOwnProperty("expenses")
      ) {
        return { income: action.data.income, expenses: [] };
      }
      if (
        action.data.hasOwnProperty("income") &&
        action.data.hasOwnProperty("expenses")
      ) {
        return action.data;
      }

    default:
      return state;
  }
};
