// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';

// ContextAPI
import { StoreProvider } from './Store';

// App components
import App from './App';
import HomePage from './HomePage';
import FavPage from "./FavPage";

// Stylesheets
import './index.css';

ReactDOM.render(
  <StoreProvider>
    <Router>
      <App path='/'>
        <HomePage path='/' />
        <FavPage path='/faves' />
      </App>
    </Router>
  </StoreProvider>,
  document.getElementById('root')
);
