import AbstractView from '../framework/view/abstract-view.js';

class LoadingView extends AbstractView {
  get template() {
    return `
      <p class="trip-events__msg">
        Loading...
      </p>`;
  }
}

export default LoadingView;
