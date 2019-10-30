import React from 'react';
import reducer from '../reducers';

export const Store = React.createContext();

// Set a 'schema' for state
const initialState = {
  remoteNews: [],
  priorities: {},
  filteredPriorities: [],
  updateFilters: false
};

export function StoreProvider(props) {
  const
    [state, dispatch] = React.useReducer(reducer, initialState),
    value = { state, dispatch };

  return (
    <Store.Provider value={value}>
      {props.children}
    </Store.Provider>
  )
}