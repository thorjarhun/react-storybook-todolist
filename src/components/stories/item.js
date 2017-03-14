import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { specs, describe, it } from 'storybook-addon-specifications'
import expect from 'expect';
import { mount } from 'enzyme'
import Item from '../Item';

const sampleItem = {
	id: 0,
	text: 'Sample Item',
	completed: false
};

const itemFactory = item =>
	<Item item={item}
        removeItem={action('removeItem')}
        toggleItem={action('toggleItem')}
				editItem={action('editItem')}/>;

storiesOf('Item', module)
	.addDecorator(story =>
		<div className="todoapp">
			<div className="todo-list">
				{story()}
			</div>
		</div>
	)
	.add('not completed', () => {
		const story = itemFactory(sampleItem);
		specs(() => describe('not completed', () => {
			it('onDoubleClick on label should put component in editing state', () => {
				const wrapper = mount(story);
				const input = wrapper.find('label');
				const output = wrapper.find('li');
				expect(output.hasClass('editing')).toBe(false);
				input.simulate('doubleClick');
				expect(output.hasClass('editing')).toBe(true);
			});
			it('')
		}));
		return story;
	})
	.add('completed', () => {
		const story = itemFactory({
			...sampleItem,
			completed: true
		});
		return story;
	});
	/*
	.add('editing', () =>
		<Item item={sampleItem}
		      editing={true}
		      enableEditing={action('enableEditing')}
		      edit={action('editItem')}
		      remove={action('clearItem')}
		      toggle={action('toggleItem')}/>
	);
*/
