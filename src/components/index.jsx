import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import { FILTER_PREDICATES } from '../constants';
import { addItem, editItem, clearItem, toggleItem, toggleAll, clearCompleted, setFilter } from '../actions';

/*
  The choices for where to keep what state in React can lead to numerous great options,
each with their own pros and cons. Normally I like to use selectors with redux and complete
the reducer -> selector -> render trinity of purity but it feels too excessive here unless I
were to add more functionality. Depending on how a team is using react-storybook, other
options may be preferable, such as keeping state closer to the leaf components. For
example, localizing 'text' in an Item to the component itself would allow it to be more
interactive in storybook without having to make a harness or mock the global store, as is
done in ./stories/body.js. There are likely other solutions as well.
  For this demo, the majority of state is kept in redux. The 'editing' in Item is component
state and the text input field states in the Header and Item components are left unmanaged.
The redux dependency can be removed by a single HoC with minimal effort with something like
recompose's withReducer, which boils down to:
```
   dispatch = action => this.setState(({ stateValue }) => ({
     stateValue: reducer(stateValue, action)
   }))
```
Not terribly surprising though given redux to Rx.js is ```action$.scan(reducer).subscribe(renderer)```.
*/

const ConnectedHeader = connect(
  null,
  dispatch => ({ addItem: text => dispatch(addItem(text))})
)(Header);

const ConnectedBody = connect(
  state => ({ items: state.items.filter(FILTER_PREDICATES[state.filter]) }),
  dispatch => ({
    toggleAll: () => dispatch(toggleAll()),
    itemActions: id => ({
      editItem: text => dispatch(editItem(id, text)),
      clearItem: () => dispatch(clearItem(id)),
      toggleItem: () => dispatch(toggleItem(id))
    })
  })
)(Body);

const ConnectedFooter = connect(
  state => ({
    completedExist: state.items.some(({completed}) => completed),
    remaining: state.items.filter(({completed}) => !completed).length,
    filter: state.filter
  }),
  dispatch => ({
    setFilter: filter => dispatch(setFilter(filter)),
    clearCompleted: () => dispatch(clearCompleted())
  })
)(Footer);

export default () =>
  <section className="todoapp">
    <ConnectedHeader/>
    <ConnectedBody/>
    <ConnectedFooter/>
  </section>;
