import React from 'react';

export default ({addItem}) =>
	<header className="header">
		<h1>todos</h1>
		<input className="new-todo"
		       placeholder="What needs to be done?"
		       autoFocus
		       onKeyDown={addItem} />
	</header>;
