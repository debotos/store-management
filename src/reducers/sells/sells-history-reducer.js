import { ADD_SELL_UNDER_CUSTOMER_HISTORY } from "../../actions/constants";

const sellsHistoryDefaultReducer = {};

export const sellsHistoryReducer = (
  state = sellsHistoryDefaultReducer,
  action
) => {
  switch (action.type) {
    case ADD_SELL_UNDER_CUSTOMER_HISTORY:
      let flag = false;
      for (let number in state) {
        if (number === action.data.number) {
          console.log("Same number");
          flag = true;
        }
      }
      if (flag) {
        const name = action.data.number;
        return { ...state, [name]: [...state[name], action.data] }; // This line
      } else {
        const newNumber = action.data.number;
        return { ...state, [newNumber]: [action.data] };
      }
    default:
      return state;
  }
};
