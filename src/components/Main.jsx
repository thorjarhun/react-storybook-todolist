import React from 'react';
import Item from './Item';

export default ({items, toggleItems}) =>
	<section className="main">
		<input className="toggle-all"
		       type="checkbox"
		       onChange={toggleItems}/>
		<label htmlFor="toggle-all">Mark all as complete</label>
		<ul className="todo-list">
			{
				items.map(item =>
					<Item key={item.id} item={item}/>
				)
			}
		</ul>
	</section>;
