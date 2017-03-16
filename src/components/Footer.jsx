import React from 'react';
import classnames from 'classnames';
import { FILTER_TITLES } from '../constants';

const TodoCount = remaining =>
	<span className="todo-count">
    <strong>{remaining || 'No'}</strong> {remaining === 1 ? 'item' : 'items'} left
  </span>;

const Footer = ({filter, remaining, completedExist, setFilter, clearCompleted}) =>
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

export default Footer;
