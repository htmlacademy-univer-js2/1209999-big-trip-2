import dayjs from 'dayjs';
import {getRandomElement, getRandomInt} from '../utils';
import {
  ELEMENTS_COUNT, PICTURE_INDEX, TOTAL_POINTS, DESTINATIONS, DESCRIPTIONS, PRICE, POINT_TYPES
} from '../const';
import {nanoid} from 'nanoid';

const createDescription = () => {
  let description = '';
  for (let i = 0; i < getRandomInt(ELEMENTS_COUNT.MIN, ELEMENTS_COUNT.MAX); i++) {
    description += ` ${getRandomElement(DESCRIPTIONS)}`;
  }
  return description;
};

const createPicture = () => ({
  src: `http://picsum.photos/248/152?r=${getRandomInt(PICTURE_INDEX.MIN, PICTURE_INDEX.MAX)}`,
  description: createDescription(),
});

const createDestination = (id) => ({
  id,
  name: DESTINATIONS[id],
  description: createDescription(),
  pictures: Array.from({length: getRandomInt(ELEMENTS_COUNT.MIN, ELEMENTS_COUNT.MAX)}, createPicture),
});

const getDestinations = () => Array.from({length: DESTINATIONS.length}).map((value, index) => createDestination(index));

const createOffer = (id, pointType) => ({
  id, title: `offer for ${pointType}`, price: getRandomInt(PRICE.MIN, PRICE.MAX)
});

const createOffersType = (pointType) => ({
  type: pointType,
  offers: Array.from({length: getRandomInt(ELEMENTS_COUNT.MIN, ELEMENTS_COUNT.MAX)}).map((value, index) => createOffer(index + 1, pointType)),
});

const getOffersType = () => Array.from({length: POINT_TYPES.length}).map((value, index) => createOffersType(POINT_TYPES[index]));

const createPoint = () => {
  const offersIdByType = getRandomElement(getOffersType()).offers.map((offer) => offer.id);
  return {
    id: nanoid(),
    destinationId: getRandomElement(getDestinations()).id,
    offerIds: Array.from({length: getRandomInt(0, offersIdByType.length)}).map(() => offersIdByType[getRandomInt(0, offersIdByType.length - 1)]),
    basePrice: getRandomInt(PRICE.MIN, PRICE.MAX),
    dateFrom: dayjs().add(getRandomInt(0, 3), 'day').add(getRandomInt(0, 12), 'hour').add(getRandomInt(-59, 0), 'minute'),
    dateTo: dayjs().add(getRandomInt(3, 6), 'day').add(getRandomInt(12, 23), 'hour').add(getRandomInt(0, 59), 'minute'),
    isFavorite: Boolean(getRandomInt()),
    type: getRandomElement(getOffersType()).type,
  };
};

const getPoints = () => Array.from({length: TOTAL_POINTS}).map(() => createPoint()).sort();

export {getPoints, getDestinations, getOffersType};
