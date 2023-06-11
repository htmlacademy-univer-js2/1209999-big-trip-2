import ApiService from '../framework/api-service.js';
import {API_URLS} from '../const.js';

export default class OffersApi extends ApiService {
  get offers() {
    return this._load({url: API_URLS.OFFERS})
      .then(ApiService.parseResponse);
  }
}
