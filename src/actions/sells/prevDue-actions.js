import database from "../../secrets/firebase";
import {
  ADD_A_PREV_DUE,
  SET_DUE,
  UPDATE_A_PREV_DUE,
  REMOVE_A_PREV_DUE
} from "../constants";

export const addPrevDue = (id, number, amount) => {
  return {
    type: ADD_A_PREV_DUE,
    data: {
      id,
      number,
      amount
    }
  };
};

// Server Side Code for adding a due [Firebase :)]
export const startAddPrevDue = (number, amount, id = "") => {
  return dispatch => {
    const due = { number, amount };
    let dueInDatabase = [];
    // Putting all id in an array
    database
      .ref("due")
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          dueInDatabase.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
      })
      .then(() => {
        // checking if any due exists
        if (dueInDatabase.length > 0) {
          // checking due that i want... already exists that account
          let dueItemAlreadyExists = false;
          let dueItemIdThatAlreadyExists;
          dueInDatabase.forEach(singleDue => {
            if (singleDue.number === number) {
              dueItemAlreadyExists = true;
              dueItemIdThatAlreadyExists = singleDue.id;
            }
          });
          // Now i know that already have or not, so...go for it
          if (dueItemAlreadyExists) {
            // Overide the value that exists
            return database
              .ref(`due/${dueItemIdThatAlreadyExists}`)
              .update(due)
              .then(() => {
                dispatch(
                  addPrevDue((id = dueItemIdThatAlreadyExists), number, amount)
                );
              });
          } else {
            return database
              .ref("due")
              .push(due)
              .then(ref => {
                dispatch(addPrevDue((id = ref.key), number, amount));
              });
          }
        } else {
          return database
            .ref("due")
            .push(due)
            .then(ref => {
              dispatch(addPrevDue((id = ref.key), number, amount));
            });
        }
      });
  };
};

// Update Due
const updatePrevDue = (id, number, amount) => {
  return {
    type: UPDATE_A_PREV_DUE,
    id,
    amount,
    number,
    data: {
      id,
      amount,
      number
    }
  };
};

export const startUpdatePrevDue = (id, number, amount) => {
  return dispatch => {
    const dueUpdates = {
      number,
      amount
    };
    return database
      .ref(`due/${id}`)
      .update(dueUpdates)
      .then(() => {
        dispatch(updatePrevDue(id, number, amount));
      });
  };
};

// Delete a Due completly
const removePrevDue = id => {
  return {
    type: REMOVE_A_PREV_DUE,
    id
  };
};

export const startRemovePrevDue = id => {
  return dispatch => {
    return database
      .ref(`due/${id}`)
      .remove()
      .then(() => {
        dispatch(removePrevDue(id));
      });
  };
};

export const setDue = data => ({
  type: SET_DUE,
  data
});

export const startSetExistingDueFromServer = () => {
  return dispatch => {
    return database
      .ref("due")
      .once("value")
      .then(snapshot => {
        const due = [];

        snapshot.forEach(childSnapshot => {
          due.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });

        dispatch(setDue(due));
      });
  };
};
