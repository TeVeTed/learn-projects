import React from 'react';

class Post extends React.Component {
  render() {
    return (
      <div className="post">
        <span className="content">{this.props.value.title}</span>
        <p><a href={this.props.value.url} target='_blanc'>More details...</a></p>
        <label>Priority: {this.props.value.priority}</label>
      </div>
    )
  }
}

export default Post;