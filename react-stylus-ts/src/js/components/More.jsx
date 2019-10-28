import React from 'react';
import { connect } from 'react-redux';

import { addNews } from '../actions/index';

function mapDispatchToProps(dispatch) {
	return {
		addNews: articles => dispatch(addNews(articles))
	};
}

class MoreNews extends React.Component {
	handleClick = () => {
		this.props.addNews();
	}

	render() {
		return (<button onClick={this.handleClick} className='button more-btn'>Load more news</button>);
	}
}

const More = connect(null, mapDispatchToProps)(MoreNews);

export default More;
