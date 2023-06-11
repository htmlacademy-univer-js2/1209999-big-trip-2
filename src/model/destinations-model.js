import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {
  #destinationsApi = null;
  #isSuccessfulLoading = false;
  #destinations = [];

  constructor(destinationsApi) {
    super();
    this.#destinationsApi = destinationsApi;
  }

  async init() {
    try {
      this.#isSuccessfulLoading = true;
      this.#destinations = await this.#destinationsApi.destinations;
    } catch (err) {
      this.#isSuccessfulLoading = false;
      this.#destinations = [];
    }
  }

  get destinations() {
    return this.#destinations;
  }

  get isSuccessfulLoading() {
    return this.#isSuccessfulLoading;
  }
}
