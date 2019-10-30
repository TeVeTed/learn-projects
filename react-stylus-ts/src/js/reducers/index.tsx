import { StoreState } from '../types';
import * as constants from '../constants/action-types';

// Applying actions
function reducer(state: StoreState, action): StoreState {
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

      for (let key in action.payload) {
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
        filteredPriorities: action.payload
      };
    case constants.CHANGE_PRIORITY:
      const
        prioritiesCopy = state.priorities,
        newsCopy = state.remoteNews,
        newValue = action.payload.newPriority,
        oldValue = action.payload.oldPriority;

      // Update array with articles
      newsCopy[action.payload.id].priority = newValue;

      // Update priorities for filters
      prioritiesCopy[oldValue] =
        prioritiesCopy[oldValue]
          .filter(item => item !== action.payload.id);

      if (!prioritiesCopy[oldValue].length) {
        delete prioritiesCopy[oldValue];
      }
      if (!prioritiesCopy[newValue]) {
        prioritiesCopy[newValue] = [];
      }

      prioritiesCopy[newValue].push(action.payload.id);
      prioritiesCopy[newValue].sort((a, b) => a - b);

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