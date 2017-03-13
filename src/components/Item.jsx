import React from 'react';
import classnames from 'classnames';

export default ({item, editing, toggle, enableEditing, edit, remove}) =>
	<li className={classnames({
		completed: item.completed,
		editing
	})}>
		<div className="view">
			<input className="toggle"
			       type="checkbox"
			       checked={item.completed}
			       onChange={toggle}/>
			<label onDoubleClick={enableEditing}>{item.text}</label>
			<button className="destroy"
							onClick={remove}/>
		</div>
		<input className="edit"
		       defaultValue="Create a TodoMVC template" />
	</li>;
