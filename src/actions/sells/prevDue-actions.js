import database from "../../secrets/firebase";
import { ADD_A_PREV_DUE, SET_DUE } from "../constants";

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
        console.log(
          "Already Have Due in the database is -->> ",
          dueInDatabase.length
        );
        console.log("Due In Firebase ", dueInDatabase);
        if (dueInDatabase.length > 0) {
          // checking due that i want... already exists that account
          let dueItemAlreadyExists = false;
          let dueItemIdThatAlreadyExists;
          dueInDatabase.forEach(singleDue => {
            if (singleDue.number === number) {
              dueItemAlreadyExists = true;
              dueItemIdThatAlreadyExists = singleDue.id;
              console.log(
                "Hey Hey i caught you[First]",
                dueItemIdThatAlreadyExists
              );
            }
          });
          // Now i know that already have or not, so...go for it
          if (dueItemAlreadyExists) {
            // Overide the value that exists
            console.log(
              "Hey Hey i caught you[second]",
              dueItemIdThatAlreadyExists
            );
            return database
              .ref(`due/${dueItemIdThatAlreadyExists}`)
              .update(due)
              .then(() => {
                console.log("[Firebase] Due Updated !");
              });
          } else {
            return database
              .ref("due")
              .push(due)
              .then(ref => {
                console.log("setting up the key/ref --> ", ref.key);
                dispatch(addPrevDue((id = ref.key), number, amount));
              });
          }
        } else {
          return database
            .ref("due")
            .push(due)
            .then(ref => {
              console.log("setting up the key/ref --> ", ref.key);
              dispatch(addPrevDue((id = ref.key), number, amount));
            });
        }
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
