import { ADD_A_PREV_DUE } from "../../actions/constants";

const prevDueDefaultState = [];

export const prevDueReducer = (state = prevDueDefaultState, action) => {
  switch (action.type) {
    case ADD_A_PREV_DUE:
      if (state.length > 0) {
        let flag = false;
        state.forEach(singleItem => {
          if (singleItem.number.toString() === action.data.number.toString()) {
            flag = true;
          }
        });
        if(flag) {
          return state.map(singleItem => {
            if (singleItem.number.toString() === action.data.number.toString()) {
              return { ...action.data };
            } else {
              return singleItem;
            }
          });
        }else {
          return [...state, action.data];  
        }
      } else {
        return [...state, action.data];
      }
    default:
      return state;
  }
};
