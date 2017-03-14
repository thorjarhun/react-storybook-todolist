import { ADD_ITEM, CLEAR_ITEM, EDIT_ITEM, TOGGLE_ITEM, TOGGLE_ALL, CLEAR_COMPLETED } from '../constants';

const replaceAtId = (xs, id, fn) => xs.map(x => x.id === id ? fn(x) : x);

export default (state = [], action) => {
	switch (action.type) {
		case ADD_ITEM:
			return state.concat({
				id: state.map(item => item.id).reduce((maxId, id) => Math.max(id, maxId), -1) + 1,
				text: action.text,
				completed: false
			});
		case CLEAR_ITEM:
			return state.filter(item => item.id !== action.id);
		case EDIT_ITEM:
			return !action.text
				? state.filter(item => item.id !== action.id)
				: replaceAtId(state, action.id, item => ({
						...item,
						text: action.text
					}));
		case TOGGLE_ITEM:
			return replaceAtId(state, action.id, item => ({
				...item,
				completed: !item.completed
			}));
		case TOGGLE_ALL:
			const completed = state.some(item => !item.completed);
			return state.map(item => ({
				...item,
				completed
			}));
		case CLEAR_COMPLETED:
			return state.filter(item => !item.completed);
		default:
			return state
	}
};
