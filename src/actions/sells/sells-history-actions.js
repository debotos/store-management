import database from "../../secrets/firebase";

import {
  ADD_SELL_UNDER_CUSTOMER_HISTORY,
  // SET_ADD_SELL_UNDER_CUSTOMER_HISTORY
} from "../constants";

export const addSellUnderCustomerHistory = data => {
  return {
    type: ADD_SELL_UNDER_CUSTOMER_HISTORY,
    data
  };
};

// export const startAddSellUnderCustomerHistory = data => {
//   return dispatch => {
//     let pushData = {
//       history: [data.history],
//       prevDue: data.prevDue
//     }
//     return database
//       .ref(`history/${data.number}`)
//       .push(pushData)
//       .then(ref => {
//         dispatch(addSellUnderCustomerHistory(data));
//       });
//   };
// };

// export const setAddSellUnderCustomerHistory = data => {
//   return {
//     type: SET_ADD_SELL_UNDER_CUSTOMER_HISTORY,
//     data
//   };
// };

// export const startSetAddSellUnderCustomerHistory = () => {
//   return dispatch => {
//     return database
//       .ref(`history`)
//       .once("value")
//       .then(snapshot => {
//         const history = {};
//         snapshot.forEach(function(userSnapshot) {
//           var data = userSnapshot.val();
//           console.log(data);
//         });
//         // for(let item in snapshot) {
//         // history[item] = snapshot[item].val();
//         //   console.log(item+" and "+ snapshot[item])
//         // }
//         dispatch(setAddSellUnderCustomerHistory(history));
//       });
//   };
// };
