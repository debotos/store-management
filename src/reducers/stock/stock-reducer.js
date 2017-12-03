import {
  REMOVE_ITEM_FROM_STOCK,
  ADD_ITEM_TO_STOCK,
  SET_STOCK
} from "../../actions/constants";

const stockReducerDefaultState = [];

export const stockReducer = (state = stockReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_STOCK:
      return [...state, action.data];
    case REMOVE_ITEM_FROM_STOCK:
      return state.filter(singleItem => singleItem.id !== action.id);
    case SET_STOCK:
      return action.data;
    default:
      return state;
  }
};
