import { DATA_LOADED } from '../constants/action-types';

const initialState = {
    remoteNews: []
};

function rootReducer(state = initialState, action) {
    if (action.type === DATA_LOADED) {
        return Object.assign({}, state, {
            remoteNews: state.remoteNews.concat(action.payload)
        });
    }
    return state;
}

export default rootReducer;