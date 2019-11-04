import React from 'react';
import reducer from '../reducers';

import { IItemAction } from '../actions';
import { IStoreState } from '../types';

interface IProps {
  children: React.ReactNode;
};

interface IContextProps {
  state: IStoreState,
  dispatch: React.Dispatch<IItemAction>
}

// Set a 'schema' for state
const initialState: IStoreState = {
  remoteNews: [],
  priorities: {},
  filteredPriorities: [],
  updateFilters: false
};

export const Store = React.createContext({} as IContextProps);

export const StoreProvider = ({ children }: IProps): JSX.Element => {
  const
    [state, dispatch] = React.useReducer(reducer, initialState),
    value = { state, dispatch };

  return (
    <Store.Provider value={value}>
      {children}
    </Store.Provider>
  )
}