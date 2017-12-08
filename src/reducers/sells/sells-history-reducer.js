import {
  ADD_SELL_UNDER_CUSTOMER_HISTORY
  // SET_ADD_SELL_UNDER_CUSTOMER_HISTORY
} from "../../actions/constants";

const sellsHistoryDefaultReducer = {};

export const sellsHistoryReducer = (
  state = sellsHistoryDefaultReducer,
  action
) => {
  switch (action.type) {
    case ADD_SELL_UNDER_CUSTOMER_HISTORY:
      let objectSize = Object.keys(state).length;
      if (objectSize > 0) {
        let flag = false;
        for (let number in state) {
          if (number === action.data.number) {
            console.log("Same number");
            flag = true;
          }
        }
        if (flag) {
          const number = action.data.number;
          return {
            ...state,
            [number]: {
              history: [...state[number].history, action.data.history],
              date: action.data.date
            }
          }; // concentrate! you learned a lot from here debotos
        } else {
          const newNumber = action.data.number;
          return {
            ...state,
            [newNumber]: {
              history: [action.data.history],
              date: action.data.date
            }
          };
        }
      } else {
        const newNumber = action.data.number;
        return {
          ...state,
          [newNumber]: {
            history: [action.data.history],
            date: action.data.date
          }
        };
      }
    // case SET_ADD_SELL_UNDER_CUSTOMER_HISTORY:
    //   return action.data;
    default:
      return state;
  }
};
