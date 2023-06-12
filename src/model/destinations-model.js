import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {
  #destinationsFromServer;
  #isLoaded = false;
  #destinations = [];

  constructor(destinationsFromServer) {
    super();
    this.#destinationsFromServer = destinationsFromServer;
  }

  async init() {
    try {
      this.#isLoaded = true;
      this.#destinations = await this.#destinationsFromServer.destinations;
    } catch (err) {
      this.#isLoaded = false;
      this.#destinations = [];
    }
  }

  get destinations() {
    return this.#destinations;
  }

  get isLoaded() {
    return this.#isLoaded;
  }
}
