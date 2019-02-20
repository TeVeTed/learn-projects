import React from 'react';
import Post from './Post.jsx';
import { connect } from 'react-redux';
import { getData } from '../actions/index';

export class Feed extends React.Component {
  componentDidMount() {
    this.props.getData();
  }

  render() {
    const posts = this.props.news.map((post, index) =>
      <Post key={index} value={post} />
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
    news: state.remoteNews
  };
}

export default connect(
  mapStateToProps,
  { getData }
)(Feed);