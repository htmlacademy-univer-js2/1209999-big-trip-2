import AbstractView from '../framework/view/abstract-view.js';

class NewPointButtonView extends AbstractView {
  get template() {
    return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
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
