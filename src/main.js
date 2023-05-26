import ListOfFilters from './view/listOfFilters';
import ListOfSort from './view/listOfSort';
import TripInfo from './view/tripInfo';
import EventList from './view/eventList';
import { render, RenderPosition } from './framework/render';
import listRender from './view/listRender';

const filterContainerElem = document.querySelector('.trip-controls__filters');
const sortContainerElem = document.querySelector('.trip-events');
const tripMainContElem = document.querySelector('.trip-main');

render(new TripInfo(), tripMainContElem, RenderPosition.AFTERBEGIN);
render(new ListOfFilters(), filterContainerElem, RenderPosition.BEFOREEND);
render(new ListOfSort(), sortContainerElem, RenderPosition.AFTERBEGIN);

render(new EventList(), sortContainerElem, RenderPosition.BEFOREEND);

const contentList = new listRender();
contentList.init();
