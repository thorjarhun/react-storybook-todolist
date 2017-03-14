import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Main from '../Main';

const content = [
	'Item One',
	'Item Two',
	'Item Three'
];

const items = content.map((text, id) => ({
	id,
	text,
	completed: false
}));

const completeItem = todo => ({
	...todo,
	completed: true
});

const todoListFactory = items =>
	() => <Main items={items} toggleItems={action('toggleItems')}/>;

storiesOf('Main', module)
	.addDecorator(story =>
		<div className="todoapp">
			{story()}
		</div>
	)
	.add('none complete',
		todoListFactory(items))
	.add('some completed',
		todoListFactory(
			items.slice(0,2).concat(
				items.slice(2).map(completeItem))))
	.add('all completed',
		todoListFactory(items.map(completeItem)));
