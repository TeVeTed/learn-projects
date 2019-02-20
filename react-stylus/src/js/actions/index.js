import { DATA_LOADED } from '../constants/action-types';

let lastReturnedDayMilliseconds;

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
  const day = getPreviousDay(addLoad);
  return 'https://newsapi.org/v2/everything?' +
    `q=${keyword}&` +
    'sources=the-new-york-times&' +
    `language=${lang}&` +
    `from=${day}&` +
    `to=${day}&` +
    `pageSize=${amount}&` +
    'apiKey=06629c8bc17b48ce8e6829abec827a3a';
}

function generatePriority(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export function getData() {
  const req = new Request(formRequest('IT', 'en', '10', false));
  return function(dispatch) {
    return fetch(req)
      .then(response => response.json())
      .then(json => {
        json.articles.map(item => {
          item.priority = generatePriority(1, 5);
          return item;
        });
        dispatch({ type: DATA_LOADED, payload: json.articles });
      }
    );
  };
}

export function addNews() {
  const req = new Request(formRequest('IT', 'en', '5', true));
  return function(dispatch) {
    return fetch(req)
      .then(response => response.json())
      .then(json => {
        json.articles.map(item => {
          item.priority = generatePriority(1, 5);
          return item;
        });
        dispatch({ type: DATA_LOADED, payload: json.articles });
      }
    );
  };
}