import { SHOW_ALL, SET_FILTER } from '../constants';

export default (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    default:
      return state;
  }
}
