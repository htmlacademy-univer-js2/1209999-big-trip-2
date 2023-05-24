import FilterView from './view/filter-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/point-model.js';
import { getPoints, getDestinations, getOffersByType } from './mock/point.js';

const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = document.querySelector('.trip-main');
const boardPresenter = new BoardPresenter(siteMainElement.querySelector('.trip-events'));
const points = getPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

const pointsModel = new PointsModel();

render(new FilterView(), siteHeaderElement.querySelector('.trip-controls__filters'));

pointsModel.init(points, destinations, offersByType);
boardPresenter.init(pointsModel);
=======
import TripEventsPresenter from './presenter/events-presenter.js';
import { render } from './render.js';

const siteHeader = document.querySelector('.trip-main');
const siteMain = document.querySelector('.page-main');
const tripPresenter = new TripEventsPresenter();

render(new FilterView(), siteHeader.querySelector('.trip-controls__filters'));

tripPresenter.init(siteMain.querySelector('.trip-events'));
