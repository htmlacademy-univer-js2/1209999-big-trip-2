import AbstractView from '../framework/view/abstract-view.js';
import {EMPTY_POINTS_TEXT} from '../const.js';
import {emptyPointsTemplate} from '../templates/empty-points-list-template.js';

class EmptyPointsListView extends AbstractView {
  #filterType;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    const emptyPointTextValue = EMPTY_POINTS_TEXT[this.#filterType];

    return emptyPointsTemplate(emptyPointTextValue);
  }
}

export default EmptyPointsListView;

