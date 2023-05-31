import { TITLES_OFFER } from '../const';
import { randomInt } from '../utils';

export const createOffer = (id) => ({
  id: id,
  title: TITLES_OFFER[randomInt(0, TITLES_OFFER.length - 1)],
  price: randomInt(10, 100),
});
