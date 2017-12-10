import { INCREMENT_MEMO_NUMBER } from "../../actions/constants";

export default (state = 1, action) => {
  switch (action.type) {
    case INCREMENT_MEMO_NUMBER:
      return parseInt(state, 10) + 1;
    default:
      return state;
  }
};
