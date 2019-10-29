// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';

// ContextAPI
import { StoreProvider } from './js/store/index';

// App components
import App from './js/components/App';
import ArticlePage from './js/components/ArticlePage';

// Stylesheets
import './assets/styles/main.css';

ReactDOM.render(
		<StoreProvider>
			<Router>
				<App path='/'>

				</App>
			</Router>
		</StoreProvider>
);
