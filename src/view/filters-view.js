import AbstractView from '../framework/view/abstract-view.js';
import {createFilterTemplate} from '../templates/filter-template.js';

export default class FiltersView extends AbstractView {
  #currentFilter;
  #filters;

  constructor(filters, currentFilterType) {
    super();
    this.#currentFilter = currentFilterType;
    this.#filters = filters;
    this.setFilterTypeChangeHandler = this.setFilterTypeChangeHandler.bind(this);
    this.#changeFilterHandler = this.#changeFilterHandler.bind(this);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.changeFilter = callback;
    this.element.addEventListener('change', this.#changeFilterHandler);
  };

  #changeFilterHandler = (evt) => {
    evt.preventDefault();
    this._callback.changeFilter(evt.target.value);
  };

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }
}
