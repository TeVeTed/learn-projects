import React from 'react';
import { object } from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from "react-redux";
import { changePriority } from "../actions/index";

import { MAX_PRIORITY, MIN_PRIORITY } from '../constants/action-types';

function mapStateToProps(state, ownProps) {
  return {
    article: state.remoteNews[ownProps.match.params.index]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePriority: priority => dispatch(changePriority(priority))
  };
}

class ArticlePage extends React.Component {
  static propTypes = {
    article: object.isRequired
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
        id: this.props.match.params.index,
        oldPriority: this.props.article.priority,
        newPriority: Number(this.state.newPriority)
      });
      this.setState({ newPriority: null });
    }
    this.setState({ priorityChanging: !this.state.priorityChanging });
  }

  handleChange = (event) => {
    this.setState({ newPriority: event.target.value });
  }

  Button() {
    return (
      <button className='button' onClick={() => this.handleClick()}>
        Change priority {this.props.article.priority}
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
              defaultChecked={i === this.props.article.priority}
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
    // if (!this.props.article)
    //   this.props.article = sessionStorage.getItem('selectedArticle');

    return (
      <div className="article-sec">
        <div className="block-wrapper">
          <div className="block-column">
            <div className="article">
              <div className="half-place art-img">
                <img src={this.props.article.urlToImage} alt="" width='570' height='570' className="main-img"/>
              </div>
              <div className="half-place art-more">
                <div className="info">
                  <h2 className="sec-title middle-title">
                    {this.props.article.title}
                  </h2>
                  <p className="desc">
                    {this.props.article.description}
                  </p>
                </div>
                <div className="add-info">
                  <div className="add-info-item">
                    <span>Source</span>
                    <p className="add-info-title">{this.props.article.source.name}</p>
                  </div>
                  <div className="add-info-item">
                    <span>Author(s)</span>
                    <p className="add-info-title">{this.props.article.author}</p>
                  </div>
                  <div className="add-info-item">
                    {this.state.priorityChanging ? this.Select() : this.Button()}
                  </div>
                </div>
                <div className='returning-link'><Link to='/'>Return to feed >>></Link></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const Article = connect(mapStateToProps, mapDispatchToProps)(ArticlePage);

export default Article;