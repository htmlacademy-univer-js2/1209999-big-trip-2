import {
  isDateInFuture,
  isDateInPast,
  isDateInRange,
  sortByDateAscending,
  sortByDurationDescending,
  sortByPriceDescending
} from './utils';

const SERVER_URL = 'https://18.ecmascript.pages.academy/big-trip';

const HOUR_IN_MINUTES = 60;

const DAY_IN_MINUTES = 1440;

const DATE_FORMAT = 'YYYY-MM-DD';

const TIME_FORMAT = 'hh:mm';

const AUTHORIZATION = 'Basic laaaammmmmaaaaaaaa123qhklg123534';

const BORDERS_TIME = {
  LOWER_LIMIT: 100,
  UPPER_LIMIT: 1000,
};

const FILTER_TYPE = {
  EVERYTHING: 'everything',
  PAST: 'past',
  FUTURE: 'future',
};

const USER_ACTION = {
  UPDATE_POINT: 'UPDATE_POINT',
  DELETE_POINT: 'DELETE_POINT',
  ADD_POINT: 'ADD_POINT',
};

const SORT_TYPE = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const UPDATE_TYPE = {
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  PATCH: 'PATCH',
  INIT: 'INIT'
};

const SORT_TYPE_DICTIONARY = {
  [SORT_TYPE.DAY]: 'Day',
  [SORT_TYPE.EVENT]: 'Event',
  [SORT_TYPE.TIME]: 'Time',
  [SORT_TYPE.PRICE]: 'Price',
  [SORT_TYPE.OFFER]: 'Offer',
};

const SORT_DICT = {
  [SORT_TYPE.DAY]: (points) => points.sort(sortByDateAscending),
  [SORT_TYPE.TIME]: (points) => points.sort(sortByDurationDescending),
  [SORT_TYPE.PRICE]: (points) => points.sort(sortByPriceDescending)
};

const FILTER = {
  [FILTER_TYPE.EVERYTHING]: (points) => points,
  [FILTER_TYPE.FUTURE]: (points) =>
    points.filter(
      (point) =>
        isDateInFuture(point.dateFrom) ||
        isDateInRange(point.dateFrom, point.dateTo)
    ),
  [FILTER_TYPE.PAST]: (points) =>
    points.filter(
      (point) =>
        isDateInPast(point.dateTo) ||
        isDateInRange(point.dateFrom, point.dateTo)
    )
};

const RESPONSE_METHOD = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

const POINT_TYPE = {
  BUS: 'bus',
  SHIP: 'ship',
  DRIVE: 'drive',
  TAXI: 'taxi',
  TRAIN: 'train',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  RESTAURANT: 'restaurant',
  SIGHTSEEING: 'sightseeing',
};

const POINT_TYPE_DICTIONARY = {
  [POINT_TYPE.BUS]: 'Bus',
  [POINT_TYPE.SHIP]: 'Ship',
  [POINT_TYPE.DRIVE]: 'Drive',
  [POINT_TYPE.TAXI]: 'Taxi',
  [POINT_TYPE.TRAIN]: 'Train',
  [POINT_TYPE.FLIGHT]: 'Flight',
  [POINT_TYPE.CHECK_IN]: 'Check-in',
  [POINT_TYPE.RESTAURANT]: 'Restaurant',
  [POINT_TYPE.SIGHTSEEING]: 'Sightseeing',
};

const API_URLS = {
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
  POINTS: 'points',
};

export {
  HOUR_IN_MINUTES,
  DAY_IN_MINUTES,
  AUTHORIZATION,
  SERVER_URL,
  API_URLS,
  DATE_FORMAT,
  TIME_FORMAT,
  FILTER_TYPE,
  FILTER,
  USER_ACTION,
  UPDATE_TYPE,
  SORT_TYPE,
  SORT_DICT,
  SORT_TYPE_DICTIONARY,
  POINT_TYPE,
  POINT_TYPE_DICTIONARY,
  BORDERS_TIME,
  RESPONSE_METHOD,
};
