import AbstractView from '../framework/view/abstract-view.js';
import {createPreviewPointTemplate} from '../templates/preview-point-template.js';

export default class PreviewPointView extends AbstractView {
  #point;
  #destination;
  #offers;

  constructor(point, destination, offers) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  get template() {
    return createPreviewPointTemplate(this.#point, this.#destination, this.#offers);
  }
}
