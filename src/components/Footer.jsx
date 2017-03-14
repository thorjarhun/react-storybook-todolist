import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { FILTER_TITLES } from '../constants';
import { setFilter, clearCompleted } from '../actions';

const TodoCount = remaining =>
	<span className="todo-count">
    <strong>{remaining || 'No'}</strong> {remaining === 1 ? 'item' : 'items'} left
  </span>;

export const component = ({filter, remaining, completedExist, setFilter, clearCompleted}) =>
	<footer className="footer">
		{TodoCount(remaining)}
		<ul className="filters">
			{
				Object.keys(FILTER_TITLES).map($filter =>
					<li key={$filter}>
						<a className={classnames({ selected: $filter === filter })}
						   style={{cursor: 'pointer'}}
						   onClick={() => setFilter($filter)}>
							{FILTER_TITLES[$filter]}
						</a>
					</li>
				)
			}
		</ul>
		{
			completedExist &&
			<button className="clear-completed"
			        onClick={clearCompleted}>
				Clear completed
			</button>
		}
	</footer>;

export default connect(
	state => ({
		completedExist: state.items.some(({completed}) => completed),
		remaining: state.items.filter(({completed}) => !completed).length,
		filter: state.filter
	}),
	dispatch => ({
		setFilter: filter => dispatch(setFilter(filter)),
		clearCompleted: () => dispatch(clearCompleted())
	})
)(component);
