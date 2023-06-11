import Observable from '../framework/observable.js';
import { UPDATE_TYPE } from '../const.js';

export default class PointsModel extends Observable{
  #pointsApi = null;
  #isSuccessfulLoading = false;
  #points = [];

  constructor(pointsApi) {
    super();
    this.#pointsApi = pointsApi;
  }

  init = async () => {
    try {
      const points = await this.#pointsApi.points;
      this.#isSuccessfulLoading = true;
      this.#points = points.map(this.#createPointFinalFormat);
    } catch(err) {
      this.#isSuccessfulLoading = false;
      this.#points = [];
    }

    this._notify(UPDATE_TYPE.INIT);
  };

  get points() {
    return this.#points;
  }

  get isSuccessfulLoading() {
    return this.#isSuccessfulLoading;
  }

  updatePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Oops can\'t update non - existent point');
    }

    try {
      const response = await this.#pointsApi.updatePoint(update);
      const updatedPoint = this.#createPointFinalFormat(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Oops can\'t update point');
    }
  };

  addPoint = async (updateType, update) => {
    try {
      const response = await this.#pointsApi.addPoint(update);
      const newPoint = this.#createPointFinalFormat(response);
      this.#points.unshift(newPoint);
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Oops can\'t add point');
    }
  };

  deletePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Oops can\'t delete non - existent point');
    }

    try {
      await this.#pointsApi.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Oops can\'t delete point');
    }
  };

  #createPointFinalFormat = (point) => {
    const finalFormatPoint = {...point,
      dateFrom: (point['date_from'] !== null || point['date_from'] !== undefined) ? new Date(point['date_from']) : point['date_from'],
      dateTo: (point['date_to'] !== null || point['date_to'] !== undefined) ? new Date(point['date_to']) : point['date_to'],
      basePrice: point['base_price'],
      isFavorite: point['is_favorite'],
    };

    delete finalFormatPoint['date_from'];
    delete finalFormatPoint['date_to'];
    delete finalFormatPoint['base_price'];
    delete finalFormatPoint['is_favorite'];

    return finalFormatPoint;
  };
}
