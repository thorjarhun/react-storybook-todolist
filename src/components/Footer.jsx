import React from 'react';
import classnames from 'classnames';
import { FILTER_TITLES } from '../constants';

export default ({filter, setFilter, completed, clearCompleted, remaining}) =>
	<footer className="footer">
		<span className="todo-count"><strong>{remaining}</strong> item left</span>
		<ul className="filters">
			{
				Object.keys(FILTER_TITLES).map($filter =>
					<li key={$filter}>
						<a className={classnames({ selected: $filter === filter })}
						   onClick={() => setFilter($filter)}>
							{FILTER_TITLES[$filter]}
						</a>
					</li>
				)
			}
		</ul>
		<button className="clear-completed"
						onClick={clearCompleted}>
			Clear completed
		</button>
	</footer>;
