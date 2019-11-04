import { Dispatch } from 'react';

import {
  CHANGE_PRIORITY,
  DATA_LOADED,
  FILTER_PRIORITIES,
  SELECT_PRIORITIES
} from '../constants/action-types';

import { IItemObject } from '../types';

interface IChangePriorityPayload {
  newPriority: number,
  oldPriority: number,
  id: number
}

interface IDataLoad {
  type: DATA_LOADED,
  payload: IItemObject[]
}

interface ISelectPriorities {
  type: SELECT_PRIORITIES,
  payload: object
}

interface IFilterPriorities {
  type: FILTER_PRIORITIES,
  payload: object
}

interface IChangePriority {
  type: CHANGE_PRIORITY,
  payload: IChangePriorityPayload
}

export type IItemAction = IDataLoad | ISelectPriorities | IFilterPriorities | IChangePriority

let
  lastReturnedDayMilliseconds: number,
  moreClickCounter = 0,
  responseArticlesAmount = 0;

// Get date (if need - date of previous day) for request
const getPreviousDay = (previous: boolean) => {
  const
    date = previous ? new Date(lastReturnedDayMilliseconds - 24 * 3600 * 1000) : new Date(),
    year = date.getFullYear(),
    month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1),
    day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();

  lastReturnedDayMilliseconds = date.getTime();

  return `${year}-${month}-${day}`;
};

// Make request for fetching
const formRequest = (keyword: string, lang: string, amount: string, addLoad: boolean) => {
  const
    day = getPreviousDay(addLoad),
    url = 'https://newsapi.org/v2/everything?' +
      `q=${keyword}&` +
      'sources=the-new-york-times&' +
      `language=${lang}&` +
      `from=${day}&` +
      `to=${day}&` +
      `pageSize=${amount}&` +
      'apiKey=a248227dc670456799b1d0831ed0d47a';

  return new Request(url);
};

// Randomly set a priority value to an article
const generatePriority = (min: number, max: number): number => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);

  return Math.round(rand);
};

// Fetching data from API for initial view on page
export const getData = async (dispatch: Dispatch<IItemAction>) => {
  try {
    const response = await fetch(formRequest('IT', 'en', '10', true));
    const responseJSON = await response.json();

    if (!responseJSON.totalResults) {
      throw new Error('Invalid request or News API server currently unavailable');
    }

    const
        priorities = {},
        articles: IItemObject[] = responseJSON.articles;

    responseArticlesAmount = articles.length;
    articles.map((item, i) => {
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
    dispatch({ type: DATA_LOADED, payload: articles });
    dispatch({ type: SELECT_PRIORITIES, payload: priorities });
    dispatch({ type: FILTER_PRIORITIES, payload: priorities });

  } catch (error) {
    throw new Error(error)
  }
};

// Fetching data from API, adding new articles to list
export const addNews = async (dispatch: Dispatch<IItemAction>) => {
  try {
    const response = await fetch(formRequest('IT', 'en', '5', true));
    const responseJSON = await response.json();

    const
      priorities = {},
      increaseIndex = moreClickCounter ? (responseArticlesAmount + 5 * moreClickCounter) : responseArticlesAmount, // Modifiying indexes, which depends on day in request
      articles: IItemObject[] = responseJSON.articles;

    articles.map((item, i) => {
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
    dispatch({ type: DATA_LOADED, payload: articles });
    dispatch({ type: SELECT_PRIORITIES, payload: priorities });

  } catch (error) {
    throw new Error(error)
  }
};

// Update priorities that selected in filter block
export const filteredPriorities = (dispatch: Dispatch<IItemAction>, payload: object) => {
  dispatch({
    type: FILTER_PRIORITIES,
    payload
  });
};

// Update article priority with new value
export const changePriority = (dispatch: Dispatch<IItemAction>, payload: IChangePriorityPayload) => {
  dispatch({
    type: CHANGE_PRIORITY,
    payload
  });
};
