import {
    DATA_LOADED,
    SELECT_PRIORITIES,
    FILTER_PRIORITIES,
    CHANGE_PRIORITY
} from '../constants/action-types';

// Set a 'schema' for redux state
const initialState = {
    remoteNews: [],
    priorities: {},
    filteredPriorities: [],
    updateFilters: false
};

// Applying actions
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case DATA_LOADED:
            return Object.assign({}, state, {
                remoteNews: state.remoteNews.concat(action.payload)
            });
        case SELECT_PRIORITIES:
            const stateCopy = Object.assign({}, state.priorities);
            for (let key in action.payload) {
                if(stateCopy[key]) {
                    stateCopy[key] = stateCopy[key].concat(action.payload[key]);
                } else {
                    stateCopy[key] = action.payload[key];
                }
            }
            return Object.assign({}, state, {
                priorities: Object.assign({}, state.priorities, stateCopy)
            });
        case FILTER_PRIORITIES:
            return Object.assign({}, state, {
                filteredPriorities: action.payload
            });
        case CHANGE_PRIORITY:
            let prioritiesCopy = state.priorities;
            const newsCopy = state.remoteNews;

            // Update array with articles
            newsCopy[action.payload.id].priority = action.payload.newPriority;
            
            // Update priorities for filters
            prioritiesCopy[action.payload.oldPriority] = prioritiesCopy[action.payload.oldPriority]
                .filter(item => item !== action.payload.id);

            if (!prioritiesCopy[action.payload.oldPriority].length) delete prioritiesCopy[action.payload.oldPriority];
            if (!prioritiesCopy[action.payload.newPriority]) prioritiesCopy[action.payload.newPriority] = [];
            
            prioritiesCopy[action.payload.newPriority].push(action.payload.id);
            prioritiesCopy[action.payload.newPriority].sort((a, b) => a - b);
            
            return Object.assign({}, state, {
                remoteNews: newsCopy,
                priorities: prioritiesCopy,
                updateFilters: !state.updateFilters
            });
        default:
            break;
    }
    return state;
}

export default rootReducer;