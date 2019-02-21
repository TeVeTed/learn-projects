import {
  DATA_LOADED,
  SELECT_PRIORITIES,
  FILTER_PRIORITIES,
  CHANGE_PRIORITY
} from '../constants/action-types';

let
  lastReturnedDayMilliseconds,
  moreClickCounter = 0;

function getPreviousDay(previous) {
  const
    date = previous ? new Date(lastReturnedDayMilliseconds - 24 * 3600 * 1000) : new Date(),
    year = date.getFullYear(),
    month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1),
    day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();

  lastReturnedDayMilliseconds = date;

  return `${year}-${month}-${day}`;
}

function formRequest(keyword, lang, amount, addLoad) {
  const
    day = getPreviousDay(addLoad),
    url = 'https://newsapi.org/v2/everything?' +
      `q=${keyword}&` +
      'sources=the-new-york-times&' +
      `language=${lang}&` +
      `from=2019-02-20&` +
      `to=${day}&` +
      `pageSize=${amount}&` +
      'apiKey=06629c8bc17b48ce8e6829abec827a3a';

  return new Request(url);
}

function generatePriority(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export function getData() {
  return function(dispatch) {
    return fetch(formRequest('IT', 'en', '10', false))
      .then(response => response.json())
      .then(json => {
        const priorities = {};

        json.articles.map((item, i) => {
          item.priority = generatePriority(1, 5);
          
          if (!priorities[item.priority]) {
            priorities[item.priority] = [i];
          } else {
            priorities[item.priority].push(i);
          }

          return item;
        });
        dispatch({ type: DATA_LOADED, payload: json.articles });
        dispatch({ type: SELECT_PRIORITIES, payload: priorities });
        dispatch({ type: FILTER_PRIORITIES, payload: Object.keys(priorities) });
      }
    );
  };
}

export function addNews() {
  return function(dispatch) {
    return fetch(formRequest('IT', 'en', '5', true))
      .then(response => response.json())
      .then(json => {
        const
          priorities = {},
          increaseIndex = moreClickCounter ? (10 + 5 * moreClickCounter) : 10;

        json.articles.map((item, i) => {
          item.priority = generatePriority(1, 5);
          
          if (!priorities[item.priority]) {
            priorities[item.priority] = [i + increaseIndex];
          } else {
            priorities[item.priority].push(i + increaseIndex);
          }

          return item;
        });
        moreClickCounter++;

        dispatch({ type: DATA_LOADED, payload: json.articles });
        dispatch({ type: SELECT_PRIORITIES, payload: priorities });
      }
    );
  };
}

export function filteredPriorities(payload) {
  return { type: FILTER_PRIORITIES, payload };
}

export function changePriority(payload) {
  return { type: CHANGE_PRIORITY, payload };
}