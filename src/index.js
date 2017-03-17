import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components';
import configureStore from './configureStore';
import 'todomvc-app-css/index.css';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
