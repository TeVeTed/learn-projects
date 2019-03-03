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
          <li key={i} className="filter-list-item">
            <label className='checkbox-container'> {item} ({this.props.priorities[item].length})
              <input
                type="checkbox"
                name='priority'
                id={"checkbox" + item}
                value={item}
                className="checkbox-hidden"
                defaultChecked
              />
              <span className="checkmark"></span>
            </label>
          </li>
        );
      }),
      totalArticles = priorArr.reduce((prev, cur, i, arr) => {
        return prev + this.props.priorities[cur].length;
      }, 0);
      
    return (
      <div className="filter-wrapper">
        <input type="checkbox" id="filter-checker"/>
        <div className="filter-block">
          <div className="visible-arrow" title="Toggle filters block">
            <label htmlFor='filter-checker' className='arrow-label'>
              <i className="fas fa-angle-right toggle-filters"></i>
            </label>
          </div>
          <div className="filter-container">
            <form onChange={this.handleChange} className="filter-form">
              <ul className="filter-list">
                <li className="filter-list-item">
                  <label className='checkbox-container'>Select all ({totalArticles})
                  <input
                      type="checkbox"
                      id="checkbox0"
                      className="checkbox-hidden"
                      defaultChecked
                  />
                  <span className="checkmark"></span>
                  </label>
                </li>
                {listItems}
              </ul>
            </form>
          </div>
        </div>
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