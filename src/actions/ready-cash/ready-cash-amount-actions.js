import database from "../../secrets/firebase";
import { UPDATE_READY_CASH_AMOUNT, SET_READY_CASH_AMOUNT } from "../constants";

export const updateReadyCash = (id, amount) => {
  return {
    type: UPDATE_READY_CASH_AMOUNT,
    data: {
      id,
      amount
    }
  };
};

export const startUpdateReadyCash = amount => {
  return dispatch => {
    let currentValue;
    let currentValueId;
    let allValue = [];
    database
      .ref("ready-cash-amount")
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          currentValue = childSnapshot.val().amount;
          console.log("current Ready Cash Amount ", currentValue);
          currentValueId = childSnapshot.key;
          console.log("current Ready Cash Amount ID ", currentValueId);
          allValue.push(childSnapshot.val());
        });
      })
      .then(() => {
        let data;
        if (allValue.length > 0) {
          console.log("got amount", amount);
          let value = (parseFloat(currentValue) + parseFloat(amount)).toFixed(
            2
          );
          data = {
            amount: value
          };
          return database
            .ref(`ready-cash-amount/${currentValueId}`)
            .update(data)
            .then(() => {
              dispatch(updateReadyCash(currentValueId, value));
            });
        } else {
          data = {
            amount: parseFloat(amount).toFixed(2)
          };
          return database
            .ref("ready-cash-amount")
            .push(data)
            .then(ref => {
              dispatch(updateReadyCash(ref.key, data.amount));
            });
        }
      });
  };
};

export const setReadyCashAmount = data => ({
  type: SET_READY_CASH_AMOUNT,
  data
});

export const startSetReadyCashAmount = () => {
  return dispatch => {
    return database
      .ref("ready-cash-amount")
      .once("value")
      .then(snapshot => {
        let readyCashAmoumt = { id: "", amount: 0 };

        snapshot.forEach(childSnapshot => {
          readyCashAmoumt = {
            id: childSnapshot.key,
            ...childSnapshot.val()
          };
        });
        console.log(readyCashAmoumt);
        dispatch(setReadyCashAmount(readyCashAmoumt));
      });
  };
};
