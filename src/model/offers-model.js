import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #offersFromServer;
  #isLoaded = false;
  #offers = [];

  constructor(offersFromServer) {
    super();
    this.#offersFromServer = offersFromServer;
  }

  async init() {
    try {
      this.#isLoaded = true;
      this.#offers = await this.#offersFromServer.offers;
    } catch (err) {
      this.#isLoaded = false;
      this.#offers = [];
    }
  }

  get offers() {
    return this.#offers;
  }

  get isLoaded() {
    return this.#isLoaded;
  }
}
