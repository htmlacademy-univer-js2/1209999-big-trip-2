import Observable from '../framework/observable.js';

export default class OffersModel extends Observable{
  #offersApi = null;
  #isSuccessfulLoading = false;
  #offers = [];

  constructor(offersApi) {
    super();
    this.#offersApi = offersApi;
  }

  init = async () => {
    try {
      this.#isSuccessfulLoading = true;
      this.#offers = await this.#offersApi.offers;
    } catch(err) {
      this.#isSuccessfulLoading = false;
      this.#offers = [];
    }
  };

  get offers() {
    return this.#offers;
  }

  get isSuccessfulLoading() {
    return this.#isSuccessfulLoading;
  }
}

