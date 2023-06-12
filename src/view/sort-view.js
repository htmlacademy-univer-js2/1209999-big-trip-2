import AbstractView from '../framework/view/abstract-view.js';
import {createSortingTemplate} from '../templates/sort-template.js';

export default class SortView extends AbstractView {
  #currentSortType;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };

  get template() {
    return createSortingTemplate(this.#currentSortType);
  }
}
