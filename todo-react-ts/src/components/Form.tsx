import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as actions from '../actions/';

export interface AddingItem {
  item: string;
  closed: boolean;
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ItemAction>) {
	return {
		onAdd: (addingItem: AddingItem) => dispatch(actions.addItem(addingItem)),
	};
}

export interface Props {
  onClick?: () => void;
  onAdd: (addingItem: AddingItem) => void;
}

interface State {
  newItem: string;
  changeClosing: boolean;
}

class InputForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      newItem: '',
      changeClosing: false
    }
  }

  handleChangeInput = (event: any) => {
    this.setState({ newItem: event.target.value });
  }

  handleChangeCheckbox = (event: any) => {
    this.setState({ changeClosing: event.target.checked });
  }

  handleSubmit = (event: any, name: string = 'Вася') => {
    event.preventDefault();
    const { newItem, changeClosing } = this.state;
    if (newItem !== '') {
      this.props.onAdd({item: newItem, closed: changeClosing});
    }
    this.setState({ newItem: '', changeClosing: false });
  }

  render() {
    const { newItem } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={newItem}
            onChange={this.handleChangeInput}
          />
          <input
            type="checkbox"
            id="checkClosed"
            defaultChecked={false}
            onChange={this.handleChangeCheckbox}
          />
          <label htmlFor="checkClosed">
            Mark item as "Closed"
          </label>
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          SAVE
        </button>
      </form>
    );
  }
}

export default connect(null, mapDispatchToProps)(InputForm);