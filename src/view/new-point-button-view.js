import AbstractView from '../framework/view/abstract-view.js';
import {newPointButtonTemplate} from '../templates/new-point-button-template.js';

class NewPointButtonView extends AbstractView {
  get template() {
    return newPointButtonTemplate;
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler.bind(this));
  }

  #clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
}

export default NewPointButtonView;
