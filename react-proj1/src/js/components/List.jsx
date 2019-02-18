import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
	return {
		articles: state.articles,
		badWord: state.badWord
	};
};

const listItem = (id, title) => (
	<li className="list-group-item" key={id}>
		{title}
	</li>
);
const ConnectedList = ({ articles, badWord }) => {
	return (
		<ul className="list-group list-group-flush">
			{articles.map((item, i, arr) => {
				if (i !== arr.length - 1) {
					return listItem(item.id, item.title);
				} else {
					if (badWord) {
						const errorItem = [
							i ? listItem(item.id, item.title) : '',
							<li className="list-group-item disabled" key='0'>
								Avoid entering forbidden words, e.g. {badWord}
							</li>
						];
						return errorItem;
					} else {
						return listItem(item.id, item.title);
					}
				}
			})}
		</ul>
	)
};

const List = connect(mapStateToProps)(ConnectedList);

export default List;
