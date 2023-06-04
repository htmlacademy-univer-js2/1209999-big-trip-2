import EmptyPointsListView from '../view/empty-points-list-view.js';
import PointsListView from '../view/points-list-view.js';
import PointPresenter from './point-presenter.js';
import SortView from '../view/sort-view.js';
import { render, RenderPosition } from '../framework/render.js';
import { updateItem } from '../utils';
import { SORT_TYPE, SORT_DICT } from '../const';

export default class TripEventsPresenter {
  #emptyPointComponent = new EmptyPointsListView();
  #sortComponent = new SortView();
  #pointListComponent = new PointsListView();
  #pointPresenter = new Map();
  #selectedTypeOfSort = SORT_TYPE.DAY;
  #previousPoints = [];
  #tripContainer = null;
  #pointsModel = null;
  #pointsList = null;

  constructor(tripContainer, pointsModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#pointsList = [...this.#pointsModel.points];
    this.#previousPoints = [...this.#pointsModel.points];

    if (this.#pointsList.length === 0) {
      this.#renderEmptyPoints();
    } else {
      this.#renderSort();
      this.#renderPointList();
    }
  }

  #sortPoint = (sortType) => {
    SORT_DICT[sortType](this.#pointsList);
    this.#selectedTypeOfSort = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#selectedTypeOfSort === sortType) {
      return;
    }

    this.#sortPoint(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderSort = () => {
    SORT_DICT[SORT_TYPE.DAY](this.#pointsList);
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointsList = updateItem(this.#pointsList, updatedPoint);
    this.#previousPoints = updateItem(this.#previousPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#pointsModel, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderEmptyPoints = () => {
    render(this.#emptyPointComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPoints = (from, to) => {
    this.#pointsList
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point));
  };

  #renderPointList = () => {
    render(this.#pointListComponent, this.#tripContainer);
    this.#renderPoints(0, this.#pointsList.length);
  };
}


