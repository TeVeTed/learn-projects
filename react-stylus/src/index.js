import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './js/store/index';

import App from './js/components/App.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
