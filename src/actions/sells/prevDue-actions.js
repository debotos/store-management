import { ADD_A_PREV_DUE } from "../constants";

export const addPrevDue = (number, amount) => {
  return {
    type: ADD_A_PREV_DUE,
    data: {
      number,
      amount
    }
  };
};
