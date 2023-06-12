import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, currentFilterType) => (
  `<div class="trip-filters__filter">
    <input id="filter-${filter.name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
${filter.type === currentFilterType ? 'checked' : ''} value="${filter.type}" ${filter.count === 0 ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter.name}">${filter.name}</label>
  </div>`
);

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

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
