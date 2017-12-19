import { ADD_A_TABLE } from "../constants";

export const addTable = tableData => {
  return {
    type: ADD_A_TABLE,
    tableData
  };
};
