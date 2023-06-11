import dayjs from 'dayjs';
import {
  DAY_IN_MINUTES,
  HOUR_IN_MINUTES,
  DATE_FORMAT,
  TIME_FORMAT,
} from './const';

const getRandomInt = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const sortByPriceDescending = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sortByDateAscending = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const createDate = (date) => dayjs(date).format(DATE_FORMAT);

const createTime = (date) => dayjs(date).format(TIME_FORMAT);

const isDateInPast = (dateTo) => dayjs().diff(dateTo, 'minute') > 0;

const isDateInFuture = (dateFrom) => dayjs().diff(dateFrom, 'minute') <= 0;

const isDateInRange = (dateFrom, dateTo) => dayjs().diff(dateFrom, 'minute') > 0 && dayjs().diff(dateTo, 'minute') < 0;

const formatMinutes = (restMinutes) => (restMinutes < 10) ? `0${restMinutes}M` : `${restMinutes}M`;

const sortByDurationDescending = (pointA, pointB) => {
  const timePointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timePointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return timePointB - timePointA;
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

export {
  formatDateToDDMMM,
  sortByPriceDescending,
  sortByDateAscending,
  sortByDurationDescending,
  calculateDuration,
  createDate,
  createTime,
  isDateInPast,
  isDateInFuture,
  isDateInRange,
  getRandomInt,
};
