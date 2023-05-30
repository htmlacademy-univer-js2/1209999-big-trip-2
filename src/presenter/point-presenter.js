import { render, replace, remove } from '../framework/render';
import EditPointView from '../view/edit-point-view';
import PointView from '../view/point-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointsListContainer = null;
  #editPointComponent = null;
  #mode = Mode.DEFAULT;
  #pointComponent = null;
  #destinations = null;
  #offersByType = null;
  #changeData = null;
  #changeMode = null;
  #point = null;

  constructor(container, destinations, offersByType, changeData, changeMode) {
    this.#pointsListContainer = container;
    this.#destinations = destinations;
    this.#offersByType = offersByType;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: point,
      offersByType: this.#offersByType,
      destinations: this.#destinations,
      editClick: this.#handleEditClick,
      favouriteClick: this.#handleFavouriteClick,
    });

    this.#editPointComponent = new EditPointView({
      point: point,
      offersByType: this.#offersByType,
      destinations: this.#destinations,
      closeClick: this.#handleCloseForm,
      saveClick: this.#handleSaveForm,
    });

    if (prevPointComponent === null && prevEditPointComponent === null) {
      render(this.#pointComponent, this.#pointsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      render(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #replacePointToForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleCloseForm = () => {
    this.#replaceFormToPoint();
  };

  #handleSaveForm = () => {
    this.#replaceFormToPoint();
  };

  #handleFavouriteClick = () => {
    this.#changeData({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };
}
