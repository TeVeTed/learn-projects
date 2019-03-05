import * as React from 'react';
import { connect } from 'react-redux';

import { StoreState } from '../types/index';

import Item from './Item';

import './List.css';

export interface Props {
  items: string[];
  closed: boolean[];
}

function mapStateToProps({items, closed, listModified}: StoreState) {
  return {
    closed,
    items,
    listModified
  }
}

function List({ items, closed }: Props) {

  return (
    <ul className="list-group list-group-flush">
      {items.map((arrayItem, i) => {
        return <Item closed={closed[i]} itemId={i} item={arrayItem} key={i} />
      })}
    </ul>
  )
};

export default connect(mapStateToProps)(List);