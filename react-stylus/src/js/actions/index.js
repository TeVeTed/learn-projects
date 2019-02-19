import { DATA_LOADED } from '../constants/action-types';

export function getData() {
  return function(dispatch) {
    return fetch('https://newsapi.org/v2/top-headlines?' +
      'country=ua&apiKey=06629c8bc17b48ce8e6829abec827a3a')
      .then(response => response.json())
      .then(json => {
        dispatch({ type: DATA_LOADED, payload: json });
      })
  }
}