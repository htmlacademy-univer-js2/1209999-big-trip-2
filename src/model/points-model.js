import Observable from '../framework/observable.js';
import {UPDATE_TYPE} from '../const.js';

export default class PointsModel extends Observable {
  #pointsFromServer;
  #isLoaded = false;
  #points = [];

  constructor(pointsFromServer) {
    super();
    this.#pointsFromServer = pointsFromServer;
  }

  async init() {
    try {
      const points = await this.#pointsFromServer.points;
      this.#isLoaded = true;
      this.#points = points.map(this.#createPointFinalFormat);
    } catch (err) {
      this.#isLoaded = false;
      this.#points = [];
    }

    this._notify(UPDATE_TYPE.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#getPointIndexById(update.id);

    if (index === -1) {
      throw new Error('Oops can\'t update non-existent point');
    }

    try {
      const response = await this.#pointsFromServer.updatePoint(update);
      const updatedPoint = this.#createPointFinalFormat(response);
      this.#points[index] = updatedPoint;
      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Oops can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsFromServer.addPoint(update);
      const newPoint = this.#createPointFinalFormat(response);
      this.#points.unshift(newPoint);
      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error('Oops can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#getPointIndexById(update.id);

    if (index === -1) {
      throw new Error('Oops can\'t delete non-existent point');
    }

    try {
      await this.#pointsFromServer.deletePoint(update);
      this.#points.splice(index, 1);
      this._notify(updateType);
    } catch (err) {
      throw new Error('Oops can\'t delete point');
    }
  }

  #getPointIndexById(id) {
    return this.#points.findIndex((point) => point.id === id);
  }

  #createPointFinalFormat(point) {
    const {
      date_from: dateFrom,
      date_to: dateTo,
      base_price: basePrice,
      is_favorite: isFavorite,
      ...rest
    } = point;

    return {
      ...rest,
      dateFrom: (dateFrom !== null && dateFrom !== undefined) ? new Date(dateFrom) : dateFrom,
      dateTo: (dateTo !== null && dateTo !== undefined) ? new Date(dateTo) : dateTo,
      basePrice,
      isFavorite,
    };
  }

  get points() {
    return this.#points;
  }

  get isLoaded() {
    return this.#isLoaded;
  }
}
