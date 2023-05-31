const DESCRIPTIONS = [
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
];

const SORTDATE = {
  DAY: (firstPoint, secondPoint) => firstPoint.dateFrom.diff(secondPoint.dateFrom),
  TIME: (firstPoint, secondPoint) => secondPoint.dateFrom.diff(secondPoint.dateTo) - firstPoint.dateFrom.diff(firstPoint.dateTo),
  PRICE: (firstPoint, secondPoint) => firstPoint.basePrice - secondPoint.basePrice,
};

const TITLES_OFFER = [
  'Book a place in the recreation area',
  'Upgrade to a business class',
  'Use the translator service',
  'Add a child safety seat',
  'Add a place for a pet',
  'Book a window seat',
  'Rent a polaroid',
  'Stay overnight',
  'Add lunch',
];

const COUNTRIES = [
  'Russia',
  'Germany',
  'France',
  'UK',
  'Mexico',
  'USA',
];

const TRIP_TYPES = [
  'taxi',
  'bus',
  'check-in',
  'restaurant',
  'sightseeing',
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
