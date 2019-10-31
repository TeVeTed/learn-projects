import {
  DATA_LOADED,
  SELECT_PRIORITIES,
  FILTER_PRIORITIES,
  CHANGE_PRIORITY
} from '../constants/action-types';

let
  lastReturnedDayMilliseconds,
  moreClickCounter = 0,
  responseArticlesAmount = 0;

// Get date (if need - date of previous day) for request
  function getPreviousDay(previous) {
  const
    date = previous ? new Date(lastReturnedDayMilliseconds - 24 * 3600 * 1000) : new Date(),
    year = date.getFullYear(),
    month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1),
    day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();

  lastReturnedDayMilliseconds = date;

  return `${year}-${month}-${day}`;
}

// Make request for fetching
function formRequest(keyword, lang, amount, addLoad) {
  const
    day = getPreviousDay(addLoad),
    url = 'https://newsapi.org/v2/everything?' +
      `q=${keyword}&` +
      'sources=the-new-york-times&' +
      `language=${lang}&` +
      `from=${day}&` +
      `to=${day}&` +
      `pageSize=${amount}&` +
      'apiKey=dd83ac194e554eefb3efe7edf64a37de';

  return new Request(url);
}

// Randomly set a priority value to an article
function generatePriority(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}


// Fetching data from API for initial view on page
export function getData() {
  return function(dispatch) {
    return fetch(formRequest('IT', 'en', '10', false))
      .then(response => response.json())
      .then(json => {
        const priorities = {};

        responseArticlesAmount = json.articles.length;
        json.articles.map((item, i) => {
          // Set priority
          item.priority = generatePriority(1, 5);
          
          // Form an object of arrays, sorted by priority with article indexes
          if (!priorities[item.priority]) {
            priorities[item.priority] = [i];
          } else {
            priorities[item.priority].push(i);
          }

          return item;
        });

        // Call an actions from reducer
        dispatch({ type: DATA_LOADED, payload: json.articles });
        dispatch({ type: SELECT_PRIORITIES, payload: priorities });
        dispatch({ type: FILTER_PRIORITIES, payload: Object.keys(priorities) });
      }
    );
  };
}

// Fetching data from API, adding new articles to list
export function addNews() {
  return function(dispatch) {
    return fetch(formRequest('IT', 'en', '5', true))
      .then(response => response.json())
      .then(json => {
        const
          priorities = {},
          increaseIndex = moreClickCounter ? (responseArticlesAmount + 5 * moreClickCounter) : responseArticlesAmount; // Modifiying indexes, which depends on day in request

        json.articles.map((item, i) => {
          // Set priority
          item.priority = generatePriority(1, 5);
          
          // Form an object of arrays, sorted by priority with article indexes
          if (!priorities[item.priority]) {
            priorities[item.priority] = [i + increaseIndex];
          } else {
            priorities[item.priority].push(i + increaseIndex);
          }

          return item;
        });
        moreClickCounter++;

        // Call an actions from reducer
        dispatch({ type: DATA_LOADED, payload: json.articles });
        dispatch({ type: SELECT_PRIORITIES, payload: priorities });
      }
    );
  };
}

// Update priorities that setted in filter block
export function filteredPriorities(payload) {
  return { type: FILTER_PRIORITIES, payload };
}

// Update article priority with new value
export function changePriority(payload) {
  return { type: CHANGE_PRIORITY, payload };
}