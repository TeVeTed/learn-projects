// React
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import store from './js/store/index';

// Main app component
import App from './js/components/App.jsx';

// Stylesheets
import './assets/styles/vendors/fontawesome/css/all.min.css';
import './assets/styles/main.css';

// Appear app on page
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
