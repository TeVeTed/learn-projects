import React from 'react';

import { addNews } from '../actions';
import { Store } from '../store';

const More = () => {
	const { dispatch } = React.useContext(Store);

	const handleClick = () => addNews(dispatch);

	return (
			<button
					onClick={() => handleClick()}
					className='button more-btn'
			>
				Load more news
			</button>
	);
};

export default More;