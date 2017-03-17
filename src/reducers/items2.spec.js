import { gen } from 'testcheck';
import { uniqBy, prop, propEq } from 'ramda';
import itemsReducer from './items';
import { addItem, editItem, clearItem, toggleItem, toggleAll, clearCompleted } from '../actions';

const propId = prop('id');
const uniqueById = uniqBy(propId);
const idEq = propEq('id');

// TODO: Refactor these
const addItemTest = text => ({
  action: addItem(text),
  predicate: (state, nextState) =>
    nextState.length === state.length + 1 &&
      nextState.some(propEq('text', text))
});
const clearItemTest = id => ({
  action: clearItem(id),
  predicate: (state, nextState) => !nextState.some(idEq(id))
});
const editItemTest = ({id, text}) => ({
  action: editItem(id, text),
  predicate: (state, nextState) =>
    !state.some(idEq(id)) ||
      nextState.find(idEq(id)).text === text
});
const toggleItemTest = id => ({
  action: toggleItem(id),
  predicate: (state, nextState) =>
    !state.some(idEq(id)) ||
      state.find(idEq(id)).completed === !nextState.find(idEq(id)).completed
});
const toggleAllTest = ({
  action: toggleAll(),
  predicate: (state, nextState) =>
    state.some(item => !item.completed)
      ? nextState.every(propEq('completed', true))
      : nextState.every(propEq('completed', false))
});
const clearCompletedTest = ({
  action: clearCompleted(),
  predicate: (state, nextState) =>
    !nextState.some(item => item.completed)
});

const initialStateGenerator = gen.notEmpty(
  gen.array(
    gen.object({
      id: gen.posInt,
      text: gen.notEmpty(gen.string),
      completed: gen.boolean
    })
  )
);

const dataDefinitionGenerator = gen.bind(initialStateGenerator, state => {
  const deduppedState = uniqueById(state);
  const idGenerator = gen.posInt; // gen.oneOf(deduppedState.map(propId).map(gen.return)); // uncomment to allow only existing ids
  return gen.object({
    state: gen.return(deduppedState),
    test: gen.oneOf([
      gen.map(addItemTest, gen.string),
      gen.map(clearItemTest, idGenerator),
      gen.map(editItemTest, gen.object({
        id: idGenerator,
        text: gen.string
      })),
      gen.map(toggleItemTest, idGenerator),
      gen.return(toggleAllTest),
      gen.return(clearCompletedTest)
    ])
  });
});
//console.log(JSON.stringify(sample(dataDefinitionGenerator), null, 2));

describe('items reducers', () => {
  check.it('correctly handles actions', {times: 50, seed: Math.floor(Math.random()*1000)}, [dataDefinitionGenerator], ({state, test}) => {
    expect(test.predicate(state, itemsReducer(state, test.action))).toBe(true);
  });
});
