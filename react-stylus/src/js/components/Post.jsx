import React from 'react';
import { connect } from 'react-redux';
import { getData } from '../actions/index';

class Post extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getData();
  }

  render() {
    return (
      <div className="post">
        <span className="content">{this.props.value.content}</span>
      </div>
    )
  }
}

export default Post;