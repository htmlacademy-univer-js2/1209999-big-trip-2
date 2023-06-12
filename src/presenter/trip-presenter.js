import {render, remove} from '../framework/render.js';
import TripView from '../view/trip-view.js';

export default class TripPresenter {
  #destinationsContainer;
  #destinationsModel;
  #offersModel;
  #points;
  #destinations;
  #offers;
  #destinationsComponent;

  constructor(destinationsContainer, destinationsModel, offersModel) {
    this.#destinationsContainer = destinationsContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init = (points) => {
    this.#points = points;
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];
    this.#destinationsComponent = new TripView(this.#points, this.#destinations, this.#offers);

    render(this.#destinationsComponent, this.#destinationsContainer);
  };

  destroy = () => {
    remove(this.#destinationsComponent);
  };
}

