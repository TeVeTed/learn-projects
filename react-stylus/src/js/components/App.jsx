import React from 'react';
import Feed from './Feed.jsx';
import More from './More.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Feed />
        <More />
      </div>
    );
  }
}

export default App;