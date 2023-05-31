import {createOfferByType} from '../mock/offers-by-type';
import {createDestination} from '../mock/destination';
import {createPoint} from '../mock/point';

export default class PointModel {
  #offersByType = null;
  #destinations = null;
  #points = null;

  constructor() {
    this.#offersByType = [];
    this.#destinations = [];
    this.#points = [];

    for (let i = 0; i < 4; i++) {
      this.#points.push(createPoint(i));
    }

    for (let i = 0; i < 10; i++) {
      this.#destinations.push(createDestination(i));
    }
    for (let i = 0; i < 9; i++) {
      this.#offersByType.push(createOfferByType(i));
    }
  }

  get destinations() {
    return this.#destinations;
  }

  get offersByType() {
    return this.#offersByType;
  }

  get points() {
    return this.#points;
  }
}
