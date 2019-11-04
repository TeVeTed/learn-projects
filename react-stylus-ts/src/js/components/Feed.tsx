import React from 'react';

import { IItemObject } from '../types';

import { getData } from '../actions';
import { Store } from '../store';

import Post from "./Post";

const Feed = () => {
	const { state, dispatch } = React.useContext(Store);

	React.useEffect(() => {
		if (!state.remoteNews.length) {
			getData(dispatch)
		}
	});

	const getFilteredNews = (filters: string[], allByPriority: object) => {
		let filteredArticles: number[] = [];

		filters.forEach(item => filteredArticles = filteredArticles.concat(allByPriority[item]));

		return filteredArticles.sort((a, b) => a - b);
	};

	let newPosts: IItemObject[] = [];
	const
		filteredNews = getFilteredNews(state.filteredPriorities, state.priorities),
		remoteNews: IItemObject[] = state.remoteNews;

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