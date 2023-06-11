import { render, remove, RenderPosition } from '../framework/render.js';
import PointView from '../view/point-view.js';
import { USER_ACTION, UPDATE_TYPE } from '../const.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #changeData = null;
  #destinationsModel = null;
  #offersModel = null;
  #createPointComponent = null;
  #destroyCallback = null;
  #destinations = null;
  #offers = null;

  constructor({pointListContainer, changeData, destinationsModel, offersModel}) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#createPointComponent !== null) {
      return;
    }

    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];

    this.#createPointComponent = new PointView({
      destinations: this.#destinations,
      offers: this.#offers,
      isNewPoint: true
    });

    this.#createPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#createPointComponent.setResetClickHandler(this.#handleResetClick);

    render(this.#createPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#createPointComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#createPointComponent);
    this.#createPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  setSaving = () => {
    this.#createPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  #resetFormState = () => {
    this.#createPointComponent.updateElement({
      isDisabled: false,
      isDeleting: false,
      isSaving: false,
    });
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      USER_ACTION.ADD_POINT,
      UPDATE_TYPE.MINOR,
      point,
    );
  };

  #handleResetClick = () => {
    this.destroy();
  };

  setAborting = () => {
    this.#createPointComponent.shake(this.#resetFormState);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}

