import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/';

export function mapDispatchToProps(dispatch: Dispatch<actions.ItemAction>) {
	return {
    onRevertClosing: (indexToRevert: number) => dispatch(actions.revertClosing(indexToRevert)),
    onRemoveItem: (indexToRemove: number) => dispatch(actions.removeItem(indexToRemove))
	};
}

interface Props {
  itemId: number;
  item: string;
  closed: boolean;
  onRevertClosing: (indexToRevert: number) => void;
  onRemoveItem: (indexToRemove: number) => void;
}

function ListItem({
  itemId,
  item,
  closed,
  onRevertClosing,
  onRemoveItem
}: Props) {
  return (
    <li
      className={`list-group-item${closed ? ' item-line-through' : ''}`}
      key={itemId}
    >
      <span onClick={() => onRevertClosing(itemId)}>{item}</span>
      <button className="btn" onClick={() => onRemoveItem(itemId)}>X</button>
    </li>
  )
}
const Item = connect(null, mapDispatchToProps)(ListItem);

export default Item;