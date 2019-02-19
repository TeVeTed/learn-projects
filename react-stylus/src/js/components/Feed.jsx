import React from 'react';
import Post from './Post.jsx';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {content: 'This is my first post!'},
        {content: 'This is my second post!'}
      ]
    }
  }

  render() {
    const posts = this.state.posts.map((post, index) =>
      <Post key={index} value={post} />
    );
    return (
      <div className="feed">
        {posts}
      </div>
    )
  }
}

export default Feed;