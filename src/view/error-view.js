import AbstractView from '../framework/view/abstract-view.js';

class ErrorView extends AbstractView {
  get template() {
    return `
      <p class="trip-events__msg">
        Sorry, there was an error loading the data
      </p>`;
  }
}

export default ErrorView;
