import FiltersView from './view/filters-view.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import MenuView from './view/menu-view.js';
import PointsModel from './model/points-model.js';
import { getPoints, getDestinations, getOffersType } from './mock/point.js';
import { render } from './framework/render.js';
import { createFilter } from './mock/filter.js';

const headerElement = document.querySelector('.trip-main');
const mainElement = document.querySelector('.page-main');

const initApp = async () => {
  const points = await getPoints();
  const offersType = await getOffersType();
  const destinations = await getDestinations();

  const pointsModel = new PointsModel();
  pointsModel.init(points, offersType, destinations);

  const boardPresenter = new TripEventsPresenter(
    mainElement.querySelector('.trip-events'),
    pointsModel
  );
  boardPresenter.init();

  const filters = createFilter(pointsModel.points);

  render(new FiltersView({ filters }), headerElement.querySelector('.trip-controls__filters'));
  render(new MenuView(), headerElement.querySelector('.trip-controls__navigation'));
};

initApp();
