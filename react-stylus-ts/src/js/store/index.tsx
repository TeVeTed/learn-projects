import React from 'react';
import reducer from '../reducers';

import { StoreState } from '../types';

interface ContextProps {
  state: StoreState,
  dispatch: ({type}:{type: string}) => void
}

// Set a 'schema' for state
const initialState = {
  remoteNews: [],
  priorities: {},
  filteredPriorities: [],
  updateFilters: false
};

export const Store = React.createContext({} as ContextProps);

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