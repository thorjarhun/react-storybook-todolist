import { ACTIONS } from '../constants'

// Electing on unceremonious approach.
// Alternatively, could put some business logic here, e.g.
// - editItem could return CLEAR_ITEM if text.trim() is empty

const createActionCreator = (type, ...argNames) => (...args) =>
  argNames.reduce((a,_,i) => ({ ...a, [argNames[i]]: args[i] }), { type });

export const addItem = createActionCreator(ACTIONS.ADD_ITEM, 'text');
export const editItem = createActionCreator(ACTIONS.EDIT_ITEM, 'id', 'text');
export const clearItem = createActionCreator(ACTIONS.CLEAR_ITEM, 'id');
export const toggleItem = createActionCreator(ACTIONS.TOGGLE_ITEM, 'id');
export const toggleAll = createActionCreator(ACTIONS.TOGGLE_ALL);
export const clearCompleted = createActionCreator(ACTIONS.CLEAR_COMPLETED);
export const setFilter = createActionCreator(ACTIONS.SET_FILTER, 'filter');
