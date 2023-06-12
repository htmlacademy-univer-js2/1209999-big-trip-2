import AbstractView from '../framework/view/abstract-view.js';
import {formatDateToDDMMM} from '../utils.js';

const renderRouteTrip = (points, destinations) => {
  if (points.length === 0) {
    return '';
  }

  const routeWithoutRepeats = points.map((point) => point.destination);
  const uniqueDestinations = [...new Set(routeWithoutRepeats)];

  if (uniqueDestinations.length > 3) {
    const startPoint = destinations.find((item) => item.id === uniqueDestinations[0]);
    const endPoint = destinations.find((item) => item.id === uniqueDestinations[uniqueDestinations.length - 1]);
    return `${startPoint.name} &mdash; ... &mdash; ${endPoint.name}`;
  }

  const routeNames = uniqueDestinations.map((destination) => destinations.find((item) => item.id === destination).name);
  return routeNames.join(' &mdash; ');
};

const renderDatesTrip = (points) => {
  if (points.length === 0) {
    return '';
  }

  const startDate = points[0].dateFrom !== null ? formatDateToDDMMM(points[0].dateFrom) : '';
  const endDate = points[points.length - 1].dateTo !== null ? formatDateToDDMMM(points[points.length - 1].dateTo) : '';
  return `${startDate}&nbsp;&mdash;&nbsp;${endDate}`;
};

const getPricePointOffers = (point, offers) => {
  if (offers.length === 0) {
    return 0;
  }

  const offersByType = offers.find((offer) => offer.type === point.type);
  const pointOffers = point.offers;
  let pricePointOffers = 0;

  pointOffers.forEach((offer) => {
    const offerPrice = offersByType.offers.find((item) => item.id === offer).price;
    pricePointOffers += offerPrice;
  });

  return pricePointOffers;
};

const renderTotalPriceTrip = (points, offers) => {
  if (points.length === 0) {
    return '';
  }

  let totalPrice = 0;

  points.forEach((point) => {
    totalPrice += point.basePrice;
    totalPrice += getPricePointOffers(point, offers);
  });

  return `Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>`;
};

const createTripInfoTemplate = (points, destinations, offers) => {
  if (destinations.length === 0 || offers.length === 0) {
    return '';
  }

  const route = renderRouteTrip(points, destinations);
  const dates = renderDatesTrip(points);
  const totalPrice = renderTotalPriceTrip(points, offers);

  return `<div class="trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>
      <p class="trip-info__dates">${dates}</p>
    </div>
    <p class="trip-info__cost">
      ${totalPrice}
    </p>
  </div>`;
};


export default class TripView extends AbstractView {
  #points;
  #destinations;
  #offers;

  constructor(points, destinations, offers) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}

