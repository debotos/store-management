import {
  ADD_A_SELL_ITEM,
  REMOVE_A_SELL_ITEM,
  REMOVE_ALL_SELL_ITEMS
} from "../../actions/constants";

const sellsReducerDefaultState = [];

export const sellsReducer = (state = sellsReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_A_SELL_ITEM:
      return [...state, action.data];
    case REMOVE_A_SELL_ITEM:
      return state.filter(singleSell => singleSell.id !== action.id);
    case REMOVE_ALL_SELL_ITEMS:
      return sellsReducerDefaultState;
    default:
      return state;
  }
};
