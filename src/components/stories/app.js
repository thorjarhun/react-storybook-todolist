import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@kadira/storybook';
import { specs, describe, it, beforeEach } from 'storybook-addon-specifications'
import expect from 'expect';
import { mount, shallow, render } from 'enzyme'
import App from '../index';
import configureStore from '../../configureStore';

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

const appFactory = initialState =>
  ((store) =>
    <Provider store={store}>
      <App />
    </Provider>
  )(configureStore(initialState));

storiesOf('App', module)
  .add('initial state', () => {
    const initialState = undefined;
    const storyFactory = () => appFactory(initialState);
    specs(() => describe('initial state', () => {
      let story;
      beforeEach(() => {
        story = storyFactory();
      });
      it('filter should be set to All', () => {
        expect(mount(story).find('a.selected').text()).toBe('All');
      });
      it('items should not exists', () => {
        expect(mount(story).find('Item').length).toBe(0);
      });
      it('should indicate that nothing is complete', () => {
        expect(mount(story).find('li.completed').length).toBe(0);
      });
      it('should have toggleAll button unchecked', () => {
        expect(mount(story).find('.toggle-all').props().checked).toBe(false);
      });
      it('setting filter to Active should set "selected" on Active link', () => {
        const wrapper = mount(story);
        const activeLink = wrapper.find('a').findWhere(node => node.text() === 'Active');
        expect(activeLink.hasClass('selected')).toBe(false);
        activeLink.simulate('click');
        expect(activeLink.hasClass('selected')).toBe(true);
      });
      it('items should not exists when settings filter to active', () => {
        const wrapper = mount(story);
        wrapper.find('a').findWhere(node => node.text() === 'Active').simulate('click');
        expect(mount(story).find('Item').length).toBe(0);
      })
    }));
    return storyFactory();
  })
  .add('none completed', () => {
    const initialState = { items };
    const storyFactory = () => appFactory(initialState);

    specs(() => describe('none completed', () => {
      let story;
      beforeEach(() => {
        story = storyFactory();
      });
      it('filter should be set to All', () => {
        expect(mount(story).find('a.selected').text()).toBe('All');
      });
      it('should display three items', () => {
        expect(mount(story).find('Item').length).toBe(3);
      });
      it('should indicate that none are complete', () => {
        expect(mount(story).find('li.completed').length).toBe(0);
      });
      it('should have toggleAll button unchecked', () => {
        expect(mount(story).find('.toggle-all').props().checked).toBe(false);
      });
      it('setting filter to Active should set "selected" on Active link', () => {
        const wrapper = mount(story);
        const activeLink = wrapper.find('a').findWhere(node => node.text() === 'Active');
        expect(activeLink.hasClass('selected')).toBe(false);
        activeLink.simulate('click');
        expect(activeLink.hasClass('selected')).toBe(true);
      });
      it('all items should still exists when settings filter to active', () => {
        const wrapper = mount(story);
        wrapper.find('a').findWhere(node => node.text() === 'Active').simulate('click');
        expect(mount(story).find('Item').length).toBe(3);
      })
    }));
    return storyFactory();
  })
  .add('some completed', () => {
    const initialState = {
      items: items.slice(0,2).concat(
               items.slice(2).map(completeItem))
    };
    const storyFactory = () => appFactory(initialState);

    specs(() => describe('some completed', () => {
      let story;
      beforeEach(() => {
        story = storyFactory();
      });
      it('filter should be set to All', () => {
        expect(mount(story).find('a.selected').text()).toBe('All');
      });
      it('should display three items', () => {
        expect(mount(story).find('Item').length).toBe(3);
      });
      it('should indicate that one is complete', () => {
        expect(mount(story).find('li.completed').length).toBe(1);
      });
      it('should have toggleAll button unchecked', () => {
        expect(mount(story).find('.toggle-all').props().checked).toBe(false);
      });
      it('setting filter to Active should set "selected" on Active link', () => {
        const wrapper = mount(story);
        const activeLink = wrapper.find('a').findWhere(node => node.text() === 'Active');
        expect(activeLink.hasClass('selected')).toBe(false);
        activeLink.simulate('click');
        expect(activeLink.hasClass('selected')).toBe(true);
      });
      it('only two items should still exists when settings filter to active', () => {
        const wrapper = mount(story);
        wrapper.find('a').findWhere(node => node.text() === 'Active').simulate('click');
        expect(mount(story).find('Item').length).toBe(2);
      });
    }));
    return storyFactory();
  })
  .add('all completed', () => {
    const initialState = {
      items: items.map(completeItem)
    };
    const storyFactory = () => appFactory(initialState);

    specs(() => describe('all completed', () => {
      let story;
      beforeEach(() => {
        story = storyFactory();
      });
      it('filter should be set to All', () => {
        expect(mount(story).find('a.selected').text()).toBe('All');
      });
      it('should display three items', () => {
        expect(mount(story).find('Item').length).toBe(3);
      });
      it('should indicate that all are complete', () => {
        expect(mount(story).find('li.completed').length).toBe(3);
      });
      it('should have toggleAll button checked', () => {
        expect(mount(story).find('.toggle-all').props().checked).toBe(true);
      });
      it('setting filter to Active should set "selected" on Active link', () => {
        const wrapper = mount(story);
        const activeLink = wrapper.find('a').findWhere(node => node.text() === 'Active');
        expect(activeLink.hasClass('selected')).toBe(false);
        activeLink.simulate('click');
        expect(activeLink.hasClass('selected')).toBe(true);
      });
      it('no items should still exists when settings filter to active', () => {
        const wrapper = mount(story);
        wrapper.find('a').findWhere(node => node.text() === 'Active').simulate('click');
        expect(mount(story).find('Item').length).toBe(0);
      });
    }));
    return storyFactory();
  });
