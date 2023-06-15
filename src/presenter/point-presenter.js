import PreviewPointView from '../view/preview-point-view.js';
import PointView from '../view/point-view.js';
import {MODE, USER_ACTION, UPDATE_TYPE} from '../const.js';
import {render, replace, remove} from '../framework/render.js';

export default class PointPresenter {
  #pointListContainer;
  #previewPointComponent;
  #editPointComponent = null;
  #destinationsModel;
  #offersModel;
  #destinations;
  #offers;
  #changeData;
  #changeMode;
  #point;
  #mode = MODE.PREVIEW;

  constructor({pointListContainer, changeData, changeMode, destinationsModel, offersModel}) {
    this.#pointListContainer = pointListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init(point) {
    this.#point = point;
    this.#offers = [...this.#offersModel.offers];
    this.#destinations = [...this.#destinationsModel.destinations];

    const prevPreviewPointComponent = this.#previewPointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#editPointComponent = new PointView({
      point: point,
      destinations: this.#destinations,
      offers: this.#offers,
      isNewPoint: false
    });
    this.#previewPointComponent = new PreviewPointView(point, this.#destinations, this.#offers);

    this.#previewPointComponent.setEditClickHandler(this.#handleEditClick);
    this.#previewPointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#editPointComponent.setPreviewClickHandler(this.#handlePreviewClick);
    this.#editPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editPointComponent.setResetClickHandler(this.#handleResetClick);

    if (prevPreviewPointComponent === null || prevEditPointComponent === null) {
      render(this.#previewPointComponent, this.#pointListContainer);
      return;
    }

    switch (this.#mode) {
      case MODE.PREVIEW:
        replace(this.#previewPointComponent, prevPreviewPointComponent);
        break;
      case MODE.EDITING:
        replace(this.#previewPointComponent, prevEditPointComponent);
        this.#mode = MODE.PREVIEW;
        break;
    }

    remove(prevPreviewPointComponent);
    remove(prevEditPointComponent);
  }

  resetView = () => {
    if (this.#mode !== MODE.PREVIEW) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditingPointToPreviewPoint();
    }
  };

  setDeleting = () => {
    if (this.#mode === MODE.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setSaving = () => {
    if (this.#mode === MODE.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === MODE.PREVIEW) {
      this.#previewPointComponent.shake();
      return;
    }

    this.#editPointComponent.shake(this.#resetFormState);
  };

  #replaceEditingPointToPreviewPoint = () => {
    replace(this.#previewPointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = MODE.PREVIEW;
  };

  #replacePreviewPointToEditingPoint = () => {
    replace(this.#editPointComponent, this.#previewPointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = MODE.EDITING;
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      USER_ACTION.UPDATE_POINT,
      UPDATE_TYPE.MINOR,
      point,
    );
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      USER_ACTION.UPDATE_POINT,
      UPDATE_TYPE.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #handleResetClick = (point) => {
    this.#changeData(
      USER_ACTION.DELETE_POINT,
      UPDATE_TYPE.MINOR,
      point,
    );
  };

  #handleEditClick = () => {
    this.#replacePreviewPointToEditingPoint();
  };

  #handlePreviewClick = () => {
    this.resetView();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.resetView();
    }
  };

  #resetFormState = () => {
    this.#editPointComponent.updateElement({
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });
  };

  destroy = () => {
    remove(this.#previewPointComponent);
    remove(this.#editPointComponent);
  };
}
