import {IItemObject, IStoreState} from '../types';

import { IItemAction } from '../actions';
import * as constants from '../constants/action-types';

// Applying actions
function reducer(state: IStoreState, action: IItemAction): IStoreState {
  switch (action.type) {
    case constants.DATA_LOADED:
      return {
        ...state,
        remoteNews: state.remoteNews.concat(action.payload)
      };
    case constants.SELECT_PRIORITIES:
      const stateCopy = {
        ...state.priorities
      };

      for (const key in action.payload) {
        if (Object.prototype.hasOwnProperty.call(action.payload, key)) {
          stateCopy[key] = stateCopy[key] ? stateCopy[key].concat(action.payload[key]) : action.payload[key];
        }
      }
      return {
        ...state,
        priorities: {
          ...state.priorities,
          ...stateCopy
        },
        filteredPriorities: Object.keys(stateCopy)
      };
    case constants.FILTER_PRIORITIES:
      return {
        ...state,
        filteredPriorities: Object.keys(action.payload)
      };
    case constants.CHANGE_PRIORITY:
      const
        prioritiesCopy: object = state.priorities,
        newsCopy: IItemObject[] = state.remoteNews,
        newValue = action.payload.newPriority,
        oldValue = action.payload.oldPriority,
        oldArticleSet: number[] = prioritiesCopy[oldValue],
        newArticleSet: number[] = prioritiesCopy[newValue];

      // Update array with articles
      newsCopy[action.payload.id].priority = newValue;

      // Update priorities for filters
      prioritiesCopy[oldValue] =
          oldArticleSet
          .filter(item => item !== action.payload.id);

      if (!oldArticleSet.length) {
        delete prioritiesCopy[oldValue];
      }
      if (!newArticleSet) {
        prioritiesCopy[newValue] = [];
      }

      prioritiesCopy[newValue].push(action.payload.id);
      prioritiesCopy[newValue] = newArticleSet.sort((a, b) => a - b);

      return {
        ...state,
        remoteNews: newsCopy,
        priorities: prioritiesCopy,
        updateFilters: !state.updateFilters
      };
    default:
      break;
  }
  return state;
}

export default reducer;