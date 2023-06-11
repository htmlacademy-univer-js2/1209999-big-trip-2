import ApiService from '../framework/api-service.js';
import {API_URLS, RESPONSE_METHOD} from '../const.js';

export default class PointsApi extends ApiService {
  get points() {
    return this._load({url: API_URLS.POINTS})
      .then(ApiService.parseResponse);
  }

  addPoint = async (point) => {
    const response = await this._load({
      headers: new Headers({'Content-Type': 'application/json'}),
      url: API_URLS.POINTS,
      body: JSON.stringify(this.#createPointFinalFormat(point)),
      method: RESPONSE_METHOD.POST,
    });

    return await ApiService.parseResponse(response);
  };

  updatePoint = async (point) => {
    const response = await this._load({
      headers: new Headers({'Content-Type': 'application/json'}),
      url: `${API_URLS.POINTS}/${point.id}`,
      body: JSON.stringify(this.#createPointFinalFormat(point)),
      method: RESPONSE_METHOD.PUT,
    });

    return await ApiService.parseResponse(response);
  };

  deletePoint = async (point) => await this._load({
    url: `${API_URLS.POINTS}/${point.id}`,
    method: RESPONSE_METHOD.DELETE,
  });

  #createPointFinalFormat = (point) => {
    const finalFormatPoint = {...point,
      'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null,
      'date_to': point.dateTo instanceof Date ? point.dateTo.toISOString() : null,
      'base_price': point.basePrice,
      'is_favorite': point.isFavorite,
    };

    delete finalFormatPoint.dateFrom;
    delete finalFormatPoint.dateTo;
    delete finalFormatPoint.basePrice;
    delete finalFormatPoint.isFavorite;

    return finalFormatPoint;
  };
}
