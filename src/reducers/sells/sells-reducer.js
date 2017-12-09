import {
  ADD_A_SELL_ITEM,
  REMOVE_A_SELL_ITEM,
  REMOVE_ALL_SELL_ITEMS,
  ADD_TOTAL_TO_STORE
} from "../../actions/constants";

const sellsReducerDefaultState = {
  aluminium: [],
  glass: [],
  ss: [],
  others: [],
  date: Date().substr(0, 24)
};

export const sellsReducer = (state = sellsReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_A_SELL_ITEM:
      if (action.data.productCategoryToSell === "aluminium") {
        return {
          ...state,
          aluminium: [...state.aluminium, action.data],
          date: Date().substr(0, 24)
        };
      }
      if (action.data.productCategoryToSell === "glass") {
        return {
          ...state,
          glass: [...state.glass, action.data],
          date: Date().substr(0, 24)
        };
      }
      if (action.data.productCategoryToSell === "ss") {
        return {
          ...state,
          ss: [...state.ss, action.data],
          date: Date().substr(0, 24)
        };
      }
      if (action.data.productCategoryToSell === "others") {
        return {
          ...state,
          others: [...state.others, action.data],
          date: Date().substr(0, 24)
        };
      }
    case REMOVE_A_SELL_ITEM:
      if (action.productCategoryToSell === "aluminium") {
        return {
          ...state,
          aluminium: state.aluminium.filter(
            singleSell => singleSell.id !== action.id
          ),
          date: Date().substr(0, 24)
        };
      }
      if (action.productCategoryToSell === "glass") {
        return {
          ...state,
          glass: state.glass.filter(singleSell => singleSell.id !== action.id),
          date: Date().substr(0, 24)
        };
      }
      if (action.productCategoryToSell === "ss") {
        return {
          ...state,
          ss: state.ss.filter(singleSell => singleSell.id !== action.id),
          date: Date().substr(0, 24)
        };
      }
      if (action.productCategoryToSell === "others") {
        return {
          ...state,
          others: state.others.filter(
            singleSell => singleSell.id !== action.id
          ),
          date: Date().substr(0, 24)
        };
      }
    case REMOVE_ALL_SELL_ITEMS:
      return sellsReducerDefaultState;
    default:
      return state;
  }
};
