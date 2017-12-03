import { REMOVE_ITEM_FROM_STOCK, ADD_ITEM_TO_STOCK } from '../constants';

// This func Expecting an object
export const addItemToStock = (data) => ({
  type: ADD_ITEM_TO_STOCK,
  data
})
// Expection just an id number
export const removeItemToStock = (id) => ({
  type: REMOVE_ITEM_FROM_STOCK,
  id
})