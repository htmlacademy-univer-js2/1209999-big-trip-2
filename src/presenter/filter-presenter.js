import {render, replace, remove} from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import {FILTER_TYPE, UPDATE_TYPE, FILTER} from '../const.js';

export default class FilterPresenter {
  #filterContainer;
  #destinationsModel;
  #filterModel;
  #pointsModel;
  #offersModel;
  #filterComponent = null;

  constructor({filterContainer, pointsModel, destinationsModel, offersModel, filterModel}) {
    this.#filterContainer = filterContainer;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#pointsModel.addObserver(this.#handleModelEvent.bind(this));
    this.#filterModel.addObserver(this.#handleModelEvent.bind(this));
  }

  get filters() {
    const points = this.#pointsModel.points;

    return [
      {
        type: FILTER_TYPE.EVERYTHING,
        name: FILTER_TYPE.EVERYTHING,
        count: FILTER[FILTER_TYPE.EVERYTHING](points).length,
      },
      {
        type: FILTER_TYPE.FUTURE,
        name: FILTER_TYPE.FUTURE,
        count: FILTER[FILTER_TYPE.FUTURE](points).length,
      },
      {
        type: FILTER_TYPE.PAST,
        name: FILTER_TYPE.PAST,
        count: FILTER[FILTER_TYPE.PAST](points).length,
      },
    ];
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new FiltersView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange.bind(this));

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleFilterTypeChange(filterType) {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, filterType);
  }

  #handleModelEvent() {
    if (
      this.#offersModel.offers.length === 0 ||
      this.#offersModel.isLoaded === false ||
      this.#destinationsModel.destinations.length === 0 ||
      this.#destinationsModel.isLoaded === false ||
      this.#pointsModel.isLoaded === false
    ) {
      return;
    }

    this.init();
  }
}
