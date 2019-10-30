import React from 'react';

import { Store } from '../store';
import { getData } from '../actions';

import Post from "./Post.jsx";

const Feed = () => {
	const { state, dispatch } = React.useContext(Store);

	React.useEffect(() => {
		!state.remoteNews.length && getData(dispatch);
	});

	const getFilteredNews = (filters, allByPriority) => {
		let filteredArticles = [];

		filters.forEach(item => filteredArticles = filteredArticles.concat(allByPriority[item]));

		return filteredArticles.sort((a, b) => a - b);
	};

	let newPosts = [];
	const filteredNews = getFilteredNews(state.filteredPriorities, state.priorities);

	if (filteredNews.length) {
		newPosts = state.remoteNews.filter((item, i) => filteredNews.indexOf(i) !== -1);
	}

	const posts = newPosts.map((post, index) =>
			<Post key={index} value={post} id={index} />
	);

	return (
		<div className='news-list'>
			{posts}
		</div>
	);
};

export default Feed;