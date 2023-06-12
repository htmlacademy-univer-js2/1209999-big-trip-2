import {render, replace, remove} from '../framework/render.js';
import PreviewPointView from '../view/preview-point-view.js';
import PointView from '../view/point-view.js';
import {USER_ACTION, UPDATE_TYPE} from '../const.js';

const Mode = {
  PREVIEW: 'preview',
  EDITING: 'editing',
};

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
  #mode = Mode.PREVIEW;

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
      case Mode.PREVIEW:
        replace(this.#previewPointComponent, prevPreviewPointComponent);
        break;
      case Mode.EDITING:
        replace(this.#previewPointComponent, prevEditPointComponent);
        this.#mode = Mode.PREVIEW;
        break;
    }

    remove(prevPreviewPointComponent);
    remove(prevEditPointComponent);
  }

  destroy = () => {
    remove(this.#previewPointComponent);
    remove(this.#editPointComponent);
  };

  #replaceEditingPointToPreviewPoint = () => {
    replace(this.#previewPointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.PREVIEW;
  };

  #replacePreviewPointToEditingPoint = () => {
    replace(this.#editPointComponent, this.#previewPointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
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

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  #resetFormState = () => {
    this.#editPointComponent.updateElement({
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });
  };

  resetView = () => {
    if (this.#mode !== Mode.PREVIEW) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditingPointToPreviewPoint();
    }
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.PREVIEW) {
      this.#previewPointComponent.shake();
      return;
    }

    this.#editPointComponent.shake(this.#resetFormState);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.resetView();
    }
  };
}
