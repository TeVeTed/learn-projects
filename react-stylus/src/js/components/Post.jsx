import React from 'react';
import { connect } from "react-redux";
import { changePriority } from "../actions/index";

import { MAX_PRIORITY, MIN_PRIORITY } from '../constants/action-types';

function mapDispatchToProps(dispatch) {
  return {
    changePriority: priority => dispatch(changePriority(priority))
  };
}

const handleClick = context => {
  context.setState({ priorityChanging: !context.state.priorityChanging });
};

const handleSubmit = (event, context) => {
  event.preventDefault();
  if (context.state.newPriority) {
    context.props.changePriority({
      id: context.props.id,
      oldPriority: context.props.value.priority,
      newPriority: Number(context.state.newPriority)
    });
    context.setState({ newPriority: null });
  }
  context.setState({ priorityChanging: !context.state.priorityChanging });
};

const handleChange = (event, context) => {
  context.setState({ newPriority: event.target.value });
};

function Button(context) {
  return (
    <button className='button' onClick={() => handleClick(context)}>
      Change priority {context.props.value.priority}
    </button>
  );
}

function Select(context) {
  let radioSet = [];
  for (let i = MAX_PRIORITY; i <= MIN_PRIORITY; i++) {
    radioSet.push(<li key={i} className='priority-radio'>
      <label
        htmlFor={'articlePriority' + i}
        className='checkbox-container'
      >
        <span className='label-title'>{i}</span>
        <input
          onChange={event => handleChange(event, context)}
          type="radio"
          name="articlePriority"
          value={i}
          defaultChecked={i === context.props.value.priority}
          id={'articlePriority' + i}
          className='checkbox-button'
        />
        <span className="checkmark"></span>
      </label>
    </li>);
  }
  return (
    <form onSubmit={event => handleSubmit(event, context)}>
      <ul className='prioriry-list'>
        {radioSet}
      </ul>
      <button type='submit' className='button'>Change</button>
    </form>
  );
}

class ConnectedPost extends React.Component {
  constructor() {
    super();
    this.state = {
      priorityChanging: false,
      newPriority: null
    };
  }

  render() {
    return (
      <div className='news-item'>
        <div className="news-item-img">
          <img src={this.props.value.urlToImage} alt='' width='280' height='280' className='img-item' />
        </div>
        <div className="news-item-bg">
          <h3 className="title small-title">
            <a className="title-link"
              href={this.props.value.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {this.props.value.title}
              </a>
          </h3>
          <div className="desc">
            {this.state.priorityChanging ? Select(this) : Button(this)}
          </div>
        </div>
      </div>
    )
  }
}

const Post = connect(null, mapDispatchToProps)(ConnectedPost);

export default Post;