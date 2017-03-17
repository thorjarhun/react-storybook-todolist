import { setFilter } from '../actions';
import filterReducer from './filter';
import { SHOW_ALL } from '../constants';
import { gen } from 'testcheck';

const initialState = SHOW_ALL;

describe('filter reducer', () => {
  it('should have initial state', () => {
    expect(
      filterReducer(undefined, {})
    ).toEqual(
      initialState
    );
  });
  check.it('correctly handles setFilter', {seed: Math.floor(Math.random()*1000)}, [gen.string], value => {
    expect(filterReducer(initialState, setFilter(value))).toEqual(value);
  });
});
