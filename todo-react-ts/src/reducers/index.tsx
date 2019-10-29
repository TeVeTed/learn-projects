import { ItemAction } from '../actions';
import { StoreState } from '../types';
import * as constants from '../constants';

export function items(state: StoreState, action: ItemAction): StoreState {
  switch (action.type) {
    case constants.OPERATIONS.ADD_ITEM:
      return {
        ...state,
        items: state.items.concat(action.payload.item),
        closed: state.closed.concat(action.payload.closed)
      };
      case constants.REMOVE_ITEM:
        state.items.splice(action.index, 1);
        state.closed.splice(action.index, 1);
        return {
          ...state,
          items: state.items,
          closed: state.closed,
          listModified: !state.listModified
        };
      case constants.REVERT_CLOSING:
        state.closed[action.index] = !state.closed[action.index];
        return {
          ...state,
          closed: state.closed,
          listModified: !state.listModified
        };
    default:
      return state;
  }
}
