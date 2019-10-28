// React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './js/store/index';

// Main app component
import App from './js/components/App.jsx';
import ArticlePage from './js/components/ArticlePage.jsx';

// Stylesheets
import './assets/styles/vendors/fontawesome/css/all.min.css';
import './assets/styles/main.css';

// Appear app on page
ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/article/:index" component={ArticlePage} />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById('root')
);
