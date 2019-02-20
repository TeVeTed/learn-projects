import { DATA_LOADED, SELECT_PRIORITIES } from '../constants/action-types';

const initialState = {
    remoteNews: [],
    priorities: {}
};

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
        default:
            break;
    }
    return state;
}

export default rootReducer;