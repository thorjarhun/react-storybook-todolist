import { ADD_ITEM, EDIT_ITEM, CLEAR_ITEM, TOGGLE_ITEM, TOGGLE_ALL, CLEAR_COMPLETED } from '../constants';

// Electing on unceremonious approach.
// Alternatively, could put some business logic here, e.g.
// - EDIT_ITEM could remove the item if text.trim() is empty

const createReducer = (initialState, handlers) => (state = initialState, action) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](state, action)
    : state;

export default createReducer([], {
  [ADD_ITEM]: (state, {text}) => state.concat({
    id: state.map(item => item.id).reduce((maxId, id) => Math.max(id, maxId), -1) + 1,
    text,
    completed: false
  }),
  [EDIT_ITEM]: (state, {id, text}) => state.map(item =>
    item.id === id
      ? {...item, text}
      : item
  ),
  [CLEAR_ITEM]: (state, {id}) => state.filter(item => item.id !== id),
  [TOGGLE_ITEM]: (state, {id}) => state.map(item =>
    item.id === id
      ? {...item, completed: !item.completed}
      : item
  ),
  [TOGGLE_ALL]: state =>
    (completed => state.map(item => ({
      ...item,
      completed
    })))
    (state.some(item => !item.completed)),
  [CLEAR_COMPLETED]: state => state.filter(item => !item.completed)
});
