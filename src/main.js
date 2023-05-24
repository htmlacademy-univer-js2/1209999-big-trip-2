import FilterView from './view/filter-view.js';
import TripEventsPresenter from './presenter/events-presenter.js';
import { render } from './render.js';

const siteHeader = document.querySelector('.trip-main');
const siteMain = document.querySelector('.page-main');
const tripPresenter = new TripEventsPresenter();

render(new FilterView(), siteHeader.querySelector('.trip-controls__filters'));

tripPresenter.init(siteMain.querySelector('.trip-events'));
