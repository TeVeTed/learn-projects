import React from 'react';
import { connect } from "react-redux";
import { changePriority } from "../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    changePriority: priority => dispatch(changePriority(priority))
  }
}

const handleClick = context => {
  context.setState({ priorityChanging: !context.state.priorityChanging });
}

const handleBlur = (event, context) => {
  if (event.target.value !== context.props.value.priority.toString()) {
    context.props.changePriority({
      id: context.props.id,
      oldPriority: context.props.value.priority,
      newPriority: Number(event.target.value)
    });
  }
  context.setState({ priorityChanging: !context.state.priorityChanging });
}

function Span(context) {
  return (
    <span onClick={() => handleClick(context)}>{context.props.value.priority}</span>
  );
}

function Input(context) {
  return <input
    type='text'
    defaultValue={context.props.value.priority}
    onBlur={event => handleBlur(event, context)}
  />;
}

class ConnectedPost extends React.Component {
  constructor() {
    super();
    this.state = {
      priorityChanging: false
    };
  }

  render() {
    return (
      <div className="post">
        <span className="content">{this.props.value.title}</span>
        <p><a href={this.props.value.url} target='_blanc'>More details...</a></p>
        <label>
          <span>Priority:</span>
          {this.state.priorityChanging ? Input(this) : Span(this)}
        </label>
      </div>
    )
  }
}

const Post = connect(null, mapDispatchToProps)(ConnectedPost);

export default Post;