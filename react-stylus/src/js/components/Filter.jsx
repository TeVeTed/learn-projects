import React from 'react';
import { connect } from 'react-redux';
import { filteredPriorities } from '../actions/index';

class Filter extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(source) {
    const
      checkboxes = document.getElementsByName('priority'),
      checkboxesArr = Array.from(checkboxes),
      checkboxAll = document.getElementById('checkbox0');

    if (source.target === checkboxAll) {
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = source.target.checked;
      }
    } else {
      if (checkboxesArr.every(item => item.checked)) {
        checkboxAll.checked = true;
      } else {
        checkboxAll.checked = false;
      }
    }

    const filtered = checkboxesArr.filter(item => item.checked);
    this.props.filteredPriorities(filtered.map(item => item.value));
  }

  render() {
    const
      priorArr = Object.keys(this.props.priorities),
      listItems = priorArr.map((item, i) => {
        return (
          <li key={i}>
            <input
              type="checkbox"
              name='priority'
              id={"checkbox" + item}
              value={item}
              defaultChecked />
            <label htmlFor={"checkbox" + item}>
              {item} ({this.props.priorities[item].length})
            </label>
          </li>
        );
      }),
      totalArticles = priorArr.reduce((prev, cur, i, arr) => {
        return prev + this.props.priorities[cur].length;
      }, 0);
    return (
      <div>
        <form onChange={this.handleChange}>
          <ul>
            <li>
              <input
                type="checkbox"
                id="checkbox0"
                defaultChecked />
              <label htmlFor="checkbox0">Select all ({totalArticles})</label>
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
    priorities: state.priorities,
    updateFilters: state.updateFilters
  };
}

function mapDispatchToProps(dispatch) {
  return {
    filteredPriorities: priorities => dispatch(filteredPriorities(priorities))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);