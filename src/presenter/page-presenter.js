import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import PointsListView from '../view/points-list-view.js';
import SortView from '../view/sort-view.js';
import EmptyPointsListView from '../view/empty-points-list-view.js';
import LoadingView from '../view/loading-view.js';
import ErrorView from '../view/error-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import TripPresenter from './trip-presenter.js';
import {UPDATE_TYPE, USER_ACTION, SORT_TYPE, FILTER_TYPE, BORDERS_TIME, SORT_DICT, FILTER} from '../const.js';
import {render, RenderPosition, remove} from '../framework/render.js';

export default class PagePresenter {
  #pointListComponent = new PointsListView();
  #loadingComponent = new LoadingView();
  #errorComponent = new ErrorView();
  #currentSortType = SORT_TYPE.DAY;
  #filterType = FILTER_TYPE.EVERYTHING;
  #pointPresenter = new Map();
  #tripInfoContainer;
  #tripContainer;
  #pointsModel;
  #filterModel;
  #destinationsModel;
  #offersModel;
  #emptyPointComponent;
  #pointNewPresenter;
  #tripInfoPresenter;
  #sortComponent;
  #isLoading = true;
  #uiBlocker = new UiBlocker(BORDERS_TIME.LOWER_LIMIT, BORDERS_TIME.UPPER_LIMIT);

  constructor({tripInfoContainer, tripContainer, pointsModel, filterModel, destinationsModel, offersModel}) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#pointNewPresenter = new NewPointPresenter({
      pointListContainer: this.#pointListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      changeData: this.#handleViewAction,
    });

    this.#destinationsModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderPage();
  }

  createPoint = (callback) => {
    this.#currentSortType = SORT_TYPE.DAY;
    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, FILTER_TYPE.EVERYTHING);
    if (this.#emptyPointComponent) {
      render(this.#pointListComponent, this.#tripContainer);
    }
    this.#pointNewPresenter.init(callback);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      changeData: this.#handleViewAction,
      changeMode: this.#handleModeChange,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
    });
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPage = ({resetSortType = false} = {}) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#emptyPointComponent) {
      remove(this.#emptyPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SORT_TYPE.DAY;
    }
  };

  #renderPage = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.#offersModel.offers.length === 0 || this.#offersModel.isLoaded === false || this.#destinationsModel.destinations.length === 0 || this.#destinationsModel.isLoaded === false || this.#pointsModel.isLoaded === false) {
      this.#renderError();
      return;
    }

    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderEmptyPoints();
      return;
    }
    this.#renderPointList(points);
    this.#renderSort();
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case USER_ACTION.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case USER_ACTION.ADD_POINT:
        this.#pointNewPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#pointNewPresenter.setAborting();
        }
        break;
      case USER_ACTION.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UPDATE_TYPE.MINOR:
        this.#clearPage();
        this.#clearTripInfo();
        this.#renderTripInfo();
        this.#renderPage();
        break;
      case UPDATE_TYPE.MAJOR:
        this.#clearPage({resetSortType: true});
        this.#renderPage();
        break;
      case UPDATE_TYPE.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderPage();
        this.#renderTripInfo();
        break;
    }
  };

  #renderError = () => {
    render(this.#errorComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderEmptyPoints = () => {
    this.#emptyPointComponent = new EmptyPointsListView(this.#filterType);
    render(this.#emptyPointComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPointList = (points) => {
    render(this.#pointListComponent, this.#tripContainer);
    this.#renderPoints(points);
  };

  #clearTripInfo = () => {
    this.#tripInfoPresenter.destroy();
  };

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = FILTER[this.#filterType](points);

    SORT_DICT[this.#currentSortType](filteredPoints);
    return filteredPoints;
  }

  #renderTripInfo = () => {
    this.#tripInfoPresenter = new TripPresenter(this.#tripInfoContainer, this.#destinationsModel, this.#offersModel);
    const sortedPoints = SORT_DICT[SORT_TYPE.DAY](this.points);
    this.#tripInfoPresenter.init(sortedPoints);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPage();
    this.#renderPage();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };
}


