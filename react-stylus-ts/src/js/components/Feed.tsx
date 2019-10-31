import React from 'react';

import { ItemObject } from '../types';

import { Store } from '../store';
import { getData } from '../actions';

import Post from "./Post";

const Feed = () => {
	const { state, dispatch } = React.useContext(Store);

	React.useEffect(() => {
		!state.remoteNews.length && getData(dispatch);
	});

	const getFilteredNews = (filters: Array<string>, allByPriority: object) => {
		let filteredArticles: Array<number> = [];

		filters.forEach(item => filteredArticles = filteredArticles.concat(allByPriority[item]));

		return filteredArticles.sort((a, b) => a - b);
	};

	let newPosts: Array<ItemObject> = [];
	const
		filteredNews = getFilteredNews(state.filteredPriorities, state.priorities),
		remoteNews: Array<ItemObject> = state.remoteNews;

	if (filteredNews.length) {
		newPosts = remoteNews.filter((item, i) => filteredNews.indexOf(i) !== -1);
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