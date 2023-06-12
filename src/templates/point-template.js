import {POINT_TYPE, POINT_TYPE_DICTIONARY} from '../const.js';
import {createDate} from '../utils.js';
import he from 'he';

const renderOffers = (allOffers, checkedOffers, isDisabled) => allOffers.map((offer) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-luggage" ${checkedOffers.includes(offer.id) ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
    <label class="event__offer-label" for="event-offer-${offer.id}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`).join('');

const renderDestinationPictures = (pictures) => pictures.length === 0 ? '' :
  pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');

const renderOffersContainer = (allOffers, checkedOffers, isDisabled) => (!allOffers || allOffers.offers.length === 0) ? '' :
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${renderOffers(allOffers.offers, checkedOffers, isDisabled)}
    </div>
    </section>`;

const renderDestinationNames = (destinations) => destinations.length === 0 ? '' :
  destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');

const renderDestinationContainer = (destination) => {
  if (destination) {
    return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description !== null ? destination.description : ''}</p>
    <div class="event__photos-container">
                <div class="event__photos-tape">
                ${renderDestinationPictures(destination.pictures)}
                </div>
              </div>
  </section>`;
  }
  return '';
};

const renderResetButtonTemplate = (isNewPoint, isDisabled, isDeleting) => isNewPoint ? `<button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>Cancel</button>` : `<button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
  <button class="event__rollup-btn" type="button">`;

const renderEditingPointDateTemplate = (dateFrom, dateTo, isDisabled) => (
  `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${createDate(dateFrom)}" ${isDisabled ? 'disabled' : ''}>
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${createDate(dateTo)}" ${isDisabled ? 'disabled' : ''}>
  </div>`
);

const renderEditingPointTypeTemplate = (currentType, isDisabled) => Object.values(POINT_TYPE).map((type) => `<div class="event__type-item">
<input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
<label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${POINT_TYPE_DICTIONARY[type]}</label>
</div>`).join('');

export const createEditingPointTemplate = (point, destinations, allOffers, isNewPoint) => {
  const {basePrice, type, destination, dateFrom, dateTo, offers, isDisabled, isSaving, isDeleting} = point;
  const allPointTypeOffers = allOffers.find((offer) => offer.type === type);
  const destinationData = destinations.find((item) => item.id === destination);
  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event ${type} icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${renderEditingPointTypeTemplate(type, isDisabled)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${destination}">
          ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${destination}" type="text" name="event-destination" value="${destinationData ? he.encode(destinationData.name) : ''}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
          <datalist id="destination-list-1">
            ${renderDestinationNames(destinations)}
          </datalist>
        </div>

        ${renderEditingPointDateTemplate(dateFrom, dateTo, isDisabled)}

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
        ${renderResetButtonTemplate(isNewPoint, isDisabled, isDeleting)}
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${renderOffersContainer(allPointTypeOffers, offers, isDisabled)}
        ${renderDestinationContainer(destinationData)}
      </section>
    </form>
  </li>`
  );
};
