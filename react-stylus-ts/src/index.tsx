// React
import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from '@reach/router';

// ContextAPI
import { StoreProvider } from './js/store';

// App components
import App from './js/components/App';
import ArticlePage from './js/components/ArticlePage';

// Stylesheets
import 'font-awesome/css/font-awesome.min.css';
import './assets/styles/main.css';

ReactDOM.render(
	<StoreProvider>
		<Router>
			<App path='/' />
			<ArticlePage path='/article/:index' />
		</Router>
	</StoreProvider>,
	document.getElementById('root') as HTMLElement
);
