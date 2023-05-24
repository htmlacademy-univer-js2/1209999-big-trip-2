import FormView from '../view/add-new-form.js';
import EditForm from '../view/edit-form.js';
import SortView from '../view/sort-view.js';
import RoutePoint from '../view/route-point.js';
import TripView from '../view/trip-view.js';
import { render } from '../render.js';

export default class TripEventsPresenter{
  constructor() {
    this.eventsList = new TripView();
  }

  init (tripContainer){
    this.tripContainer = tripContainer;

    render(new SortView(), this.tripContainer);
    render(this.eventsList, this.tripContainer);
    render(new EditForm(), this.eventsList.getElement());

    for(let i = 0; i<3; i++){
      render(new RoutePoint(), this.eventsList.getElement());
    }

    render(new FormView(), this.eventsList.getElement());
  }
}
