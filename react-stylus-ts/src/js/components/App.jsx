import React from 'react';

import Feed from './Feed.jsx';
import More from './More.jsx';
import Filter from './Filter.jsx';

const App = () => {
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