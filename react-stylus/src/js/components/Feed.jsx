import React from 'react';
import Post from './Post.jsx';

import { connect } from 'react-redux';
import { getData } from '../actions/index';

export class Feed extends React.Component {
  componentDidMount() {
    this.props.getData();
  }

  getFilteredNews(filters, allByPriority) {
    let filteredArticles = [];
    filters.forEach((item) => {
      filteredArticles = filteredArticles.concat(allByPriority[item]);
    });
    return filteredArticles.sort((a, b) => a - b);
  }

  render() {
    let newPosts = [];
    const filteredNews = this.getFilteredNews(this.props.filteredPriorities, this.props.priorities);

    if (filteredNews.length) {
      newPosts = this.props.news.filter((item, i) => {
        return filteredNews.indexOf(i) !== -1;
      });
    }
    const posts = newPosts.map((post, index) =>
      <Post key={index} value={post} id={index} />
    );
    return (
      <div className="feed">
        {posts}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    news: state.remoteNews,
    priorities: state.priorities,
    filteredPriorities: state.filteredPriorities
  };
}

export default connect(
  mapStateToProps,
  { getData }
)(Feed);