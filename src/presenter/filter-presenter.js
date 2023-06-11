import { render, replace, remove } from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import { FILTER_TYPE, UPDATE_TYPE, FILTER } from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterComponent = null;

  constructor({filterContainer, pointsModel, destinationsModel, offersModel, filterModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
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
        type: FILTER_TYPE.PAST,
        name: FILTER_TYPE.PAST,
        count: FILTER[FILTER_TYPE.PAST](points).length,
      },
      {
        type: FILTER_TYPE.FUTURE,
        name: FILTER_TYPE.FUTURE,
        count: FILTER[FILTER_TYPE.FUTURE](points).length,
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FiltersView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    if (this.#offersModel.offers.length === 0 || this.#offersModel.isSuccessfulLoading === false ||
      this.#destinationsModel.destinations.length === 0 || this.#destinationsModel.isSuccessfulLoading === false ||
      this.#pointsModel.isSuccessfulLoading === false) {
      return;
    }
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, filterType);
  };
}
