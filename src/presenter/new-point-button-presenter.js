import NewPointButtonView from '../view/new-point-button-view.js';
import {render} from '../framework/render.js';

export default class NewPointButtonPresenter {
  #newPointButtonComponent;
  #destinationsModel;
  #newPointButtonContainer;
  #pointsModel;
  #offersModel;
  #boardPresenter;

  constructor({newPointButtonContainer, destinationsModel, pointsModel, offersModel, boardPresenter}) {
    this.#newPointButtonContainer = newPointButtonContainer;
    this.#destinationsModel = destinationsModel;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#boardPresenter = boardPresenter;
  }

  init() {
    this.#newPointButtonComponent = new NewPointButtonView();
  }

  renderNewPointButton() {
    render(this.#newPointButtonComponent, this.#newPointButtonContainer);

    this.#newPointButtonComponent.setClickHandler(this.#handleNewPointButtonClick.bind(this));

    if (
      this.#offersModel.offers.length === 0 ||
      this.#offersModel.isLoaded === false ||
      this.#destinationsModel.destinations.length === 0 ||
      this.#destinationsModel.isLoaded === false ||
      this.#pointsModel.isLoaded === false
    ) {
      this.#newPointButtonComponent.element.disabled = true;
    }
  }

  #handleNewPointFormClose() {
    this.#newPointButtonComponent.element.disabled = false;
  }

  #handleNewPointButtonClick() {
    this.#boardPresenter.createPoint(this.#handleNewPointFormClose.bind(this));
    this.#newPointButtonComponent.element.disabled = true;
  }
}
