import {
  ADD_A_SELL_ITEM,
  REMOVE_A_SELL_ITEM,
  REMOVE_ALL_SELL_ITEMS
} from "../constants";

export const addSellItem = (data) => ({
  type: ADD_A_SELL_ITEM,
  data
})

export const removeSellItem = (id) => ({
  type: REMOVE_A_SELL_ITEM,
  id
})

export const removeAllSellsItem = () => ({
  type: REMOVE_ALL_SELL_ITEMS
})