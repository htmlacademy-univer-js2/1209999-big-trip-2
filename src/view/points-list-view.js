import AbstractView from '../framework/view/abstract-view.js';

class PointsListView extends AbstractView {
  get template() {
    return `
      <ul class="trip-events__list">
      </ul>`;
  }
}

export default PointsListView;
