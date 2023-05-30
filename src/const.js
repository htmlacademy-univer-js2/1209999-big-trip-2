const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.'
];

const SORTDATE = {
  DAY: (firstPoint, secondPoint) => firstPoint.dateFrom.diff(secondPoint.dateFrom),
  TIME: (firstPoint, secondPoint) => secondPoint.dateFrom.diff(secondPoint.dateTo) - firstPoint.dateFrom.diff(firstPoint.dateTo),
  PRICE: (firstPoint, secondPoint) => firstPoint.basePrice - secondPoint.basePrice,
};

const TITLES_OFFER = [
  'Add a child safety seat',
  'Stay overnight',
  'Add lunch',
  'Rent a polaroid',
  'Add a place for a pet',
  'Book a window seat',
  'Book a place in the recreation area',
  'Use the translator service',
  'Upgrade to a business class'
];

const COUNTRIES = [
  'Moscow',
  'Berlin',
  'London',
  'Paris',
  'Rome',
  'Madrid',
];

const TRIP_TYPES = [
  'taxi',
  'bus',
  'train',
  'drive',
  'flight',
  'ship',
];

const SORTTYPE = {
  DAY: 'DAY',
  TIME: 'TIME',
  PRICE: 'PRICE',
};

const IMAGE_REFERENCE = 'http://picsum.photos/248/152?r=';

const DAYTYPES = ['d', 'h'];

export {
  DAYTYPES,
  COUNTRIES,
  IMAGE_REFERENCE,
  TITLES_OFFER,
  DESCRIPTIONS,
  TRIP_TYPES,
  SORTTYPE,
  SORTDATE,
};
