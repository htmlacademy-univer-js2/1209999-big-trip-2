import ApiService from '../framework/api-service.js';
// TODO: вынести {url: 'destinations'} в константы
export default class DestinationsApiService extends ApiService {
  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }
}
