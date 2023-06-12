import {
  isDateInFuture,
  isDateInPast,
  isDateInRange,
  sortByDateAscending,
  sortByDurationDescending,
  sortByPriceDescending
} from './utils';
import dayjs from 'dayjs';


const FINAL_FORMAT_HEADERS = {
  DATE_FROM: 'date_from',
  DATE_TO: 'date_to',
  BASE_PRICE: 'base_price',
  IS_FAVORITE: 'is_favorite'
};

const ERROR_MESSAGE = {
  UPDATE_NON_EXISTENT_POINT: 'Oops can\'t update non-existent point',
  CANT_UPDATE: 'Oops can\'t update point',
  CANT_ADD: 'Oops can\'t add point',
  DELETE_NON_EXISTENT_POINT: 'Oops can\'t delete non-existent point',
  CANT_DELETE: 'Oops can\'t delete point',
};

const MODE = {
  PREVIEW: 'preview',
  EDITING: 'editing',
};

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

const EMPTY_POINTS_TEXT = {
  [FILTER_TYPE.EVERYTHING]: 'Click New Event to create your first point',
  [FILTER_TYPE.PAST]: 'There are no past events now',
  [FILTER_TYPE.FUTURE]: 'There are no future events now',
};

const BLANK_POINT = {
  type: POINT_TYPE.BUS,
  destination: 1,
  dateFrom: dayjs(),
  dateTo: dayjs(),
  basePrice: 100,
  offers: [],
  isFavorite: false,
};

export {
  BLANK_POINT,
  HOUR_IN_MINUTES,
  EMPTY_POINTS_TEXT,
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
  MODE,
  FINAL_FORMAT_HEADERS,
  SORT_TYPE_DICTIONARY,
  POINT_TYPE,
  POINT_TYPE_DICTIONARY,
  BORDERS_TIME,
  ERROR_MESSAGE,
  RESPONSE_METHOD,
};
