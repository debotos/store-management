import { ADD_AN_ENTRY_TO_READY_CASH, SET_READY_CASH } from "../constants";
import database from "../../secrets/firebase";

export const addAnEntryToReadyCash = data => {
  return {
    type: ADD_AN_ENTRY_TO_READY_CASH,
    data
  };
};

export const startAddAnEntryToReadyCash = data => {
  return dispatch => {
    if (data.type === "income") {
      return database
        .ref(`ready-cash/income`)
        .push(data)
        .then(ref => {
          dispatch(addAnEntryToReadyCash({ id: ref.key, ...data }));
        });
    } else {
      return database
        .ref(`ready-cash/expenses`)
        .push(data)
        .then(ref => {
          dispatch(addAnEntryToReadyCash({ id: ref.key, ...data }));
        });
    }
  };
};

export const setReadyCash = data => ({
  type: SET_READY_CASH,
  data
});

export const startSetReadyCash = () => {
  return dispatch => {
    return database
      .ref("ready-cash")
      .once("value")
      .then(snapshot => {
        const readyCash = {};
        snapshot.forEach(childSnapshot => {
          let values = [];
          childSnapshot.forEach(singleSnapshot => {
            let key = singleSnapshot.key;
            values.push({ id: key, ...singleSnapshot.val() });
          });
          readyCash[childSnapshot.key] = values;
        });
        console.log(readyCash);
        dispatch(setReadyCash(readyCash));
      });
  };
};
