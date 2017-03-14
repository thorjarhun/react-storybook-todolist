import React from 'react';
import { storiesOf, action, specs, describe, it } from './../../../.storybook/facade';
import expect from 'expect';
import { mount, shallow, render } from 'enzyme'
import { component as Main } from '../Main';

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

const itemListFactory = items =>
	<Main items={items}
			  toggleAll={action('toggleAll')}
			  itemActions={() => ({
			    toggleItem: action('toggleItem'),
			    editItem: action('editItem'),
			    clearItem: action('clearItem')
			  })}
	/>;

storiesOf('Main', module)
	.addDecorator(story =>
		<div className="todoapp">
			{story()}
		</div>
	)
	.add('none complete', () => {
		const story = itemListFactory(items);
		specs(() => describe('none completed', () => {
			it('should display three items', () => {
				expect(shallow(story).find('Item').length).toBe(3);
			});
			it('should indicate that all are not complete', () => {
				expect(mount(story).find('li.completed').length).toBe(0);
			});
			it('should have toggleAll button unchecked', () => {
				expect(shallow(story).find('.toggle-all').props().checked).toBe(false);
			});
		}));
		return story;
	})
	.add('some completed', () => {
		const story = itemListFactory(
			items.slice(0,2).concat(
				items.slice(2).map(completeItem)));
		specs(() => describe('some completed', () => {
			it('should display three items', () => {
				expect(shallow(story).find('Item').length).toBe(3);
			});
			it('should indicate that one is complete', () => {
				expect(mount(story).find('li.completed').length).toBe(1);
			});
			it('should have toggleAll button unchecked', () => {
				expect(shallow(story).find('.toggle-all').props().checked).toBe(false);
			});
		}));
		return story;
	})
	.add('all completed', () => {
		const story = itemListFactory(items.map(completeItem));
		specs(() => describe('all completed', () => {
			it('should display three items', () => {
				expect(shallow(story).find('Item').length).toBe(3);
			});
			it('should indicate that all are complete', () => {
				expect(mount(story).find('li.completed').length).toBe(3);
			});
			it('should have toggleAll button checked', () => {
				expect(shallow(story).find('.toggle-all').props().checked).toBe(true);
			});
		}));
		return story;
	});
