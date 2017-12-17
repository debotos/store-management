import {
  SET_STOCK,
  REMOVE_ITEM_FROM_STOCK,
  ADD_ITEM_TO_STOCK
} from "../constants";
import database from "../../secrets/firebase";

// This func Expecting an object
export const addItemToStock = data => ({
  type: ADD_ITEM_TO_STOCK,
  data
});

export const startAddItemToStock = (data = {}) => {
  return dispatch => {
    return database
      .ref(`stock`)
      .push(data)
      .then(ref => {
        dispatch(addItemToStock({ id: ref.key, ...data }));
      });
  };
};
// Expection just an id number
export const removeItemToStock = id => ({
  type: REMOVE_ITEM_FROM_STOCK,
  id
});

export const startRemoveItemToStock = id => {
  return dispatch => {
    return database
      .ref(`stock/${id}`)
      .remove()
      .then(() => {
        dispatch(removeItemToStock(id));
      });
  };
};

// Function to get data from firebase and fill the local store
export const setStock = data => ({
  type: SET_STOCK,
  data
});

export const startSetStock = () => {
  return dispatch => {
    return database
      .ref("stock")
      .once("value")
      .then(snapshot => {
        const stock = [];
        snapshot.forEach(childSnapshot => {
          stock.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setStock(stock));
      });
  };
};
