import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { addNews } from '../actions/index';

function mapDispatchToProps(dispatch) {
	return {
		addNews: articles => dispatch(addNews(articles))
	};
}

class MoreNews extends React.Component {
	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.addNews();
	}

	render() {
		return <Button color='danger' onClick={this.handleClick}>More!</Button>;
	}
}

const More = connect(null, mapDispatchToProps)(MoreNews);

export default More;
