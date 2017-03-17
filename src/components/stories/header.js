import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { specs, describe, it } from 'storybook-addon-specifications'
import expect from 'expect';
import { mount } from 'enzyme'
import Header from '../Header';
import { ENTER_KEY } from '../../constants';

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
    specs(() => describe('default view', () => {
      it('pressing enter when edited text is blank should do nothing', () => {
        const wrapper = mount(story);
        const addItem = expect.createSpy();
        wrapper.setProps({addItem});
        const input = wrapper.find('input.new-todo');
        input.node.value = '';
        expect(addItem).toNotHaveBeenCalled();
        input.simulate('keydown', {which: ENTER_KEY});
        expect(addItem).toNotHaveBeenCalled();
      });
      it('pressing enter when edited text is whitespace should clear whitespace', () => {
        const wrapper = mount(story);
        const addItem = expect.createSpy();
        wrapper.setProps({addItem});
        const input = wrapper.find('input.new-todo');
        input.node.value = '    ';
        expect(addItem).toNotHaveBeenCalled();
        input.simulate('keydown', {which: ENTER_KEY});
        expect(addItem).toNotHaveBeenCalled();
        expect(input.node.value).toBe('');
      });
      it('pressing enter when edited text is non-whitespace string should call addItem and clear input', () => {
        const wrapper = mount(story);
        const addItem = expect.createSpy();
        wrapper.setProps({addItem});
        const input = wrapper.find('input.new-todo');
        input.node.value = 'something';
        expect(addItem).toNotHaveBeenCalled();
        input.simulate('keydown', {which: ENTER_KEY});
        expect(addItem).toHaveBeenCalled();
        expect(input.node.value).toBe('');
      });
    }));
    return story;
  });
