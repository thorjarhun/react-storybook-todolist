import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { specs, describe, it } from 'storybook-addon-specifications'
import expect from 'expect';
import { mount, shallow } from 'enzyme'
import Item from '../Item';
import { ENTER_KEY, ESCAPE_KEY } from '../../constants';

const sampleItem = {
  id: 0,
  text: 'Sample Item',
  completed: false
};

const itemFactory = item =>
  <Item item={item}
        clearItem={action('clearItem')}
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
      it('should not have className completed', () => {
        expect(shallow(story).find('li').hasClass('completed')).toBe(false);
      });
      it('onDoubleClick on label should put component in editing state', () => {
        const wrapper = mount(story);
        const input = wrapper.find('label');
        const output = wrapper.find('li');
        expect(output.hasClass('editing')).toBe(false);
        input.simulate('doubleClick');
        expect(output.hasClass('editing')).toBe(true);
      });
      it('toggling completed checkbox should call toggleItem', () => {
        const wrapper = shallow(story);
        const toggleItem = expect.createSpy();
        wrapper.setProps({toggleItem});
        const input = wrapper.find('input.toggle');
        expect(toggleItem).toNotHaveBeenCalled();
        input.simulate('change');
        expect(toggleItem).toHaveBeenCalled();
      });
      it('clicking on the destroy button should call clearItem', () => {
        const wrapper = shallow(story);
        const clearItem = expect.createSpy();
        wrapper.setProps({clearItem});
        const input = wrapper.find('button.destroy');
        expect(clearItem).toNotHaveBeenCalled();
        input.simulate('click');
        expect(clearItem).toHaveBeenCalled();
      });
      it('pressing enter when edited text is blank should call clearItem', () => {
        const wrapper = mount(story);
        const clearItem = expect.createSpy();
        wrapper.setProps({clearItem});
        const label = wrapper.find('label');
        const output = wrapper.find('li');
        label.simulate('doubleClick');
        expect(output.hasClass('editing')).toBe(true);
        const input = wrapper.find('input.edit');
        input.node.value = '';
        expect(clearItem).toNotHaveBeenCalled();
        input.simulate('keydown', { which: ENTER_KEY });
        expect(output.hasClass('editing')).toBe(false);
        expect(clearItem).toHaveBeenCalled();
      });
      it('pressing enter when edited text is whitespace should call clearItem', () => {
        const wrapper = mount(story);
        const clearItem = expect.createSpy();
        wrapper.setProps({clearItem});
        const label = wrapper.find('label');
        const output = wrapper.find('li');
        label.simulate('doubleClick');
        expect(output.hasClass('editing')).toBe(true);
        const input = wrapper.find('input.edit');
        input.node.value = '  ';
        expect(clearItem).toNotHaveBeenCalled();
        input.simulate('keydown', { which: ENTER_KEY });
        expect(output.hasClass('editing')).toBe(false);
        expect(clearItem).toHaveBeenCalled();
      });
      it('pressing enter when edited text is non-whitespace string should call editItem', () => {
        const wrapper = mount(story);
        const editItem = expect.createSpy();
        wrapper.setProps({editItem});
        const label = wrapper.find('label');
        const output = wrapper.find('li');
        label.simulate('doubleClick');
        expect(output.hasClass('editing')).toBe(true);
        const input = wrapper.find('input.edit');
        input.node.value = 'something';
        expect(editItem).toNotHaveBeenCalled();
        input.simulate('keydown', { which: ENTER_KEY });
        expect(output.hasClass('editing')).toBe(false);
        expect(editItem).toHaveBeenCalled();
      });
      it('pressing escape when editing text should exit editing state without calling any props', () => {
        const wrapper = mount(story);
        const editItem = expect.createSpy();
        const clearItem = expect.createSpy();
        wrapper.setProps({editItem, clearItem});
        const label = wrapper.find('label');
        const output = wrapper.find('li');
        label.simulate('doubleClick');
        expect(output.hasClass('editing')).toBe(true);
        const input = wrapper.find('input.edit');
        input.simulate('keydown', { which: ESCAPE_KEY });
        expect(output.hasClass('editing')).toBe(false);
        expect(editItem).toNotHaveBeenCalled();
        expect(editItem).toNotHaveBeenCalled();
      });
      // TODO: Test onBlur
    }));
    return story;
  })
  .add('completed', () => {
    const story = itemFactory({
      ...sampleItem,
      completed: true
    });
    specs(() => describe('completed', () => {
      it('should have className completed', () => {
        expect(shallow(story).find('li').hasClass('completed')).toBe(true);
      });
      it('onDoubleClick on label should put component in editing state', () => {
        const wrapper = mount(story);
        const input = wrapper.find('label');
        const output = wrapper.find('li');
        expect(output.hasClass('editing')).toBe(false);
        input.simulate('doubleClick');
        expect(output.hasClass('editing')).toBe(true);
      });
      it('toggling completed checkbox should call toggleItem', () => {
        const wrapper = shallow(story);
        const toggleItem = expect.createSpy();
        wrapper.setProps({toggleItem});
        const input = wrapper.find('input.toggle');
        expect(toggleItem).toNotHaveBeenCalled();
        input.simulate('change');
        expect(toggleItem).toHaveBeenCalled();
      });
      it('clicking on the destroy button should call clearItem', () => {
        const wrapper = shallow(story);
        const clearItem = expect.createSpy();
        wrapper.setProps({clearItem});
        const input = wrapper.find('button.destroy');
        expect(clearItem).toNotHaveBeenCalled();
        input.simulate('click');
        expect(clearItem).toHaveBeenCalled();
      });
      it('pressing enter when edited text is blank should call clearItem', () => {
        const wrapper = mount(story);
        const clearItem = expect.createSpy();
        wrapper.setProps({clearItem});
        const label = wrapper.find('label');
        const output = wrapper.find('li');
        label.simulate('doubleClick');
        expect(output.hasClass('editing')).toBe(true);
        const input = wrapper.find('input.edit');
        input.node.value = '';
        expect(clearItem).toNotHaveBeenCalled();
        input.simulate('keydown', { which: ENTER_KEY });
        expect(output.hasClass('editing')).toBe(false);
        expect(clearItem).toHaveBeenCalled();
      });
      it('pressing enter when edited text is whitespace should call clearItem', () => {
        const wrapper = mount(story);
        const clearItem = expect.createSpy();
        wrapper.setProps({clearItem});
        const label = wrapper.find('label');
        const output = wrapper.find('li');
        label.simulate('doubleClick');
        expect(output.hasClass('editing')).toBe(true);
        const input = wrapper.find('input.edit');
        input.node.value = '  ';
        expect(clearItem).toNotHaveBeenCalled();
        input.simulate('keydown', { which: ENTER_KEY });
        expect(output.hasClass('editing')).toBe(false);
        expect(clearItem).toHaveBeenCalled();
      });
      it('pressing enter when edited text is something and not whitespace should call editItem', () => {
        const wrapper = mount(story);
        const editItem = expect.createSpy();
        wrapper.setProps({editItem});
        const label = wrapper.find('label');
        const output = wrapper.find('li');
        label.simulate('doubleClick');
        expect(output.hasClass('editing')).toBe(true);
        const input = wrapper.find('input.edit');
        input.node.value = 'something';
        expect(editItem).toNotHaveBeenCalled();
        input.simulate('keydown', { which: ENTER_KEY });
        expect(output.hasClass('editing')).toBe(false);
        expect(editItem).toHaveBeenCalled();
      });
      it('pressing escape when editing text should exit editing state without calling any props', () => {
        const wrapper = mount(story);
        const editItem = expect.createSpy();
        const clearItem = expect.createSpy();
        wrapper.setProps({editItem, clearItem});
        const label = wrapper.find('label');
        const output = wrapper.find('li');
        label.simulate('doubleClick');
        expect(output.hasClass('editing')).toBe(true);
        const input = wrapper.find('input.edit');
        input.simulate('keydown', { which: ESCAPE_KEY });
        expect(output.hasClass('editing')).toBe(false);
        expect(editItem).toNotHaveBeenCalled();
        expect(editItem).toNotHaveBeenCalled();
      });
    }));
    return story;
  });
