export const ADD_ITEM = 'ADD_ITEM';
export const CLEAR_ITEM = 'CLEAR_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const TOGGLE_ITEM = 'TOGGLE_ITEM';
export const TOGGLE_ALL = 'TOGGLE_ALL';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';
export const SET_FILTER = 'SET_FILTER';
export const ACTIONS = {
  ADD_ITEM,
  TOGGLE_ITEM,
  EDIT_ITEM,
  CLEAR_ITEM,
  TOGGLE_ALL,
  CLEAR_COMPLETED,
  SET_FILTER
};

export const SHOW_ALL = 'SHOW_ALL';
export const SHOW_ACTIVE = 'SHOW_ACTIVE';
export const SHOW_COMPLETED = 'SHOW_COMPLETED';

export const FILTERS = {
  SHOW_ALL,
  SHOW_ACTIVE,
  SHOW_COMPLETED
};

export const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
};

export const FILTER_PREDICATES = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: ({completed}) => !completed,
  [SHOW_COMPLETED]: ({completed}) => completed
};

export const ENTER_KEY = 13;
export const ESCAPE_KEY = 27;
