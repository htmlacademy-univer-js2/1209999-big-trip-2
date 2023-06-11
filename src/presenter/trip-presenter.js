import { render, remove } from '../framework/render.js';
import TripView from '../view/trip-view.js';

export default class TripPresenter {
  #points = null;
  #tripInfoComponent = null;
  #tripInfoContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #destinations = null;
  #offers = null;

  constructor(tripInfoContainer, destinationsModel, offersModel) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init = (points) => {
    this.#points = points;
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];

    this.#tripInfoComponent = new TripView(this.#points, this.#destinations, this.#offers);

    render(this.#tripInfoComponent, this.#tripInfoContainer);
  };

  destroy = () => {
    remove(this.#tripInfoComponent);
  };
}

