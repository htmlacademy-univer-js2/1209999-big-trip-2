import EditFormView from '../view/edit-form-view.js';
import EventsView from '../view/events-view.js';
import SortView from '../view/sort-view.js';
import PreviewPointView from '../view/preview-point-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  constructor(boardContainer) {
    this.boardComponent = new EventsView();
    this.boardContainer = boardContainer;
  }

  init(pointsModel) {
    this.pointsModel = pointsModel;
    this.boardPoints = [...this.pointsModel.getPoints()];
    this.destinations = [...this.pointsModel.getDestinations()];
    this.offers = [...this.pointsModel.getOffers()];

    render(new SortView(), this.boardContainer);
    render(this.boardComponent, this.boardContainer);
    render(new EditFormView(this.boardPoints[0], this.destinations, this.offers), this.boardComponent.getElement());

    for (const point of this.boardPoints){
      render(new PreviewPointView(point, this.destinations, this.offers), this.boardComponent.getElement());
    }
  }
}
