import React from 'react';
import { number, object } from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from "react-redux";
import { changePriority } from "../actions/index";

import { MAX_PRIORITY, MIN_PRIORITY } from '../constants/action-types';

function mapDispatchToProps(dispatch) {
  return {
    changePriority: priority => dispatch(changePriority(priority))
  };
}

class ConnectedPost extends React.Component {
  static propTypes = {
    id: number.isRequired,
    value: object.isRequired
  }

  constructor() {
    super();
    this.state = {
      priorityChanging: false,
      newPriority: null
    };
  }

  handleClick = () => {
    this.setState({ priorityChanging: !this.state.priorityChanging });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.newPriority) {
      this.props.changePriority({
        id: this.props.id,
        oldPriority: this.props.value.priority,
        newPriority: Number(this.state.newPriority)
      });
      this.setState({ newPriority: null });
    }
    this.setState({ priorityChanging: !this.state.priorityChanging });
  }

  handleChange = (event) => {
    this.setState({ newPriority: event.target.value });
  }

  handleClickLink = () => {
    sessionStorage.setItem('selectedArticle', JSON.stringify(this.props.value));
  }

  Button() {
    return (
      <button className='button' onClick={() => this.handleClick()}>
        Change priority {this.props.value.priority}
      </button>
    );
  }

  Select() {
    let radioSet = [];
    for (let i = MAX_PRIORITY; i <= MIN_PRIORITY; i++) {
      radioSet.push(
        <li key={i} className='priority-radio'>
          <label
            htmlFor={'articlePriority' + i}
            className='checkbox-container'
          >
            <span className='label-title'>{i}</span>
            <input
              onChange={event => this.handleChange(event)}
              type="radio"
              name="articlePriority"
              value={i}
              defaultChecked={i === this.props.value.priority}
              id={'articlePriority' + i}
              className='checkbox-button'
            />
            <span className="checkmark"></span>
          </label>
        </li>
      );
    }
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <ul className='prioriry-list'>
          {radioSet}
        </ul>
        <button type='submit' className='button'>Change</button>
      </form>
    );
  }

  render() {
    return (
      <div className='news-item'>
        <div className="news-item-img">
          <img src={this.props.value.urlToImage} alt='' width='280' height='280' className='img-item' />
        </div>
        <div className="news-item-bg">
          <h3 className="title small-title" onClick={() => this.handleClickLink()}>
            <Link to={`/article/${this.props.id}`} className="title-link">
              {this.props.value.title}
            </Link>
          </h3>
          <div className="desc">
            {this.state.priorityChanging ? this.Select() : this.Button()}
          </div>
        </div>
      </div>
    )
  }
}

const Post = connect(null, mapDispatchToProps)(ConnectedPost);

export default Post;