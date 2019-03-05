import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App';

import { items } from './reducers/index';
import { StoreState } from './types/index';
import { ItemAction } from './actions/index';

import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore<StoreState, ItemAction, any, any>(items, {
  items: [],
  closed: []
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
