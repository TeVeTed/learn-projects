import React from 'react';
import { connect } from 'react-redux';

class Filter extends React.Component {
  render() {
    const
      priorArr = Object.keys(this.props.priorities),
      listItems = priorArr.map((item, i) => {
        return (
          <li key={i}>
            <input type="checkbox" id={"checkbox" + item} defaultChecked />
            <label htmlFor={"checkbox" + item}>
              {item} ({this.props.priorities[item].length})
            </label>
          </li>
        );
      }),
      totalArticles = priorArr.reduce
    return (
      <div>
        <form>
          <ul>
            <li>
              <input type="checkbox" id="checkbox0" defaultChecked />
              <label htmlFor="checkbox0">Select all</label>
            </li>
            {listItems}
          </ul>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    priorities: state.priorities
  };
}

export default connect(
  mapStateToProps
)(Filter);