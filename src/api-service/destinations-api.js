import ApiService from '../framework/api-service.js';
import {API_URLS} from '../const.js';

export default class DestinationsApi extends ApiService {
  get destinations() {
    return this._load({url: API_URLS.DESTINATIONS})
      .then(ApiService.parseResponse);
  }
}
