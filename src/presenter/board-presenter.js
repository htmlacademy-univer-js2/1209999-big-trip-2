import EditFormView from '../view/edit-form-view.js';
import EventsView from '../view/events-view.js';
import SortView from '../view/sort-view.js';
import PreviewPointView from '../view/preview-point-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  #boardComponent = null;
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = null;
  #destinations = null;
  #offers = null;

  constructor(boardContainer) {
    this.#boardComponent = new EventsView();
    this.#boardContainer = boardContainer;
  }

  init(pointsModel) {
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    render(new SortView(), this.#boardContainer);
    render(this.#boardComponent, this.#boardContainer);

    for (const point of this.#boardPoints){
      this.#renderPoint(point);
    }
  }

  #renderPoint = (point) => {
    const pointComponent = new PreviewPointView(point, this.#destinations, this.#offers);
    const pointEditComponent = new EditFormView(point, this.#destinations, this.#offers);

    const replacePointToEditForm = () => {
      this.#boardComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceEditFormToPoint = () => {
      this.#boardComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#boardComponent.element);
  };
}
