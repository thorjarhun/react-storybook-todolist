import React from 'react';
import { connect } from 'react-redux';
import Item from './Item';
import { FILTER_PREDICATES } from '../constants';
import { toggleAll, toggleItem, editItem, clearItem } from '../actions';

export const component = ({items, toggleAll, itemActions}) =>
	<section className="main">
		<input className="toggle-all"
		       type="checkbox"
		       checked={!!items.length && items.every(({completed}) => completed)}
		       onChange={toggleAll} />
		<ul className="todo-list">
			{
				items.map(item =>
					<Item key={item.id}
					      item={item}
						{...itemActions(item.id)}/>
				)
			}
		</ul>
	</section>;

export default connect(
	state => ({ items: state.items.filter(FILTER_PREDICATES[state.filter]) }),
	dispatch => ({
		toggleAll: () => dispatch(toggleAll()),
		itemActions: id => ({
			toggleItem: () => dispatch(toggleItem(id)),
			editItem: text => dispatch(editItem(id, text)),
			clearItem: () => dispatch(clearItem(id))
		})
	})
)(component);
