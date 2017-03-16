import React from 'react';
import { ENTER_KEY } from '../constants';

const Header = ({addItem}) =>
	<header className='header'>
		<h1>todos</h1>
		<input className='new-todo'
		       autoFocus='true'
		       placeholder='What needs to be done?'
		       onKeyDown={e => {
	            const text = e.target.value.trim();
							if (text.length && e.which === ENTER_KEY) {
								addItem(text);
								e.target.value = '';
							}
		       }} />
	</header>;

export default Header;
