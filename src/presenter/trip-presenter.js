import { render, remove } from '../framework/render.js';
import TripView from '../view/trip-view.js';

export default class TripPresenter {
  #tripInfoContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = null;
  #destinations = null;
  #offers = null;
  #tripInfoComponent = null;

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

