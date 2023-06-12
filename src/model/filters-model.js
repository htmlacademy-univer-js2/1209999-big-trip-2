import Observable from '../framework/observable.js';
import {FILTER_TYPE} from '../const.js';

export default class FiltersModel extends Observable {
  #filter = FILTER_TYPE.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter(updateFilter, filter) {
    this.#filter = filter;
    this._notify(updateFilter, filter);
  }
}
