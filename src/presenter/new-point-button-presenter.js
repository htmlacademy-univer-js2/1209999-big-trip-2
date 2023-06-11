import { render } from '../framework/render.js';
import NewPointButtonView from '../view/new-point-button-view.js';

export default class NewPointButtonPresenter {
  #newPointButtonComponent = null;
  #destinationsModel = null;
  #newPointButtonContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #boardPresenter = null;

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

  renderNewPointButton = () => {
    render(this.#newPointButtonComponent, this.#newPointButtonContainer);

    this.#newPointButtonComponent.setClickHandler(this.#handleNewPointButtonClick);

    if (this.#offersModel.offers.length === 0 || this.#offersModel.isSuccessfulLoading === false ||
      this.#destinationsModel.destinations.length === 0 || this.#destinationsModel.isSuccessfulLoading === false ||
      this.#pointsModel.isSuccessfulLoading === false) {
      this.#newPointButtonComponent.element.disabled = true;
    }
  };

  #handleNewPointFormClose = () => {
    this.#newPointButtonComponent.element.disabled = false;
  };

  #handleNewPointButtonClick = () => {
    this.#boardPresenter.createPoint(this.#handleNewPointFormClose);
    this.#newPointButtonComponent.element.disabled = true;
  };
}

