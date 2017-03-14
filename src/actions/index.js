import { ACTIONS } from '../constants'

export const addItem = text => ({
	type: ACTIONS.ADD_ITEM,
	text
});

export const editItem = (id, text) => ({
	type: ACTIONS.EDIT_ITEM,
	id,
	text
});

export const toggleItem = (id) => ({
	type: ACTIONS.TOGGLE_ITEM,
	id
});

export const toggleAll = () => ({
	type: ACTIONS.TOGGLE_ALL
});

export const clearItem = id => ({
	type: ACTIONS.CLEAR_ITEM,
	id
});

export const clearCompleted = () => ({
	type: ACTIONS.CLEAR_COMPLETED
});

export const setFilter = filter => ({
	type: ACTIONS.SET_FILTER,
	filter
});
