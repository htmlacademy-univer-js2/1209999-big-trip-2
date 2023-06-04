import AbstractView from '../framework/view/abstract-view.js';
import { SORT_TYPE } from '../const';

const createSortingTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--${SORT_TYPE.DAY}">
      <input data-sort-type=${SORT_TYPE.DAY} id="sort-${SORT_TYPE.DAY}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SORT_TYPE.DAY}" checked>
      <label class="trip-sort__btn" for="sort-${SORT_TYPE.DAY}">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--${SORT_TYPE.EVENT}">
      <input data-sort-type=${SORT_TYPE.EVENT} id="sort-${SORT_TYPE.EVENT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SORT_TYPE.EVENT}" disabled>
      <label class="trip-sort__btn" for="sort-${SORT_TYPE.EVENT}">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--${SORT_TYPE.TIME}">
      <input data-sort-type=${SORT_TYPE.TIME} id="sort-${SORT_TYPE.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SORT_TYPE.TIME}">
      <label class="trip-sort__btn" for="sort-${SORT_TYPE.TIME}">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--${SORT_TYPE.PRICE}">
      <input data-sort-type=${SORT_TYPE.PRICE} id="sort-${SORT_TYPE.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SORT_TYPE.PRICE}">
      <label class="trip-sort__btn" for="sort-${SORT_TYPE.PRICE}">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--${SORT_TYPE.OFFER}">
      <input data-sort-type=${SORT_TYPE.OFFER} id="sort-${SORT_TYPE.OFFER}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SORT_TYPE.OFFER}" disabled>
      <label class="trip-sort__btn" for="sort-${SORT_TYPE.OFFER}">Offers</label>
    </div>
  </form>`
);

export default class SortView extends AbstractView {
  get template() {
    return createSortingTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
