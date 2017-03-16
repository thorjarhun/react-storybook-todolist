import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { specs, describe, it } from 'storybook-addon-specifications'
import expect from 'expect';
import { mount, shallow } from 'enzyme'
import Header from '../Header';

const header = <Header addItem={action('addItem')} />;

storiesOf('Header', module)
	.addDecorator(story =>
		<div className="todoapp">
			<div className="todo-list">
				{story()}
			</div>
		</div>
	)
	.add('default view', () => {
		const story = header;

		return story;
	});
