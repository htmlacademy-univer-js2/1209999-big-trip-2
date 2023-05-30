import { TRIP_TYPES, DAYTYPES } from '../const';
import { randomInt } from '../utils';
import dayjs from 'dayjs';

export const createPoint = (id) => {
  let currentTime = dayjs().add(randomInt(-7, 7), DAYTYPES[randomInt(0, 1)]);
  const dateFrom = currentTime;
  const dateTo = currentTime.add(randomInt(2, 7), DAYTYPES[randomInt(0, 1)]);
  currentTime = dateTo;
  return {
    basePrice: randomInt(50, 500),
    dateFrom: dateFrom,
    dateTo: dateTo,
    destination: randomInt(0, 9),
    id: id,
    isFavorite: Boolean(randomInt(0, 1)),
    offers: Array.from({ length: randomInt(1, 3) }, () => randomInt(0, 4)),
    type: TRIP_TYPES[randomInt(0, TRIP_TYPES.length - 1)],
  };
};
