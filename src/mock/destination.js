import { COUNTRIES, DESCRIPTIONS, IMAGE_REFERENCE } from '../const';
import { randomInt } from '../utils';

export const createDestination = (id) => ({
  id: id,
  description: DESCRIPTIONS[randomInt(0, DESCRIPTIONS.length - 1)],
  name: COUNTRIES[randomInt(0, COUNTRIES.length - 1)],
  pictures: [
    {
      src: `${IMAGE_REFERENCE}${randomInt(0, 100)}`,
      description: DESCRIPTIONS[randomInt(0, DESCRIPTIONS.length - 1)],
    },
  ],
});
