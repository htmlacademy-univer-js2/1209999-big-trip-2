import {
  isDateInFuture,
  isDateInPast,
  isDateInRange,
  sortByDateAscending,
  sortByDurationDescending,
  sortByPriceDescending
} from './utils';

const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

const SORT_TYPE = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

const SORT_DICT = {
  [SORT_TYPE.DAY]: (points) => points.sort(sortByDateAscending),
  [SORT_TYPE.TIME]: (points) => points.sort(sortByDurationDescending),
  [SORT_TYPE.PRICE]: (points) => points.sort(sortByPriceDescending)
};

const DESCRIPTIONS = [
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.'
];

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

const POINT_TYPES = [
  'taxi',
  'bus',
  'ship',
  'drive',
  'flight',
  'train',
  'check-in',
  'restaurant',
  'sightseeing',
];

const DESTINATIONS = [
  'London',
  'Los Angeles',
  'Moscow',
  'Taiwan',
  'Tokyo',
  'Kostanai',
];

const HOUR_IN_MINUTES = 60;

const DAY_IN_MINUTES = 1440;

const DATE_FORMAT = 'YYYY-MM-DD';

const TIME_FORMAT = 'hh:mm';

const DATE_WITH_TIME_FORMAT = 'DD/MM/YY hh:mm';

const TOTAL_POINTS = 20;

const ELEMENTS_COUNT = {
  MIN: 1,
  MAX: 4
};

const PICTURE_INDEX = {
  MIN: 0,
  MAX: 10
};

const PRICE = {
  MIN: 10,
  MAX: 100
};

const MODE = {
  PREVIEW: 'preview',
  EDITING: 'editing',
};

export {
  DESCRIPTIONS,
  HOUR_IN_MINUTES,
  DAY_IN_MINUTES,
  DATE_FORMAT,
  DATE_WITH_TIME_FORMAT,
  TIME_FORMAT,
  FILTER_TYPE,
  FILTER,
  SORT_TYPE,
  TOTAL_POINTS,
  POINT_TYPES,
  DESTINATIONS,
  ELEMENTS_COUNT,
  PICTURE_INDEX,
  PRICE,
  SORT_DICT,
  MODE
};
