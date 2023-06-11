import ApiService from '../framework/api-service.js';
// TODO: вынести {url: 'offers'} в константы

export default class OffersApiService extends ApiService {
  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }
}
