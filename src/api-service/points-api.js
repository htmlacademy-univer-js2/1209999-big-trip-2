import ApiService from '../framework/api-service.js';
import {API_URLS, RESPONSE_METHOD} from '../const.js';

export default class PointsApi extends ApiService {
  get points() {
    return this._load({url: API_URLS.POINTS})
      .then(ApiService.parseResponse);
  }

  addPoint = async (point) => {
    const response = await this._load({
      url: API_URLS.POINTS,
      method: RESPONSE_METHOD.POST,
      body: JSON.stringify(this.#createPointFinalFormat(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  };

  async updatePoint(point) {
    const response = await this._load({
      url: `${API_URLS.POINTS}/${point.id}`,
      method: RESPONSE_METHOD.PUT,
      body: JSON.stringify(this.#createPointFinalFormat(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return await ApiService.parseResponse(response);
  }

  async deletePoint(point) {
    await this._load({
      url: `${API_URLS.POINTS}/${point.id}`,
      method: RESPONSE_METHOD.DELETE,
    });
  }

  #createPointFinalFormat(point) {
    const { dateFrom, dateTo, basePrice, isFavorite, ...rest } = point;

    return {
      ...rest,
      'date_from': dateFrom instanceof Date ? dateFrom.toISOString() : null,
      'date_to': dateTo instanceof Date ? dateTo.toISOString() : null,
      'base_price': basePrice,
      'is_favorite': isFavorite,
    };
  }
}
