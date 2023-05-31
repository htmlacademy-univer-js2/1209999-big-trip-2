import { createOffer } from './offer';
import { TRIP_TYPES } from '../const';
import { randomInt } from '../utils';

const createOffers = () => {
  const offers = [];
  for (let i = 0; i < randomInt(1, 4); i++) {
    offers.push(createOffer(i));
  }
  return offers;
};

export const createOfferByType = (i) => ({
  type: TRIP_TYPES[i],
  offers: createOffers(),
});
