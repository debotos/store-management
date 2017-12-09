import { SET_DUE_TEXT_FILTER } from '../constants';

export const setDueTextFilter = (text = '') => ({
  type: SET_DUE_TEXT_FILTER,
  text
})