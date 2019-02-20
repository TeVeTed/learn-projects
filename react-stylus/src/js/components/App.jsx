import React from 'react';
import Feed from './Feed.jsx';
import More from './More.jsx';
import Filter from './Filter.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Feed />
        <More />
        <Filter />
      </div>
    );
  }
}

export default App;