import database from "../../secrets/firebase";
import { UPDATE_STORE_INFO, SET_STORE_INFO } from "../constants";

const updateStoreInfo = (id, data) => {
  return {
    type: UPDATE_STORE_INFO,
    info: {
      id,
      ...data
    }
  };
};

export const startUpdateStoreInfo = storeInfo => {
  console.log("startUpdateStoreInfo got a call");
  return dispatch => {
    let currentValue;
    let currentValueId;
    let allValue = [];
    database
      .ref("store-info")
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          currentValue = childSnapshot.val().info;
          console.log("current INFO. ", currentValue);
          currentValueId = childSnapshot.key;
          console.log("current info ID ", currentValueId);
          allValue.push(childSnapshot.val().info);
        });
      })
      .then(() => {
        let data;
        if (allValue.length > 0) {
          data = {
            info: storeInfo
          };
          return database
            .ref(`store-info/${currentValueId}`)
            .update(data)
            .then(() => {
              dispatch(updateStoreInfo(currentValueId, storeInfo));
            });
        } else {
          console.log("Calling Push for StoreInfo");
          data = {
            info: storeInfo
          };
          return database
            .ref("store-info")
            .push(data)
            .then(ref => {
              dispatch(updateStoreInfo(ref.key, storeInfo));
            });
        }
      });
  };
};

export const setStoreInfo = data => ({
  type: SET_STORE_INFO,
  data
});

export const startSetStoreInfo = () => {
  return dispatch => {
    return database
      .ref("store-info")
      .once("value")
      .then(snapshot => {
        let storeInfo = {
          id: "",
          name: "",
          number1: "",
          number2: "",
          number3: "",
          address: ""
        };

        snapshot.forEach(childSnapshot => {
          console.log("====================================");
          console.log("childSnapshot Key:", childSnapshot.key);
          console.log("childSnapshot Value:", childSnapshot.val());
          console.log("====================================");
          storeInfo = {
            id: childSnapshot.key,
            ...childSnapshot.val().info
          };
        });

        dispatch(setStoreInfo(storeInfo));
      });
  };
};
