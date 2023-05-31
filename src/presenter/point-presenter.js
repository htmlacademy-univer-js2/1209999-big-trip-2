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
    const prevEditPointComponent = this.#editPointComponent;
    const prevPointComponent = this.#pointComponent;
    this.#point = point;

    this.#pointComponent = new PointView({
      favoriteClick: this.#handleFavoriteClick,
      offersByType: this.#offersByType,
      destinations: this.#destinations,
      editClick: this.#handleEditClick,
      point: point,
    });

    this.#editPointComponent = new EditPointView({
      closeClick: this.#handleCloseForm,
      offersByType: this.#offersByType,
      destinations: this.#destinations,
      saveClick: this.#handleSaveForm,
      point: point,
    });

    if (prevPointComponent === null && prevEditPointComponent === null) {
      render(this.#pointComponent, this.#pointsListContainer);
      return;
    }

    if (this.#mode === Mode.EDITING) {
      render(this.#editPointComponent, prevEditPointComponent);
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
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

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #replacePointToForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleSaveForm = () => {
    this.#replaceFormToPoint();
  };

  #handleCloseForm = () => {
    this.#replaceFormToPoint();
  };
}
