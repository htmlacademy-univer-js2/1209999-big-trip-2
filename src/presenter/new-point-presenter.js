import {render, remove, RenderPosition} from '../framework/render.js';
import PointView from '../view/point-view.js';
import {USER_ACTION, UPDATE_TYPE} from '../const.js';

export default class NewPointPresenter {
  #pointListContainer;
  #changeData;
  #destinationsModel;
  #offersModel;
  #createPointComponent = null;
  #destroyCallback;
  #destinations;
  #offers = null;

  constructor({pointListContainer, changeData, destinationsModel, offersModel}) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init(callback) {
    this.#destroyCallback = callback;

    if (this.#createPointComponent !== null) {
      return;
    }

    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];

    this.#createPointComponent = new PointView({
      destinations: this.#destinations,
      offers: this.#offers,
      isNewPoint: true,
    });

    this.#createPointComponent.setFormSubmitHandler(this.#handleFormSubmit.bind(this));
    this.#createPointComponent.setResetClickHandler(this.#handleResetClick.bind(this));

    render(this.#createPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler.bind(this));
  }

  destroy() {
    if (this.#createPointComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#createPointComponent);
    this.#createPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler.bind(this));
  }

  #resetFormState() {
    this.#createPointComponent.updateElement({
      isDisabled: false,
      isDeleting: false,
      isSaving: false,
    });
  }

  #handleFormSubmit(point) {
    this.#changeData(USER_ACTION.ADD_POINT, UPDATE_TYPE.MINOR, point);
  }

  #escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  #handleResetClick() {
    this.destroy();
  }

  setAborting() {
    this.#createPointComponent.shake(this.#resetFormState.bind(this));
  }

  setSaving() {
    this.#createPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }
}
