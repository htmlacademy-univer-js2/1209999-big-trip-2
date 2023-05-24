import CreateFormView from '../view/create-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import EventsView from '../view/events-view.js';
import WayPointView from '../view/way-point-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

export default class TripEventsPresenter {
  constructor() {
    this.boardComponent = new EventsView();
  }

  init (tripContainer) {
    this.tripContainer = tripContainer;

    render(new SortView(), this.tripContainer);
    render(this.boardComponent, this.tripContainer);
    render(new EditFormView(), this.boardComponent.getElement());

    for (let i = 0; i < 3; i++){
      render(new WayPointView(), this.boardComponent.getElement());
    }

    render(new CreateFormView(), this.boardComponent.getElement());
  }
}
