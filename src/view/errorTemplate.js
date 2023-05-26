import AbstractView from '../framework/view/abstract-view';

function createError() {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export default class errorTemplate extends AbstractView {
  get template() {
    return createError();
  }
}
