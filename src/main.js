import PointsApiService from './api-service/points-api-service.js';
import DestinationsApiService from './api-service/destinations-api-service.js';
import OffersApiService from './api-service/offers-api-service.js';
import NewPointButtonPresenter from './presenter/new-point-button-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PagePresenter from './presenter/page-presenter.js';
import DestinationsModel from './model/destinations-model.js';
import FiltersModel from './model/filters-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/points-model.js';
import MenuView from './view/menu-view.js';
import {render} from './framework/render.js';
import {SERVER_URL, AUTHORIZATION} from './const.js';

const mainPage = document.querySelector('.page-main');
const header = document.querySelector('.trip-main');

const destinationsModel = new DestinationsModel(new DestinationsApiService(SERVER_URL, AUTHORIZATION));
const pointsModel = new PointsModel(new PointsApiService(SERVER_URL, AUTHORIZATION));
const offersModel = new OffersModel(new OffersApiService(SERVER_URL, AUTHORIZATION));
const filterModel = new FiltersModel();

const boardPresenter = new PagePresenter({
  pointsModel: pointsModel,
  destinationsModel: destinationsModel,
  filterModel: filterModel,
  tripInfoContainer: header.querySelector('.trip-main__trip-info'),
  tripContainer: mainPage.querySelector('.trip-events'),
  offersModel: offersModel
});
boardPresenter.init();

const newPointButtonPresenter = new NewPointButtonPresenter({
  offersModel: offersModel,
  newPointButtonContainer: header,
  pointsModel: pointsModel,
  destinationsModel: destinationsModel,
  boardPresenter: boardPresenter
});
newPointButtonPresenter.init();

const filterPresenter = new FilterPresenter({
  offersModel: offersModel,
  destinationsModel: destinationsModel,
  filterModel: filterModel,
  filterContainer: header.querySelector('.trip-controls__filters'),
  pointsModel: pointsModel,
});
filterPresenter.init();

offersModel.init().finally(() => {
  destinationsModel.init().finally(() => {
    pointsModel.init().finally(() => {
      newPointButtonPresenter.renderNewPointButton();
    });
  });
});

render(new MenuView(), header.querySelector('.trip-controls__navigation'));
