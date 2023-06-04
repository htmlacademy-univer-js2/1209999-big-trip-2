import dayjs from 'dayjs';
import {
  DAY_IN_MINUTES,
  HOUR_IN_MINUTES,
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_WITH_TIME_FORMAT
} from './const';

const getRandomInt = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElement = (elements) => {
  const MIN = 0;
  const max = elements.length - 1;
  return elements[getRandomInt(MIN, max)];
};

const makeFirstLetterBig = (string) => {
  const capFirstString = string[0].toUpperCase();
  const restOfString = string.slice(1);
  return capFirstString + restOfString;
};

const sortByPriceDescending = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sortByDateAscending = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const createDate = (date) => dayjs(date).format(DATE_FORMAT);

const createTime = (date) => dayjs(date).format(TIME_FORMAT);

const createFullDate = (date) => dayjs(date).format(DATE_WITH_TIME_FORMAT);

const sortByDurationDescending = (pointA, pointB) => {
  const timePointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timePointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return timePointB - timePointA;
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);
  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const formatDateToDDMMM = (date) => dayjs(date).format('DD MMM');

const formatDays = (days) => {
  if (!days) {
    return '';
  }
  if (days < 10) {
    return `0${days}D`;
  }
  return `${days}D`;
};

const formatHours = (days, restHours) => {
  if (!days && !restHours) {
    return '';
  }
  if (restHours < 10) {
    return `0${restHours}H`;
  }
  return `${restHours}H`;
};

const formatMinutes = (restMinutes) => (restMinutes < 10) ? `0${restMinutes}M` : `${restMinutes}M`;

const calculateDuration = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);
  const difference = end.diff(start, 'minute');

  const days = Math.floor(difference / DAY_IN_MINUTES);
  const restHours = Math.floor((difference - days * DAY_IN_MINUTES) / HOUR_IN_MINUTES);
  const restMinutes = difference - (days * DAY_IN_MINUTES + restHours * HOUR_IN_MINUTES);

  const daysOutput = formatDays(days);
  const hoursOutput = formatHours(days, restHours);
  const minutesOutput = formatMinutes(restMinutes);

  return `${daysOutput} ${hoursOutput} ${minutesOutput}`;
};

const isDateInPast = (date) => dayjs().diff(date, 'day') > 0;

const isDateInFuture = (date) => date.diff(dayjs(), 'day') >= 0;

const isDateInRange = (dateFrom, dateTo) => dayjs().diff(dateFrom, 'day') > 0 && dateTo.diff(dayjs(), 'day') > 0;

export {
  formatDateToDDMMM,
  sortByPriceDescending,
  sortByDateAscending,
  sortByDurationDescending,
  calculateDuration,
  createDate,
  createFullDate,
  createTime,
  isDateInPast,
  isDateInFuture,
  isDateInRange,
  getRandomInt,
  updateItem,
  getRandomElement,
  makeFirstLetterBig,
};
