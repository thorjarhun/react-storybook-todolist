import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { specs, describe, it } from 'storybook-addon-specifications'
import expect from 'expect';
import { mount, shallow } from 'enzyme'
import Footer from '../Footer';
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../../constants';

const footerFactory = (filter, completedExist, remaining) =>
  <Footer filter={filter}
          remaining={remaining}
          completedExist={completedExist}
          setFilter={action('setFilter')}
          clearCompleted={action('clearCompleted')}/>;

// TODO: Add tests
storiesOf('Footer', module)
  .addDecorator(story =>
    <div className="todoapp">
      <div className="todo-list">
        {story()}
      </div>
    </div>
  )
  .add('set to All, no completedExists, none remaining', () => {
    const story = footerFactory(SHOW_ALL, false, 0);

    return story;
  })
  .add('one remaining', () => {
    const story = footerFactory(SHOW_ALL, false, 1);

    return story;
  })
  .add('multiple remaining', () => {
    const story = footerFactory(SHOW_ALL, false, 2);

    return story;
  })
  .add('completedExist', () => {
    const story = footerFactory(SHOW_ALL, true, 0);

    return story;
  })
  .add('set to Active', () => {
    const story = footerFactory(SHOW_ACTIVE, false, 0);

    return story;
  })
  .add('set to Completed', () => {
    const story = footerFactory(SHOW_COMPLETED, false, 0);

    return story;
  });
