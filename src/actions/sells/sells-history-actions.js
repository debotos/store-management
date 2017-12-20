import database from "../../secrets/firebase";

import {
  ADD_SELL_UNDER_CUSTOMER_HISTORY,
  SET_ADD_SELL_UNDER_CUSTOMER_HISTORY
} from "../constants";

export const addSellUnderCustomerHistory = data => {
  return {
    type: ADD_SELL_UNDER_CUSTOMER_HISTORY,
    data
  };
};

export const startAddSellUnderCustomerHistory = data => {
  return dispatch => {
    let pushData = {
      number: data.number,
      history: [data.history] // Array of objects
    };
    let historyInDatabase = [];
    // Putting all id in an array
    database
      .ref("history")
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          historyInDatabase.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
      })
      .then(() => {
        if (historyInDatabase.length > 0) {
          // Now check if already exists
          let historyItemAlreadyExists = false;
          let historyItemIdThatAlreadyExists;
          let historyItemHistoryThatAlreadyExists;

          historyInDatabase.forEach(singleHistory => {
            if (singleHistory.number === data.number) {
              historyItemAlreadyExists = true;
              historyItemIdThatAlreadyExists = singleHistory.id;
              historyItemHistoryThatAlreadyExists = singleHistory.history;
            }
          });

          if (historyItemAlreadyExists) {
            // Overide the value that exists
            const updateData = {
              history: [data.history, ...historyItemHistoryThatAlreadyExists],
              number: data.number
            };
            return database
              .ref(`history/${historyItemIdThatAlreadyExists}`)
              .update(updateData)
              .then(() => {
                const saveDataLocal = {
                  id: historyItemIdThatAlreadyExists,
                  number: data.number,
                  history: data.history
                };
                dispatch(addSellUnderCustomerHistory(saveDataLocal));
              });
          } else {
            return database
              .ref("history")
              .push(pushData)
              .then(ref => {
                const saveDataLocal = {
                  id: ref.key,
                  number: data.number,
                  history: data.history
                };
                dispatch(addSellUnderCustomerHistory(saveDataLocal));
              });
          }
        } else {
          return database
            .ref("history")
            .push(pushData)
            .then(ref => {
              const saveDataLocal = {
                id: ref.key,
                number: data.number,
                history: data.history
              };
              dispatch(addSellUnderCustomerHistory(saveDataLocal));
            });
        }
      });
  };
};

export const setAddSellUnderCustomerHistory = data => ({
  type: SET_ADD_SELL_UNDER_CUSTOMER_HISTORY,
  data
});

export const startSetAddSellUnderCustomerHistory = () => {
  return dispatch => {
    return database
      .ref("history")
      .once("value")
      .then(snapshot => {
        const history = {};

        snapshot.forEach(childSnapshot => {
          history[childSnapshot.val().number] = {
            history: childSnapshot.val().history
          };
        });

        dispatch(setAddSellUnderCustomerHistory(history));
      });
  };
};
