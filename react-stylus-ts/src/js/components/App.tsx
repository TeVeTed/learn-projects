import React from 'react';
import { RouteComponentProps } from '@reach/router';

import Feed from './Feed';
import More from './More';
import Filter from './Filter';

const App = (props: RouteComponentProps) => {
	return (
		<div className="feed-sec">
			<Filter />
			<div className="block-wrapper">
				<h1 className="sec-title big-title">News feed</h1>
				<div className="block-column">
					<Feed />
					<More />
				</div>
			</div>
		</div>
	)
};

export default App;