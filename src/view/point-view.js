import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import {BLANK_POINT} from '../const.js';
import 'flatpickr/dist/flatpickr.min.css';
import {createEditingPointTemplate} from '../templates/point-template.js';

export default class PointView extends AbstractStatefulView {
  #destinations;
  #offers;
  #isNewPoint;
  #offersByType;
  #datepickerFrom;
  #datepickerTo;

  constructor({point = BLANK_POINT, destinations, offers, isNewPoint}) {
    super();
    this._state = PointView.parsePointToState(point);
    this.#destinations = destinations;
    this.#offers = offers;
    this.#isNewPoint = isNewPoint;
    this.#offersByType = this.#offers.find((offer) => offer.type === this._state.type);
    this._restoreHandlers();
  }

  static parsePointToState = (point) => ({
    ...point,
    dateTo: dayjs(point.dateTo).toDate(),
    dateFrom: dayjs(point.dateFrom).toDate(),
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });

  static parseStateToPoint = (state) => {
    const point = {...state};
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  };

  setPreviewClickHandler = (callback) => {
    this._callback.previewClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#previewClickHandler);
  };

  setResetClickHandler = (callback) => {
    this._callback.resetClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formResetClickHandler);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#formSubmitHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setOuterHandlers();
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  };

  #pointDestinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destination = this.#destinations.find((dest) => dest.name === evt.target.value);
    if (!destination) {
      return;
    }
    this.updateElement({
      destination: destination.id,
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(PointView.parseStateToPoint(this._state));
  };

  #pointDateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #pointDateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #pointPriceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: Number(evt.target.value),
    });
  };

  #previewClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.previewClick();
  };

  #formResetClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.resetClick(PointView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this._state.offers = [];
    this.#offersByType = this.#offers.find((offer) => offer.type === evt.target.value);
    this.updateElement({
      type: evt.target.value,
    });
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    const offerId = Number(evt.target.id.slice(-1));
    const offers = this._state.offers.filter((offer) => offer !== offerId);
    let currentOffers = [...this._state.offers];
    if (offers.length !== this._state.offers.length) {
      currentOffers = offers;
    } else {
      currentOffers.push(offerId);
    }
    this._setState({
      offers: currentOffers,
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input').addEventListener('change', this.#pointDestinationChangeHandler);

    if (this.#offersByType && this.#offersByType.offers.length > 0) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersChangeHandler);
    }
    this.element.querySelector('.event__input--price').addEventListener('change', this.#pointPriceChangeHandler);
  };

  #setDatepickerFrom = () => {
    if (this._state.dateFrom) {
      this.#datepickerFrom = flatpickr(
        this.element.querySelector('#event-start-time-1'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateFrom,
          maxDate: this._state.dateTo,
          onChange: this.#pointDateFromChangeHandler,
        },
      );
    }
  };

  #setDatepickerTo = () => {
    if (this._state.dateTo) {
      this.#datepickerTo = flatpickr(
        this.element.querySelector('#event-end-time-1'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateTo,
          minDate: this._state.dateFrom,
          onChange: this.#pointDateToChangeHandler,
        },
      );
    }
  };

  #setOuterHandlers = () => {
    if (!this.#isNewPoint) {
      this.setPreviewClickHandler(this._callback.previewClick);
    }
    this.setResetClickHandler(this._callback.resetClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
  };

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  reset = (point) => {
    this.updateElement(
      PointView.parsePointToState(point),
    );
  };

  get template() {
    return createEditingPointTemplate(this._state, this.#destinations, this.#offers, this.#isNewPoint);
  }
}
