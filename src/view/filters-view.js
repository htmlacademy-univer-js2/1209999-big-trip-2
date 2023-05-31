import AbstractView from '../framework/view/abstract-view';
import relativeTime from 'dayjs/plugin/relativeTime';
import {isDateBefore} from '../utils';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

const createFiltersTemplate = (points) => {
  const today = dayjs();
  const isPastExist = points.filter((point) => isDateBefore(point.dateTo, today)).length !== 0;
  const isFutureExist = points.filter((point) => !isDateBefore(point.dateTo, today)).length !== 0;

  return `
  <form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${isFutureExist ? '' : 'disabled'}>
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${isPastExist ? '' : 'disabled'}>
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class FiltersView extends AbstractView {
  #points = null;

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createFiltersTemplate(this.#points);
  }
}