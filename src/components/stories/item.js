import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Item from '../Item';

const sampleItem = {
	id: 0,
	text: 'Sample Item',
	completed: false
};

const itemFactory = item =>
	() => <Item item={item}
	            editing={false}
	            enableEditing={action('enableEditing')}
	            edit={action('editItem')}
	            remove={action('clearItem')}
	            toggle={action('toggleItem')}/>;

storiesOf('Item', module)
	.addDecorator(story =>
		<div className="todoapp">
			<div className="todo-list">
				{story()}
			</div>
		</div>
	)
	.add('not completed', () =>
		itemFactory(sampleItem)
	)
	.add('completed', () =>
		itemFactory({
			...sampleItem,
			completed: true
		})
	)
	.add('editing', () =>
		<Item item={sampleItem}
		      editing={true}
		      enableEditing={action('enableEditing')}
		      edit={action('editItem')}
		      remove={action('clearItem')}
		      toggle={action('toggleItem')}/>
	);
