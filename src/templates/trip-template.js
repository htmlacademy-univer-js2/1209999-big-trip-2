export const tripTemplate = (route, dates, totalPrice) => `<div class="trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>
      <p class="trip-info__dates">${dates}</p>
    </div>
    <p class="trip-info__cost">
      ${totalPrice}
    </p>
  </div>`;

export const tripInfoTemplate = (totalPrice) => `Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>`;

export const dateTemplate = (startDate, endDate) => `${startDate}&nbsp;&mdash;&nbsp;${endDate}`;

export const destinationsTemplate = (startPoint, endPoint) => `${startPoint.name} &mdash; ... &mdash; ${endPoint.name}`;
