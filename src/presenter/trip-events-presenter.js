import EmptyPointsListView from '../view/empty-points-list-view';
import PointsListView from '../view/points-list-view';
import PointPresenter from './point-presenter';
import { SORTTYPE, SORTDATE } from '../const';
import { render } from '../framework/render';
import SortView from '../view/sort-view';
import { updateItem } from '../utils';

export default class Trip {
  #pointsListComponent = new PointsListView();
  #container = null;
  #sortComponent = null;
  #emptyPointsListComponent = null;
  #points = null;
  #destinations = null;
  #offersByType = null;
  #currentSortType = SORTTYPE.DAY;
  #pointPresenter = new Map();

  constructor(container, pointsModel) {
    this.#container = container;
    this.#points = pointsModel.points;
    this.#destinations = pointsModel.destinations;
    this.#offersByType = pointsModel.offersByType;
  }

  init() {
    if (this.#points.length === 0) {
      this.#renderEmptyPointsList();
    } else {
      this.#renderSort();
      this.#renderPointsList();
    }
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointsListComponent.element, this.#destinations, this.#offersByType, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPoints = () => {
    this.#points.forEach((point) => this.#renderPoint(point));
  };

  #renderEmptyPointsList = () => {
    if (this.#emptyPointsListComponent === null) {
      this.#emptyPointsListComponent = new EmptyPointsListView();
    }
    render(this.#emptyPointsListComponent, this.#container);
  };

  #renderPointsList = () => {
    render(this.#pointsListComponent, this.#container);
    this.#renderPoints();
  };

  #renderSort = () => {
    if (this.#sortComponent === null) {
      this.#sortComponent = new SortView(this.#handleSortButtonClick);
    }
    render(this.#sortComponent, this.#container);
  };

  #handleSortButtonClick = (sortType) => {
    if (sortType === this.#currentSortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #sortPoints = (sortType) => {
    this.#points.sort(SORTDATE[sortType]);
    this.#currentSortType = sortType;
  };

  #clearPointsList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };
}
