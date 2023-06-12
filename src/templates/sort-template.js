import {SORT_TYPE, SORT_TYPE_DICTIONARY} from '../const.js';

export const createSortingTemplate = (currentSortType) => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SORT_TYPE).map((sortType) => `
      <div class="trip-sort__item  trip-sort__item--${sortType}">
        <input ${currentSortType === sortType ? 'checked' : ''}
          data-sort-type=${sortType} id="sort-${sortType}"
          class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}"
          ${[SORT_TYPE.EVENT, SORT_TYPE.OFFER].includes(sortType) ? 'disabled' : ''}>
        <label class="trip-sort__btn" for="sort-${sortType}">${SORT_TYPE_DICTIONARY[sortType]}</label>
      </div>
    `).join('')}
  </form>`;
