import React from 'react';
import Item from './Item';

const ItemList = ({items, itemActions}) =>
  <ul className="todo-list">
    {
      items.map(item =>
        <Item key={item.id}
              item={item}
          {...itemActions(item.id)}/>
      )
    }
  </ul>;

const Body = ({items, toggleAll, itemActions}) =>
  <section className="main">
    <input className="toggle-all"
           type="checkbox"
           checked={!!items.length && items.every(({completed}) => completed)}
           onChange={toggleAll} />
    <ItemList {...{items}} {...{itemActions}} />
  </section>;

export default Body;
