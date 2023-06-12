import AbstractView from '../framework/view/abstract-view.js';
import {FILTER_TYPE} from '../const.js';

const NoPointsTextType = {
  [FILTER_TYPE.EVERYTHING]: 'Click New Event to create your first point',
  [FILTER_TYPE.PAST]: 'There are no past events now',
  [FILTER_TYPE.FUTURE]: 'There are no future events now',
};

class EmptyPointsListView extends AbstractView {
  #filterType;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    const emptyPointTextValue = NoPointsTextType[this.#filterType];

    return `
      <p class="trip-events__msg">
        ${emptyPointTextValue}
      </p>`;
  }
}

export default EmptyPointsListView;

